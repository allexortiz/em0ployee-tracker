// Dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}, console.log(`Connected to the employee_db database.`));

// Establish a connection and start the application
db.connect(err => {
    if (err) throw err;
    console.log("Connected as id " + db.threadId);
    startScreen();
});

// Function to display the initial user prompt
const startScreen = () => inquirer.prompt({
    type: "list",
    choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Quit"],
    message: "What would you like to do?",
    name: "option"
}).then(result => {
    console.log("You entered: " + result.option);
    // Switch statement to handle user input and call corresponding functions
    switch (result.option) {
        case "Add department": addDepartment(); break;
        case "Add role": addRole(); break;
        case "Add employee": addEmployee(); break;
        case "View departments": viewDepartment(); break;
        case "View roles": viewRoles(); break;
        case "View employees": viewEmployees(); break;
        case "Update employee role": updateEmployee(); break;
        default: quit();
    }
});

// Function to add a department
const addDepartment = () => inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "deptName"
}).then(answer => {
    // Insert the new department into the 'department' table
    db.promise().execute("INSERT INTO department (name) VALUES (?)", [answer.deptName])
        .then(([rows, fields]) => {
            console.table(rows);
            // Restart the application after the operation is complete
            startScreen();
        })
        .catch(err => {
            console.error(err);
            startScreen();
        });
});

// Function to add a role
const addRole = () => inquirer.prompt([
    { type: "input", message: "What's the name of the role?", name: "roleName" },
    { type: "input", message: "What is the salary for this role?", name: "salaryTotal" },
    { type: "input", message: "What is the department id number?", name: "deptID" }
]).then(answer => {
    // Use db.promise().execute for promise-based queries
    db.promise().execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.roleName, answer.salaryTotal, answer.deptID])
        .then(([rows, fields]) => {
            console.table(rows);
            startScreen();
        })
        .catch(err => {
            console.error(err);
            startScreen();
        });
});

// Function to add an employee
const addEmployee = () => inquirer.prompt([
    { type: "input", message: "What's the first name of the employee?", name: "firstName" },
    { type: "input", message: "What's the last name of the employee?", name: "lastName" },
    { type: "input", message: "What is the employee's role id number?", name: "roleID" },
    { type: "input", message: "What is the manager id number?", name: "managerID" }
]).then(answer => {
    // Use db.promise().execute for promise-based queries
    db.promise().execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstName, answer.lastName, answer.roleID, answer.managerID])
        .then(([rows, fields]) => {
            console.table(rows);
            startScreen();
        })
        .catch(err => {
            console.error(err);
            startScreen();
        });
});

// Function to update an employee's role
const updateEmployee = () => inquirer.prompt([
    { type: "input", message: "Which employee would you like to update?", name: "updateEmployee" },
    { type: "input", message: "What do you want to update to?", name: "updateRole" }
]).then(answer => {
    console.log("Updating employee:", answer.updateEmployee, "to role:", answer.updateRole);

    // Use the promise-based API for queries
    db.promise().execute('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.updateEmployee])
        .then(([rows, fields]) => {
            console.table(rows);
            startScreen();
        })
        .catch(err => {
            console.error(err);
            startScreen();
        });
});

// Function to view departments
const viewDepartment = () => db.promise().execute("SELECT * FROM department")
    .then(([rows, fields]) => {
        console.table(rows);
        startScreen();
    })
    .catch(err => {
        console.error(err);
        startScreen();
    });

// Function to view roles
const viewRoles = () => db.promise().execute("SELECT * FROM role")
    .then(([rows, fields]) => {
        console.table(rows);
        startScreen();
    })
    .catch(err => {
        console.error(err);
        startScreen();
    });

// Function to view employees
const viewEmployees = () => db.promise().execute("SELECT * FROM employee")
    .then(([rows, fields]) => {
        console.table(rows);
        startScreen();
    })
    .catch(err => {
        console.error(err);
        startScreen();
    });

// Function to gracefully exit the application
const quit = () => {
    db.end();
    process.exit();
};