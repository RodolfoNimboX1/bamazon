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
    runManager();
});

// Manageer View
// ======================================================
function runManager () {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Hi Manager. What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }) //prompt ends
    .then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
            productSale();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addProduct();
            break;
        }
    })
// function ends
}

// View Products for Sale
// ======================================================
function productSale() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("Showing all Products for Sale");
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item id: " + res[i].item_id +
                "|| Product: " + res[i].product_name +
                "|| Price: " + res[i].price +
                "|| Available: " + res[i].stock_quantity +
                "---------------------------------------"
            );
        }
        runManager();
    });
};

// View Low Inventory
// ======================================================
function lowInventory() {
    console.log("Showing all products below 50 units...");
    connection.query(
        "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 50",
        function(err, res) {
            console.log("Showing all Products with low inventory");
            for (var i = 0; i < res.length; i++) {
                console.log(
                    "|| Product: " + res[i].product_name +
                    "|| Available: " + res[i].stock_quantity +
                    "---------------------------------------"
                );   
        }
        runManager();
    });
// function ends
}

// Add to Inventory
// ======================================================
function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        // items loaded
        inquirer
        .prompt([
            {
            name: "update",
            type: "rawlist",
            choices: function () {
                var updateArray = [];
                for (var i = 0; i < res.length; i++) {
                    updateArray.push(res[i].product_name);
                } 
                return updateArray;   
            },
            message: "To which product do you want to add units?"
            }, // choice ends
            {
            name: "units",
            type: "input",
            message: "How many units will you add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
    // prompt ends
        ])
        .then(function(answer) {
            console.log("Updating item...");
            // asign values to chosen item to update
            var updateItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.update) {
                    updateItem = res[i];
                }
            }
            console.log("Item to update: " + updateItem.product_name);
            console.log("Units to be added to Inventory: " + answer.units);
            var totalItems = updateItem.stock_quantity + answer.units;
            // update stock
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [ {stock_quantity: totalItems}, {product_name: updateItem.product_name} ],
                function(error) {
                    if (error) throw error;
                    console.log("Updated stock successfully!");
                    runManager();
                }
            )
        });
    // query ends
    });
// fuuntion ends
}

// Add new product
// ======================================================
function addProduct () {
    connection.query("SELECT * FROM products", function(err, res) {
        // items loaded
        inquirer
        .prompt([
            {
            name: "product",
            type: "input",
            message: "What product would you like to add?"
            },
            {
            name: "department",
            type: "input",
            message: "To which department does it belong?"
            },
            {
            name: "price",
            type: "input",
            message: "What's the product's price?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
            name: "units",
            type: "input",
            message: "How many units will you add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
    // prompt ends
        ])
        .then(function(answer) {
            // insert product
            connection.query(
                "INSERT INTO products SET ?",
                { product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.units },
            function(err) {
                if (err) throw err;
                console.log("Your new product was created successfully!");
                runManager();
            }
            )
        });
// query ends
})
// function ends
}