var mysql = require("mysql");
var inquirer = require("inquirer");
var ConsoleTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",


    password: "",
    database: "Bamazon"
});

inquirer.prompt({
    type: "list",
    name: "menu",
    message: "Select the one you would like to do",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}).then(function(answer) {
    if (answer.menu === "View Products for Sale") {
        connection.query("SELECT * from products;", function(err, results) {
            var objArray = [];
            for (var i = 0; i < results.length; i++) {
                objArray.push(results[i]);
            }
            var newArr = [];
            objArray.forEach(function(item) {
                var arr = [];
                arr.push(item.item_id);
                arr.push(item.product_name);
                arr.push("$" + item.price);
                arr.push(item.department_name);
                arr.push(item.stock_quantity);
                newArr.push(arr);
            });
            console.table(["id", "Product Name", "Price", "Department Name", "Stock Quantity"], newArr);
        });
        return;
    }
    if (answer.menu === "View Low Inventory") {
        connection.query("SELECT * FROM products WHERE stock_quanitiy < 5", function(err, results) {
            var objArray = [];
            for (var i = 0; i < results.length; i++) {
                objArray.push(results[i]);
            }
            var newArr = [];
            objArray.forEach(function(item) {
                var arr = [];
                arr.push(item.item_id);
                arr.push(item.product_name);
                arr.push("$" + item.price);
                arr.push(item.department_name);
                arr.push(item.stock_quanitiy);
                newArr.push(arr);
            });
            console.table(["id", "Product Name", "Price", "Department Name", "Stock Quantity"], newArr);
        });
        return;
    }
    if (answer.menu === "Add to Inventory") {
        inquirer.prompt([{
            type: "rawlist",
            name: "input",
            message: "To which item would you like to add to? Enter it's ID number.",
        }, {
            type: "input",
            name: "add",
            message: "How many would you like to add?"
        }]).then(function(answer) {
            var item = answer.itemSelected,
                amount = answer.add;
            connection.query("UPDATE products SET stock_quantity = ? + ? ", [item, amount], function(err, results) {
                if (err) throw err;
                console.log(amount + " items added to inventory");
            });
        });

        return;
    }
    if (answer.menu === "Add New Product") {
        connection.query("", function(err, results) {

        });
        return;
    }
});