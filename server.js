const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');
const logo = require('asciiart-logo');
const connection = require('./config/connection');
const { menu } = require('./utils/functions');

connection.query = util.promisify(connection.query);

connection.connect((err) => {
    if (err) {
        console.log(`Error connecting ${err.stack}`);
        return;
    }
    initScreen();
});

initScreen = () => {
    console.log(
        logo({
            name: 'EMPLOYEE MANAGER',
            font: '3D-ASCII',
            lineChars: 10,
            padding: 3,
            margin: 1,
            borderColor: 'white',
            logoColor: 'bold-white',
            textColor: 'white',
        })
            .emptyLine()
            .right('version 1.0.0')
            .emptyLine()
            .center('Simple management of your Employees')
            .render()
    );
    menu();
}
