const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_UNAME,
  password: process.env.DB_UPASS,
  database: process.env.DB_NAME,
});

module.exports = db;
