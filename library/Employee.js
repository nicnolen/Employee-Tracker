const connection = require('../config/connection');

class Employee {
  constructor(connect) {
    this.connect = connect;
  }

  getEmployees() {
    return this.connect.promise()
      .query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
                     role.salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`);
  }

  getEmployeeDepartment() {
    return this.connect.promise()
      .query(`SELECT employee.first_name, employee.last_name, department.name AS department
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              ORDER BY department`);
  }
}

module.exports = new Employee(connection);
