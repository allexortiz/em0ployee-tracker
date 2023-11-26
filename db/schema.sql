-- Drop the database if it exists to start with a clean slate
DROP DATABASE IF EXISTS employee_db;

-- Create a new database named 'employee_db'
CREATE DATABASE employee_db;

-- Switch to using the 'employee_db' database for subsequent queries
USE employee_db;

-- Create a table to store department information
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,  -- Unique identifier for each department
  name VARCHAR(30) NOT NULL,        -- Name of the department
  PRIMARY KEY(id)                   -- Define 'id' as the primary key for the table
);

-- Create a table to store role information
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,  -- Unique identifier for each role
  title VARCHAR(30) NOT NULL,       -- Title of the role
  salary DECIMAL(10,2) NOT NULL,    -- Salary for the role
  department_id INT NOT NULL,       -- Foreign key referencing department_id in the department table
  PRIMARY KEY (id)                  -- Define 'id' as the primary key for the table
);

-- Create a table to store employee information
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,  -- Unique identifier for each employee
  first_name VARCHAR(30) NOT NULL,  -- First name of the employee
  last_name VARCHAR(30) NOT NULL,   -- Last name of the employee
  role_id INT NOT NULL,             -- Foreign key referencing role_id in the role table
  manager_id INT,                   -- Foreign key referencing manager_id in the same table
  PRIMARY KEY (id)                  -- Define 'id' as the primary key for the table
);