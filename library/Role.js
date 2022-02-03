const connection = require('../config/connection');

class Role {
  constructor(connect) {
    this.connect = connect;
  }
  
  getRoles() {
    return this.connect.promise()
      .query(`SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id`);
  }
}

module.exports = new Role(connection);
