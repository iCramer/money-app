const express = require("express");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

Router.get("/api/tags", (req, res) => {
  mysqlConnection.query(
    `Select id, tag_name AS tagName FROM money_app.tags`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/api/tags/add", (req, res) => {
  const { tagName } = req.body;
  mysqlConnection.query(
    `INSERT INTO tags(tag_name) VALUES ("${tagName}")`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/api/transactionTags/add", (req, res) => {
  const { transId, tagIds } = req.body;
  tagIds.forEach(tagId => {
    mysqlConnection.query(
      `INSERT INTO
        transaction_tags (transaction_id, tag_id)
          VALUES ("${transId}", "${tagId}")`,
      (err, results) => {
        if (!err) {
          res.send(results);
        } else {
          console.log(err);
        }
      }
    );
  });
});

Router.delete("/api/transactionTags/delete", (req, res) => {
  const { transId, tagIds, account } = req.body;
  tagIds.forEach(tagId => {
    mysqlConnection.query(
      `DELETE from transaction_tags
        WHERE id = ${tagId}
        AND transaction_id = ${transId}`,
      (err, results) => {
        if (!err) {
          res.send(results);
        } else {
          console.log(err);
        }
      }
    );
  });
});

module.exports = Router;
