const dbCreds = require('./dbCreds');
const mysql = require("mysql2");

const pool = mysql.createPool(dbCreds);

// const mysqlConnection = mysql.createConnection(dbCreds);

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
    throw err
  }
    console.log("Database connected");
    connection.release();
});

module.exports = pool;
