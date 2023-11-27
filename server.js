//Dependencies found here
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

// Configuration
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Oliver0804!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// Establish a connection and start the application
db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);

    // Call the initial function to display the user prompt
    startScreen();
});

// Function to display the initial user prompt
function startScreen() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "Quit"
            ],
            message: "What would you like to do?",
            name: "option"
        })
        .then(function (result) {
            console.log("You entered: " + result.option);

            // Switch statement to handle user input and call corresponding functions
            switch (result.option) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    quit();
            }
        });
}

// Function to add a department
function addDepartment() {


    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function (answer) {

        // Insert the new department into the 'department' table
        db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
            if (err) throw err;
            console.table(res)
            // Restart the application after the operation is complete
            startScreen()
        })
    })
}

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "deptID"
            }
        ])
        .then(function (answer) {

            // Insert the new role into the 'role' table
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                // Restart the application after the operation is complete
                startScreen();
            });
        });
}

// Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the first name of the employee?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What's the last name of the employee?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerID"
            }
        ])
        .then(function (answer) {

            // Insert the new employee into the 'employee' table
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                // Restart the application after the operation is complete
                startScreen();
            });
        });
}

// Function to update an employee's role
function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "updateEmployee"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (answer) {

            // Update the role of the specified employee in the 'employee' table
            db.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.updateEmployee], function (err, res) {
                if (err) throw err;
                console.table(res);
                // Restart the application after the operation is complete
                startScreen();
            });
        });
}

// Function to view departments
function viewDepartment() {
    // Select all departments from the 'department' table
    let query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // Restart the application after displaying the result
        startScreen();
    });
}

// Function to view roles
function viewRoles() {
    // Select all roles from the 'role' table
    let query = "SELECT * FROM role";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // Restart the application after displaying the result
        startScreen();
    });
}

// Function to view employees
function viewEmployees() {
    // Select all employees from the 'employee' table
    let query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // Restart the application after displaying the result
        startScreen();
    });
}

// Function to gracefully exit the application
function quit() {
    db.end(); // Close the MySQL connection
    process.exit(); // Terminate the application
}