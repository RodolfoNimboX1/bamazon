// Connection to Database
// ======================================================
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected! Now Accepting Orders...")
    runOrder();
});

function runOrder() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item id: " + res[i].item_id +
                "|| Product: " + res[i].product_name +
                "|| Price: " + res[i].price +
                "|| Available: " + res[i].stock_quantity
            );
        }
        placeOrder();
    });
};

// Customer View
// ======================================================
function placeOrder() {
    connection.query("SELECT * FROM products", function(err, res) {
    // items loaded
    inquirer
    .prompt([
        {
        name: "choice",
        type: "rawlist",
        choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            } 
            return choiceArray;   
        },
        message: "To place an order please type the Product ID:"
        }, // choice ends
        {
        name: "units",
        type: "input",
        message: "How much would you like to buy?"
        }
// prompt ends
    ])
    .then(function(answer) {
        console.log("Placing Order...");
        // asign values to chosen item
        var chosenItem;
        for (var i = 0; i<res.length; i++) {
            if (res[i].product_name === answer.choice) {
                chosenItem = res[i];
            }
        }
        console.log("Your Order: " + chosenItem.product_name + " for " + answer.units + " units");
        console.log("Total Cost: " + (chosenItem.price * answer.units));
        var chosenStock = chosenItem.stock_quantity - answer.units;
        var totalSales = chosenItem.price * answer.units;
        // determine if there is enough stock for chosen item
        if (chosenItem.stock_quantity > 0) {
            // there is stock
            connection.query("UPDATE products SET ? WHERE ?",
            [ {stock_quantity: chosenStock, product_sales: totalSales}, {product_name: chosenItem.product_name} ],
            function(error) {
                if (error) throw error;
                console.log("Order Placed Successfully!");
                runOrder();
            }
        );
        } else {
            // not enough stock
            console.log("There is no enough stock. Please select a new item.")
            runOrder();
        }
    })
// first connection query ends
    });
// function ends
}