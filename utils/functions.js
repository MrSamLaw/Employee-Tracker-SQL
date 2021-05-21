const mysql = require('mysql');
const inquirer = require('inquirer');

const menu = () => {
    return inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee',
            'View Departments',
            'View Roles',
            'View Employees',
            'Update Employee Role',
            'Exit',
        ],
    })
        .then((answer) => {
            switch (answer.action) {
                case 'Add Department':
                    console.log("Add Department");
                    break;
                case 'Add Role':
                    console.log("Add Role");
                    break;
                case 'Add Employee':
                    console.log("Add Employee");
                    break;
                case 'View Departments':
                    console.log("View Department");
                    break;
                case 'View Roles':
                    console.log("View Roles");
                    break;
                case 'View Employees':
                    console.log("View Employees");
                    break;
                case 'Update Employee Role':
                    console.log("Update Employee Role");
                    break;
                case 'Exit':
                    break;
            }
        });
};

module.exports = { menu };