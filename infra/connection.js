const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '<your-database-password-here>',
  database: '<your-database-here>'
});



module.exports = conn;