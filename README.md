# bamazon
an Amazon-like storefront with the MySQL to hold the data and runs commands on Node js

# Customer Review:

This Node app runs to place an Order. It will display a list of the options available to sale. After showing the products it will ask you to select an option based on the ID of the product. Once the ID is selected you will be prompted to type the number of units you want to order.

After placing the order the app will display:
1. An alert that your order is being processed.
2. Your order: Chosen Item + units ordered.
3. The total cost of the order: price of chosen item x units ordered.

After placing the order, 1 of 2 things will happen:
1. Stock available for chosen item
2. Out of stock for chosen item

If stock is available the app wil promt you to choose another item. But if stock is not available it will prompt you to choose a different option.

*Disclaimer: the stock availability is updated in real time*

Video is customer-view.mp4 inside of assets/ if you want to see it in action!

---------------------------

# Manager view

This Node app will help the manager with four things:
1. View Products for Sale; the app lists every available item: the item IDs, names, prices, and quantities.
2. View Low Inventory; lists all items with an inventory count lower than 50.
3. Add to Inventory; lets the manager "add more" of any item currently in the store.
4. Add New Product; allows the manager to add a completely new product to the store.

Video is manager-view.mp4 inside of assets/ if you want to see it in action!

---------------------------

# Supervisor view

This Node app wil help the supervisor with two tasks:
1. View a Table of all departments displaying: Department ID, Department Name, Over Head Costs of the Department, Total Sales of the Department and the Total Profit.
2. Add a new Department to the database!

Video is supervisor-view.mp4 inside of assets/ if you want to see it in action!

