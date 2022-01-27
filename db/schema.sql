/* SETS UP WHAT OUR TABLE WILL LOOK LIKE */
/* Drops the department table if it exists */
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);