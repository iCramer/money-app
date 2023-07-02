const express = require("express");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

Router.get("/api/categories", (req, res) => {
  mysqlConnection.query(
    `Select * FROM money_app.categories`,
    (err, results) => {
      if (!err) {
        console.log('fetched categories')
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.put("/api/categories/update", (req, res) => {
  const { label, name } = req.body;
  mysqlConnection.query(
    `UPDATE categories SET label="${label}" WHERE name = "${name}"`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/api/categories/add", (req, res) => {
  const { label, name } = req.body;
  mysqlConnection.query(
    `INSERT INTO categories (label, name) VALUES("${label}", "${name}")`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/api/transactionCategories/add", (req, res) => {
  const { transDesc, categoryId } = req.body;
  mysqlConnection.query(
    `INSERT INTO
      transaction_categories (transaction_desc, category_id)
        VALUES ("${transDesc}", "${categoryId}")`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.delete("/api/transactionCategories/delete", (req, res) => {
  const { transDesc, categoryId } = req.body;
  mysqlConnection.query(
    `DELETE from transaction_categories
      WHERE transaction_desc = ${transDesc}
      AND category_id = ${categoryId}`,
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;