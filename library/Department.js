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
}

module.exports = new Department(connection);
