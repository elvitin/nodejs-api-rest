const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'database.env') });

console.log('HOST: ', process.env.DB_HOST);
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DEV_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

module.exports = conn;
