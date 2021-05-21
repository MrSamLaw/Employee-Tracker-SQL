const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('../config/connection');
const { inputVal } = require('./validate');

const menu = async () => {
    return await inquirer.prompt({
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
                    addDepartment();
                    break;
                case 'Add Role':
                    console.log("Add Role");
                    break;
                case 'Add Employee':
                    console.log("Add Employee");
                    break;
                case 'View Departments':
                    viewDepartments();
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
                    exitProgram();
                    break;
            }
        });
};


const addDepartment = async () => {
    let answer = await inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'What is the name of the new department?',
        validate: inputVal,
    });
    let result = await connection.query('INSERT INTO department SET?', { name: answer.department });
    console.table(
        '-----------------------------------------------------------------------------------',
        `           Success! ${answer.department} has been added to your database           `,
        '-----------------------------------------------------------------------------------',
    );
    menu();
}

const viewDepartments = async () => {
    let showTable = await connection.query('SELECT * FROM department ORDER BY id');
    console.table(
        '=========================================',
        '             ALL DEPARTMENTS             ',
        '=========================================',
        showTable,
        '=========================================',
    );
    menu();
}

const exitProgram = () => {
    console.table(
        '========================================',
        '  Thank you for using Employee Manager  ',
        '========================================',
    );
    connection.end();
}
module.exports = { menu };