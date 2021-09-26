// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host:process.env.R_HOST,
  user:process.env.R_USER,
  password:process.env.R_PASSWORD,
  database:process.env.R_DATABASE,
  waitForConnections: true,
  queueLimit: 0
});

module.exports = pool; 