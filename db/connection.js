// Import npm packages
const mysql = require('mysql2');

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker'
})

// Export the module
module.exports = connection;