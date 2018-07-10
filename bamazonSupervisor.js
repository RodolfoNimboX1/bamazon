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