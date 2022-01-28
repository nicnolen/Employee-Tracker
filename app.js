// Import personal files
const db = require('./db/connection');
const ctable = require('console.table');
const inquirer = require('inquirer');

// Start server after database connection
db.connect(err => {
  if (err) throw err;
  console.info('Database connected.');
  promptUser();
});

// Inquirer prompt for the first action
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choices',
        message:
          'What would you like to do? (Scroll to "quit" to end the prompts)',
        choices: [
          'View All Departments',
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
          'Quit',
        ],
      },
    ])
    // If a certain answer is chosen, run that function
    .then(answers => {
      const { choices } = answers;

      if (choices === 'View All Departments') {
        showDepartments();
      }

      if (choices === 'Quit') {
        console.info('Ending prompts');
        connection.end();
      }
    });
};

// Function to show all departments
showDepartments = () => {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    console.info('Showing all departments!');
    // Return the user to the prompts
    promptUser();
  });
};
