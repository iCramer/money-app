const express = require("express");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

Router.get("/api/categories", (req, res) => {
  mysqlConnection.query(
    `Select * FROM money_app.categories`,
    (err, results) => {
      if (!err) {
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

module.exports = Router;