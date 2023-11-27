const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oliver0804!',
    database: 'employee_db'
}, console.log(`Connected to the employee_db database.`));

db.connect(err => {
    if (err) throw err;
    console.log("Connected as id " + db.threadId);
    startScreen();
});

const startScreen = () => inquirer.prompt({
    type: "list",
    choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Quit"],
    message: "What would you like to do?",
    name: "option"
}).then(result => {
    console.log("You entered: " + result.option);
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

const addDepartment = () => inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "deptName"
}).then(answer => db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
}));

const addRole = () => inquirer.prompt([
    { type: "input", message: "What's the name of the role?", name: "roleName" },
    { type: "input", message: "What is the salary for this role?", name: "salaryTotal" },
    { type: "input", message: "What is the department id number?", name: "deptID" }
]).then(answer => db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [answer.roleName, answer.salaryTotal, answer.deptID], (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
    }));

const addEmployee = () => inquirer.prompt([
    { type: "input", message: "What's the first name of the employee?", name: "firstName" },
    { type: "input", message: "What's the last name of the employee?", name: "lastName" },
    { type: "input", message: "What is the employee's role id number?", name: "roleID" },
    { type: "input", message: "What is the manager id number?", name: "managerID" }
]).then(answer => db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [answer.firstName, answer.lastName, answer.roleID, answer.managerID], (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
    }));

const updateEmployee = () => inquirer.prompt([
    { type: "input", message: "Which employee would you like to update?", name: "updateEmployee" },
    { type: "input", message: "What do you want to update to?", name: "updateRole" }
]).then(answer => db.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.updateEmployee], (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
}));

const viewDepartment = () => db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
});

const viewRoles = () => db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
});

const viewEmployees = () => db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
});

const quit = () => {
    db.end();
    process.exit();
};
