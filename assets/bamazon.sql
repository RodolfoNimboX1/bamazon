-- bamazon database --
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(20) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL(4,0) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

SELECT * FROM products;

CREATE TABLE departments (
department_id INT AUTO_INCREMENT,
department_name VARCHAR(20) NOT NULL,
over_head_costs DECIMAL(4,0) NOT NULL,
PRIMARY KEY (department_id)
);

SELECT * FROM departments;

-- 1 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iron man", "movies", 120, 100);

-- 2 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("the hulk", "movies", 95, 50);

-- 3 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("thor", "movies", 115, 80);

-- 4 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iron man 2", "movies", 110, 75);

-- 5 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("captain america", "movies", 100, 100);

-- 6 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("the avengers", "movies", 130, 120);

-- 7 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("halo 5", "games", 150, 200);

-- 8 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("PUBG", "games", 135, 300);

-- 9 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("fortnite", "games", 130, 300);

-- 10 --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("overwatch", "games", 125, 200);