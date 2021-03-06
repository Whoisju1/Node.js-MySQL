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

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});


//Get items from products table to display to customer
connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
    if (err) throw err;

    // get each row as an object push these objects into an array 
    var objArray = [];
    for (var i = 0; i < results.length; i++) {
        objArray.push(results[i]);
        newArr = [];
    }

    // iterate through array of objects and for each property of each object push into an array
    // each itme in the array will be an array with values from it's respective row
    objArray.forEach(function(item) {
        var arr = [];
        arr.push(item.item_id);
        arr.push(item.product_name);
        arr.push("$" + item.price);
        newArr.push(arr);
    });

    //Display array as a table in the console using console.table node package
    console.table(["id", "Product Name", "Price"], newArr);

    // prompt user questions usering inquirer (represented by the chooseProduct function)
    chooseProduct();
});

function chooseProduct() {
    inquirer.prompt([{
        name: "id_number",
        type: "input",
        message: "Enter id number of the product you would like to purchase."
    }, {
        name: "purchase_quantity",
        type: "input",
        message: "What amount of this product do you want to purchase?"
    }]).then(function(answer) {
        var idInput = answer.id_number,
            quantityInput = answer.purchase_quantity;
        //select specific columns based on the users product ID selection
        connection.query("SELECT * from products WHERE products.item_id = " + idInput, function(err, results) {
            if (err) throw err;
            var productQuantity = results[0].stock_quantity,
                productName = results[0].product_name,
                itemId = results[0].item_id,
                price = results[0].price;
            if (quantityInput > productQuantity) {
                console.log("Insufficient quantity!");
                return;
            } else if (quantityInput <= productQuantity) {
                console.log("The cost is $" + price * quantityInput);
                connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantityInput, idInput], function(err, results) {
                    if (err) throw err;
                });
            }
        });
    });
}