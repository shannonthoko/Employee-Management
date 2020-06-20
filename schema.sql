CREATE DATABASE employeeManagement_db;

USE employeeManagement_db;

CREATE TABLE department (

    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)


);

CREATE TABLE role (

    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT(10) NOT NULL
    PRIMARY KEY(id)

);

CREATE TABLE employee (

    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NOT NUll,
    PRIMARY KEY(id)


);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Shannon", "Kearney",1,2 );
SELECT * FROM employee;