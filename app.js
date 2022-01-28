// Import personal files
const db = require('./db/connection');
const ctable = require('console.table');
const inquirer = require('inquirer');

// Start server after database connection
db.connect(err => {
    if (err) throw err;
    console.info('Database connected.');
})

// Inquirer prompt for the first action 
const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Departments',
                      'View all Roles',
                      'View All Employees',
                      'Add a Department',
                      'Add a Role',
                      'Add an Employee',
                      'Update an Employee Role',
                      'Update Employee Manager',
                      'Update Employees by Manager',
                      'View Employees by Department',
                      'Delete a Department',
                      'Delete a Role',
                      'Delete an Employee',
                      'View Department Budgets',
                      'Quit']
        }
    ])
}