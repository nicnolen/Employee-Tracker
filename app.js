// Import personal files
const db = require('./config/connection');
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
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Update Employee Manager',
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

      if (choices === 'View All Roles') {
        viewRoles();
      }

      if (choices === 'View All Employees') {
        viewEmployees();
      }

      if (choices === 'Add a Department') {
        addDepartment();
      }

      if (choices === 'Add a Role') {
        addRole();
      }

      if (choices === 'Delete a Department') {
        deleteDepartment();
      }

      if (choices === 'Delete a Role') {
        deleteRole();
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
  const sql = `SELECT role.id, role.title, role.salary, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    console.info('Showing all roles');
    promptUser();
  });
};

// VIEW employees
viewEmployees = () => {
  const sql = `SELECT employee.id, 
                 employee.first_name, 
                 employee.last_name, 
                 role.title, 
                 department.name AS department,
                 role.salary, 
                 CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    console.info('Showing all employees!');
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

// ADD role
addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What role would you like to add?',
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.info('Please enter a role');
            return false;
          }
        },
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: addSalary => {
          if (addSalary) {
            return true;
          } else {
            return console.info(
              'Please enter a salary (numbers only). Press the up arrow key to retry.)'
            );
          }
        },
      },
    ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // Grab department from the department table
      const sql = `SELECT name, id FROM department`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        const department = data.map(({ name, id }) => ({
          name: name,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'department',
              message: 'What department is the role associated with?',
              choices: department,
            },
          ])
          .then(departmentChoice => {
            const department = departmentChoice.department;
            params.push(department);

            const sql = `INSERT INTO role (title, salary, department_id)
                         VALUES (?, ?, ?)`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;

              console.info(`Added ${answer.role} to roles!`);

              viewRoles();
            });
          });
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

        {
          type: 'confirm',
          name: 'confirmDeleteDepartment',
          message: 'Are you sure you want to delete this department? (Y/N)',
          default: false,
          when: ({ department }) => department,
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

// DELETE a role
deleteRole = () => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'role',
          message: 'What role do you want to delete?',
          choices: role,
        },

        {
          type: 'confirm',
          name: 'confirmDeleteDepartment',
          message: 'Are you sure you want to delete this department? (Y/N)',
          default: false,
          when: ({ role }) => role,
        },
      ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        db.query(sql, role, (err, result) => {
          if (err) throw err;

          console.info('Role deleted successfully!');
          viewRoles();
        });
      });
  });
};
