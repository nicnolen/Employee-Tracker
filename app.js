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
        viewDepartments();
      }

      if (choices === 'View all Roles') {
        viewRoles();
      }

      if (choices === 'Add a Department') {
        addDepartment();
      }

      if (choices === 'Delete a Department') {
        deleteDepartment();
      }

      if (choices === 'Quit') {
        console.info('Ending prompts');
        connection.end();
      }
    });
};

// VIEW all departments
viewDepartments = () => {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    console.info('Showing all departments!');
    // Return the user to the prompts
    promptUser();
  });
};

// VIEW roles
viewRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    console.info('Showing all roles');
    promptUser();
  });
};

// ADD department
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDepartment',
        message: 'What department would you like to add?',
        validate: addDepartment => {
          if (addDepartment) {
            return true;
          } else {
            console.info('Please enter a department!');
            return false;
          }
        },
      },
    ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                   VALUES (?)`;

      db.query(sql, answer.addDepartment, (err, row) => {
        if (err) throw err;
        console.info(`Added ${answer.addDepartment} to departments!`);

        viewDepartments();
      });
    });
};

// DELETE department
deleteDepartment = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const department = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'department',
          message: 'Which department do you want to delete?',
          choices: department,
        },
      ])
      .then(departmentChoice => {
        const department = departmentChoice.department;
        const sql = `DELETE FROM department WHERE id =?`;

        db.query(sql, department, (error, row) => {
          if (err) throw err;
          console.info('Department successfully deleted!');

          viewDepartments();
        });
      });
  });
};
