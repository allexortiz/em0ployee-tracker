## Employee Tracker

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Table of Contents
- [Description](#description)
- [Technologies](#technologies)
- [Links](#links)
- [Usage](#usage)
- [Credits](#credits)
- [Questions](#questions)

## Description
This application was built to view all the departments, roles, and employees, as well as add a department, role, employee, and update an employee role. It uses inquirer to prompt the user what actions they want to take based on the needs they require. It takes all the information given from the database and seeds to allow you to view all the data input into each.

## Technologies
1. Visual Studio Code
2. Node.js
3. Express package
4. MySQL2
5. Console.table
6. GitHub

## Links
- [Github Repository](https://github.com/allexortiz/employee-tracker)
- [Demo Video](https://drive.google.com/file/d/1RynvcG4I4p7acfVZ1Nt9VFjXhzb9Nloo/view)

## Usage
1. Open the terminal
2. Type the command `npm start`
3. Follow the prompt based on what you want to do or see

## Credits
- Instructor - Tyler Calvert
- TA - Dustin Burns
- Tutor - Dennis Itua

## Questions
If you have any addition questions feel free to reach me at either my github or email address.

-[GitHub](https://github.com/allexortiz)
-[Email](allexortiz@outlook.com)