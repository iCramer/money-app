const express = require("express");
const mysqlConnection = require("../utils/database");
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const Router = express.Router();

const normalizeData = data => {
  const description = data['Transaction Description'] || data['Description'];
    const amount = data['Transaction Amount'] || data['Amount'];
    let type = data['Transaction Type'] || data['Type'];
    if (type === 'Sale') {
      type = 'debit'
    }
    else if (type === 'Payment' || type === 'Return') {
      type = 'credit'
    }
    let date = data['Transaction Date'];
    const [month, day, year] = date.split('/');
    date = `${year}-${month}-${day}`;

    return {
      date,
      amount,
      type: type.toLowerCase(),
      description,
      balance: data['Balance'] || 0.00
    }
};

Router.post("/api/import", (req, res) => {
  const results = [];
  const { fileName, account } = req.body;
  fs.createReadStream(path.resolve(__dirname, `../data/${fileName}`))
  .pipe(csv())
  .on('data', (data) => {
    const normalizedData = normalizeData(data);
    const record = { ...normalizedData, account };
    results.push(record)
    return results;
  })
  .on('end', () => {
    let insertError = false;
    results.forEach(record => {
      const { account, date, amount, type, description, balance } = record;
      console.log(record)
      mysqlConnection.query(
        `INSERT IGNORE INTO transactions (account, date, amount, type, description, balance)
          VALUES (
            "${account}",
            "${date}",
            "${amount}",
            "${type}",
            "${description}",
            "${balance}"
          )`,
        (err, resp) => {
          if (err) {
            insertError = err;
          }
        }
      );
    });
    res.send(insertError || 'Success');
  });
});

module.exports = Router;
