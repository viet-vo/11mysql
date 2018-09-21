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
    const query = "SELECT * FROM bamazon.products";
    connection.query(query, function (err, res) {
        console.table(res);
        inquirer.prompt([{
            type: "input",
            message: "Select item_id: ",
            name: "choice"
        }]).then(answers => {
            itemChoice = answers.choice;
            inquirer.prompt([{
                type: "input",
                message: "Quantity: ",
                name: "quantity"
            }]).then(answers => {
                connection.query("SELECT * FROM bamazon.products WHERE ?", {
                    item_id: itemChoice
                }, function (err, res) {
                    console.log(res[0].product_name);
                    if (answers.quantity > res[0].stock_quantity) {
                        console.log("Build more pylons!!! Ain't got enough of this shit.");
                        start();
                    } else {
                        difference = res[0].stock_quantity - answers.quantity;
                        connection.query("UPDATE bamazon.products SET stock_quantity = ? WHERE item_id = ?", [difference, itemChoice]);
                        console.log("Your total price is: $" + answers.quantity * res[0].price);
                        start();
                    }
                })
            })
        })

    });
};