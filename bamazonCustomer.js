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

// Customer View
// ======================================================
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

function placeOrder() {
    inquirer
    .prompt([
        {
        name: "item_id",
        type: "input",
        message: "Would you like to place an Order? Please write the ID",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "stock_quantity",
        type: "input",
        message: "How many units are you gonna order?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
])
    .then(function(ans) {
        console.log("You selected item: " + ans.item_id);
        console.log("How many units youre buying: " + ans.stock_quantity);

        console.log("Placing Order...");

        var query = connection.query("SELECT product_name, price, stock_quantity FROM products WHERE ?",
         { item_id: ans.item_id }, 
         function(err, res) {
            console.log("Your Order: " + res[0].product_name + " || price: " + ((res[0].price)* ans.stock_quantity) + "|| Available: " + res[0].stock_quantity);
            console.log("Thanks for choosing bamazon.");
            updateStock();
        });
    });
};


function updateStock() {
    console.log("Updating items...");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",[
            {
            stock_quantity: 85
            },
            {
            item_id: 2
            }
        ],
        function(err, res) {
            console.log("Items updated!");
            runOrder();
        }
    );
}
