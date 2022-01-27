// Import personal files
const db = require('./db/connection');
const ctable = require('console.table');

// Start server after database connection
db.connect(err => {
    if (err) throw err;
    console.info('Database connected.');
})