// Import dependencies
const { printTable } = require('console-table-printer');
const inquirer = require('inquirer');

// Import personal files
const db = require('./config/connection');

// Import constructor functions
const Department = require('./library/Department');
const Role = require('./library/Role');
const Employee = require('./library/Employee');

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
          'View Employees by Department',
          'View Department Budgets',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Update Employee Manager',
          'Delete a Department',
          'Delete a Role',
          'Delete an Employee',
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

      if (choices === 'View Employees by Department') {
        viewEmployeeDepartment();
      }

      if (choices === 'View Department Budgets') {
        viewBudget();
      }

      if (choices === 'Add a Department') {
        addDepartment();
      }

      if (choices === 'Add a Role') {
        addRole();
      }

      if (choices === 'Add an Employee') {
        addEmployee();
      }

      if (choices === 'Update an Employee Role') {
        updateEmployee();
      }

      if (choices === 'Update Employee Manager') {
        updateManager();
      }

      if (choices === 'Delete a Department') {
        deleteDepartment();
      }

      if (choices === 'Delete a Role') {
        deleteRole();
      }

      if (choices === 'Delete an Employee') {
        deleteEmployee();
      }

      if (choices === 'Quit') {
        console.info('Ending prompts');
        process.exit();
      }
    });
};

// VIEW all departments
viewDepartments = () => {
  Department.getDepartment()
    .then(([rows]) => {
      printTable(rows);
      console.info('Showing all departments');
      promptUser();
    })
    .catch(err => {
      console.error(err);
    });
};

// VIEW roles
viewRoles = () => {
  Role.getRoles()
    .then(([rows]) => {
      printTable(rows);
      console.info('Showing all roles');

      promptUser();
    })
    .catch(err => {
      console.error(err);
    });
};

// VIEW employees
viewEmployees = () => {
  Employee.getEmployees()
    .then(([rows]) => {
      printTable(rows);
      console.info('Showing all employees');

      promptUser();
    })
    .catch(err => {
      console.error(err);
    });
};

// VIEW employees by department
viewEmployeeDepartment = () => {
  Employee.getEmployeeDepartment()
    .then(([rows]) => {
      printTable(rows);
      console.info('Showing employees by department');

      promptUser();
    })
    .catch(err => {
      console.error(err);
    });
};

// VIEW department budget
viewBudget = () => {
  Department.getBudget()
    .then(([rows]) => {
      printTable(rows);
      console.info('Showing budgets by department');

      promptUser();
    })
    .catch(err => {
      console.error(err);
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

// ADD Employee
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the employee?',
        validate: addFirst => {
          if (addFirst) {
            return true;
          } else {
            console.info('Please enter the first name of the employee');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the employee?',
        validate: addLast => {
          if (addLast) {
            return true;
          } else {
            console.info('Please enter the last name of the employee');
            return false;
          }
        },
      },
    ])
    .then(answer => {
      const params = [answer.firstName, answer.lastName];

      // grab roles from the roles table
      const sql = `SELECT role.id, role.title FROM role`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: 'list',
              name: 'role',
              message: 'What role does the employee have?',
              choices: roles,
            },
          ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const sql = `SELECT * FROM employee`;

            db.query(sql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + ' ' + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: 'confirm',
                    name: 'confirmManager',
                    message: 'Does this employee have a manager? (Y/N)',
                    default: true,
                  },

                  {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the manager for the employee?',
                    choices: managers,
                    when: ({ confirmManager }) => confirmManager,
                  },
                ])
                .then(managerChoice => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                  VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) throw err;

                    console.info('New employee added!');

                    viewEmployees();
                  });
                });
            });
          });
      });
    });
};

// UPDATE employee role
updateEmployee = () => {
  // get employees from employee table
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + '' + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Which employee would you like to update?',
          choices: employees,
        },
      ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const sql = `SELECT * FROM role`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: 'list',
                name: 'role',
                message: 'What is the new role for the employee?',
                choices: roles,
              },
            ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;

                console.info('Employee role has been updated!');

                viewEmployees();
              });
            });
        });
      });
  });
};

// UPDATE an employees manager
updateManager = () => {
  // get employees from employee table
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + ' ' + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Which employee would you like to update?',
          choices: employees,
        },
      ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + '' + last_name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager for the employee?',
                choices: managers,
              },
            ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0];
              params[0] = manager;
              params[1] = employee;

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.info('Employee has been updated!');

                viewEmployees();
              });
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

        db.query(sql, department, (err, row) => {
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

// Delete an employee
deleteEmployee = () => {
  // get employee from employee table
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + '' + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Which employee would you like to delete?',
          choices: employees,
        },
        {
          type: 'confirm',
          name: 'confirmDeleteEmployee',
          message: 'Are you sure you want to delete this employee? (Y/N)',
          default: false,
          when: ({ employees }) => employees,
        },
      ])
      .then(employeeChoice => {
        const employee = employeeChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        db.query(sql, employee, (err, result) => {
          if (err) throw err;

          console.info('Employee successfully deleted!');

          viewEmployees();
        });
      });
  });
};

promptUser();
