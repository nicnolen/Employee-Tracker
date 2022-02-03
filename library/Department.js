const connection = require('../config/connection');

class Department {
  constructor(connect) {
    this.connect = connect;
  }

  getDepartment() {
    return this.connect
      .promise()
      .query(
        `SELECT department.id AS id, department.name AS department FROM department`
      );
  }

  getBudget() {
    return this.connect.promise()
      .query(`SELECT department_id AS id, department.name AS department,
            SUM(salary) AS budget
            FROM role
            JOIN department ON role.department_id = department.id GROUP BY department_id`);
  }
}

module.exports = new Department(connection);
