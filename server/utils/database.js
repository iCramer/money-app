import dbCreds from './dbCreds';

const mysql = require("mysql");

const mysqlConnection = mysql.createConnection(dbCreds);

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
  }
});

module.exports = mysqlConnection;
