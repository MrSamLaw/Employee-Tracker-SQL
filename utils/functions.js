const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('../config/connection');
const { inputVal, numVal } = require('./validate');

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
                    addEmployee();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
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
            validate: numVal,
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

const addEmployee = async () => {
    const role = await connection.query('SELECT * FROM role');
    let roleArr = role.map((empRole) => {
        return {
            name: empRole.title,
            value: empRole.id,
        };
    });
    const manager = await connection.query('SELECT * FROM employee');
    let managerArr = manager.map((empManager) => {
        return {
            name: `${empManager.first_name} ${empManager.last_name}`,
            value: empManager.id,
        };
    });
    if (managerArr.length === 0) {
        managerArr = [{ name: "None", value: null }];
    }
    let answer = await inquirer.prompt([
        {
            name: 'fName',
            type: 'input',
            message: 'What is the first name of the new employee?',
            validate: inputVal,
        },
        {
            name: 'lName',
            type: 'input',
            message: 'What is the last name of the new employee?',
            validate: inputVal,
        },
        {
            name: 'roleID',
            type: 'list',
            choices: roleArr,
            message: 'What is the role of the new employee?',
        },
        {
            name: 'managerID',
            type: 'list',
            choices: managerArr,
            message: 'Who is the new employee\'s manager??',
        }
    ]);
    let result = await connection.query('INSERT INTO employee SET?', {
        first_name: answer.fName,
        last_name: answer.lName,
        role_id: answer.roleID,
        manager_id: answer.managerID,
    });
    console.table(
        '-----------------------------------------------------------------------------------',
        `           Success! ${answer.fName} ${answer.lName} has been added to your database           `,
        '-----------------------------------------------------------------------------------',
    );
    menu();
}

const viewDepartments = async () => {
    let showTable = await connection.query('SELECT name AS Departments FROM department ORDER BY id');
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
        'SELECT title AS Role, salary AS Salary, name AS Department FROM role INNER JOIN department ON role.department_id = department.id');
    console.table(
        '=========================================',
        '                ALL ROLES                ',
        '=========================================',
        showTable,
        '=========================================',
    );
    menu();
}

const viewEmployees = async () => {
    let showTable = await connection.query(
        'SELECT CONCAT( e1.first_name, " ", e1.last_name ) AS "Employee Name", title AS Role, name AS Department, salary AS Salary, CONCAT( e2.first_name, " ", e2.last_name ) AS Manager FROM employee e1 INNER JOIN role ON role.id = e1.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e2 ON e2.id = e1.manager_id');
    console.table(
        '=========================================',
        '              ALL EMPLOYEES              ',
        '=========================================',
        showTable,
        '=========================================',
    );
    menu();
}

const updateEmployeeRole = async () => {
    const emp = await connection.query('SELECT * FROM employee');
    var empArr = emp.map((empName) => {
        return {
            name: `${empName.first_name} ${empName.last_name}`,
            value: empName.id,
        };
    });
    let empAnswer = await inquirer.prompt({
        name: 'employeeID',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: empArr,
    });

    const role = await connection.query('SELECT * FROM role');
    var roleArr = role.map((empRole) => {
        return {
            name: empRole.title,
            value: empRole.id,
        };
    });
    let roleAnswer = await inquirer.prompt({
        name: 'roleID',
        type: 'list',
        message: 'Choose the new role',
        choices: roleArr,
    });

    // let managerConfirm = await inquirer.prompt({
    //     name: 'managerConfirm',
    //     type: 'confirm',
    //     message: 'Would you like to update manager?',
    // });
    // let managerAnswer = "";
    // if (managerConfirm) {
    //     const managerInfo = await connection.query('SELECT * FROM employee');
    //     let managerArr = managerInfo.map((empManager) => {
    //         return {
    //             name: `${empManager.first_name} ${empManager.last_name}`,
    //             value: empManager.id,
    //         };
    //     });
    //     // Employee can't be their own manager -> splice array with empID?
    //         const currentManager = await connection.query('SELECT * FROM employee WHERE?',[
    // employee.id ==
    //         ])
    //         managerAnswer = await inquirer.prompt({
    //             name: 'managerID',
    //             type: 'list',
    //             message: 'Choose new manager',
    //             choices: managerArr,
    //         });
    //     } else {
    //         managerAnswer = { value: empManager.id }
    //     }
    // let managerResult = await connection.query('UPDATE employee SET?,? WHERE ?'[
    //     { id: empAnswer.employeeID },
    //     { role_id: roleAnswer.roleID },
    //     { manager_id: managerAnswer.managerID }
    // ]);
    console.log(roleAnswer.roleID);
    console.log(empAnswer.employeeID);
    let result = await connection.query('UPDATE employee SET role_id = ?, WHERE id = ?',
        [roleAnswer.roleID, empAnswer.employeeID]
    );
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