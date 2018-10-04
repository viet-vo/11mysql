const inquirer = require("inquirer");
const ctable = require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        message: "Menu Options",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", " Add New Product"]
    }])
}