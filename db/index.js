const connection = require('../config/connection');

class Store {
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

  getRoles() {
    return this.connect.promise()
      .query(`SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id`);
  }
}

module.exports = new Store(connection);
