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
                    addRole();
                    break;
                case 'Add Employee':
                    console.log("Add Employee");
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
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

const addRole = async () => {
    const dept = await connection.query('SELECT * FROM department');
    const choicesArr = dept.map((deptID) => {
        return {
            name: deptID.name,
            value: deptID.id,
        };
    });
    let answer = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the new role?',
            validate: inputVal,
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the new role?',
            validate: inputVal,
        },
        {
            name: 'department',
            type: 'list',
            choices: choicesArr,
            message: 'Which department is the new role in?',
        }
    ]);
    let result = await connection.query('INSERT INTO role SET?', {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department,
    });
    console.table(
        '-----------------------------------------------------------------------------------',
        `           Success! ${answer.title} has been added to your database           `,
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

const viewRoles = async () => {
    let showTable = await connection.query(
        'SELECT role.id, title, salary, name AS department FROM role INNER JOIN department ON role.department_id = department.id');
    console.table(
        '=========================================',
        '                ALL ROLES                ',
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