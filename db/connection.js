// Import npm packages
const mysql = require('mysql2');

// Import .env file, overriding any existing environmental variables
require('dotenv').config({ override: true });

// Create connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_db',
});

// Export the module
module.exports = db;
