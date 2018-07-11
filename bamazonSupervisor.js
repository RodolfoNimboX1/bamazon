// Connection to Database
// ======================================================
var cTable = require('console.table');
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
    runSupervisor();
});

// Supervisor View
// ======================================================
function runSupervisor() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Hi Supervisor. What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department"
        ]
    }) //prompt ends
    .then(function(answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
            depSales();
            break;

            case "Create New Department":
            newDep();
            break;
        }
    }); // then ends
// runSupervisor ends
}

// View Product Sales by Department
// ======================================================
function depSales() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.department_name " ;
    query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name) ";
    query += "ORDER BY departments.department_id ";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.table([{
                Deparment_Id: res[i].department_id,
                Department_Name: res[i].department_name,
                Department_Costs: res[i].over_head_costs,
                Product_Sales: res[i].product_sales
                }]
            )
        }
    }); // query ends
// depSales ends
}

// Create New Department
// ======================================================
function newDep() {
    connection.query("SELECT * FROM departments", function(err, res) {
            // items loaded
            inquirer
            .prompt([
                {
                name: "name",
                type: "input",
                message: "What department would you like to add?"
                },
                {
                name: "cost",
                type: "input",
                message: "What are the over head costs?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
                }
            ])//prompt ends
            .then(function(answer) {
                // insert department with costs
                connection.query(
                    "INSERT INTO departments SET ?",
                    { department_name: answer.name,
                      over_head_costs: answer.cost },
                      function(err) {
                          if (err) throw err;
                          console.log("New department added successfully!");
                          runSupervisor();
                      }
                )
            });
        }) // query ends
// newDep ends
}