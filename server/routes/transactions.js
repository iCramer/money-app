const express = require("express");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

const transactionsQuery = `SELECT
b.id,
b.account,
DATE_FORMAT(b.date, "%Y-%m-%d") AS date,
b.type,
b.description,
b.amount,
b.balance,
c.label AS category,
GROUP_CONCAT(t.tag_name) AS tags
FROM money_app.transactions b
LEFT JOIN money_app.transaction_categories tc
ON b.description = tc.transaction_desc
LEFT JOIN money_app.categories c 
ON c.id = tc.category_id
LEFT JOIN money_app.transaction_tags tt 
ON b.id = tt.transaction_id
LEFT JOIN money_app.tags t
ON t.id = tt.tag_id
GROUP BY b.id, c.label
ORDER BY b.date DESC`;

Router.get("/api/transactions", (req, res) => {
  mysqlConnection.query(
    transactionsQuery,
    (err, results) => {
      if (!err) {
        const resp = results.map(item => {
          if (item.tags) {
            item.tags = item.tags.split(',');
          }
          else {
            item.tags = [];
          }
          return item;
        });
        console.log('fetched transations')
        res.send(resp);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
