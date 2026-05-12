// Database connection file
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'samalovesmenna', // Leave empty if no password
  database: 'university_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get connection from pool
const connection = pool.promise();

module.exports = connection;