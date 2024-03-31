const express = require("express");
const mysqlConnection = require("../utils/database");
const { parse } = require('csv');
const fs = require('fs');
const os = require('os');
const multer = require('multer');

const Router = express.Router();

const normalizeData = data => {
  const description = data['Transaction Description'] || data['Description'];
    const amount = data['Transaction Amount'] || data['Amount'];
    let type = data['Transaction Type'] || data['Type'];
    if (type === 'Sale' || type === 'Debit') {
      type = 'spend'
    }
    else if (type === 'Payment' || type === 'Return' || type === 'Credit' || type === 'Adjustment') {
      type = 'deposit'
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

const upload = multer({ dest: os.tmpdir() });
Router.post("/api/import", upload.single('file'), (req, res) => {
  const { file } = req;
  const { account } = req.body;
  const data = fs.readFileSync(file.path);
  parse(data, { columns: true }, (err, data) => {
    const normalizedData = data.reduce((acc, row) => {
      const normalized = normalizeData(row);
      acc.push({ ...normalized, account });
      return acc;
    }, []);

    let insertError = false;
    normalizedData.forEach(record => {
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
  })
});

module.exports = Router;
