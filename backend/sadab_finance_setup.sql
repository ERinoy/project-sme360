CREATE DATABASE IF NOT EXISTS sme_db;
USE sme_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  supplier_name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  phone VARCHAR(30),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  stock_quantity INT NOT NULL DEFAULT 0,
  min_threshold INT NOT NULL DEFAULT 5,
  supplier_id INT,
  selling_price DECIMAL(10,2) DEFAULT 0,
  variable_cost DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  amount DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) DEFAULT 0,
  sale_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action_type VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products
ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';

ALTER TABLE sales
ADD COLUMN IF NOT EXISTS quantity INT DEFAULT 1;

INSERT INTO users (id, username, password) VALUES
(1, 'sadab', '1234')
ON DUPLICATE KEY UPDATE
username = VALUES(username),
password = VALUES(password);

INSERT INTO customers (id, name, phone, email) VALUES
(1, 'Rahim Store', '01711111111', 'rahim@example.com'),
(2, 'Karim Traders', '01822222222', 'karim@example.com'),
(3, 'Nadia Enterprise', '01933333333', 'nadia@example.com')
ON DUPLICATE KEY UPDATE
name = VALUES(name),
phone = VALUES(phone),
email = VALUES(email);

INSERT INTO suppliers (id, supplier_name, contact_person, phone, email) VALUES
(1, 'ABC Wholesale', 'Mr. Hasan', '01611111111', 'abc@example.com'),
(2, 'Global Supplies', 'Ms. Rina', '01622222222', 'global@example.com'),
(3, 'Fast Distribution', 'Mr. Imran', '01633333333', 'fast@example.com')
ON DUPLICATE KEY UPDATE
supplier_name = VALUES(supplier_name),
contact_person = VALUES(contact_person),
phone = VALUES(phone),
email = VALUES(email);

INSERT INTO products (id, product_name, category, stock_quantity, min_threshold, supplier_id, selling_price, variable_cost) VALUES
(1, 'Notebook', 'Stationery', 50, 10, 1, 100, 60),
(2, 'Pen Box', 'Stationery', 20, 5, 2, 200, 120),
(3, 'Calculator', 'Electronics', 8, 5, 3, 800, 500),
(4, 'Marker Set', 'Stationery', 15, 6, 1, 250, 150)
ON DUPLICATE KEY UPDATE
product_name = VALUES(product_name),
category = VALUES(category),
stock_quantity = VALUES(stock_quantity),
min_threshold = VALUES(min_threshold),
supplier_id = VALUES(supplier_id),
selling_price = VALUES(selling_price),
variable_cost = VALUES(variable_cost);

INSERT INTO sales (id, customer_id, product_id, quantity, amount, cost, sale_date) VALUES
(1, 1, 1, 1, 5000, 3000, '2026-04-01'),
(2, 1, 2, 1, 3000, 1800, '2026-04-02'),
(3, 2, 1, 1, 7000, 4000, '2026-05-01')
ON DUPLICATE KEY UPDATE
customer_id = VALUES(customer_id),
product_id = VALUES(product_id),
quantity = VALUES(quantity),
amount = VALUES(amount),
cost = VALUES(cost),
sale_date = VALUES(sale_date);

INSERT INTO expenses (id, category, amount, expense_date, description) VALUES
(1, 'Rent', 12000, '2026-04-05', 'Shop rent'),
(2, 'Utilities', 3000, '2026-04-10', 'Electricity bill'),
(3, 'Marketing', 5000, '2026-04-15', 'Facebook ads'),
(4, 'Rent', 12000, '2026-05-05', 'Shop rent')
ON DUPLICATE KEY UPDATE
category = VALUES(category),
amount = VALUES(amount),
expense_date = VALUES(expense_date),
description = VALUES(description);

INSERT INTO audit_logs (id, action_type, table_name, description) VALUES
(1, 'INSERT', 'sales', 'Initial sales records inserted for finance analytics'),
(2, 'INSERT', 'expenses', 'Initial expense records inserted for expense category analysis'),
(3, 'INSERT', 'customers', 'Demo customers added for customer history feature'),
(4, 'INSERT', 'suppliers', 'Demo suppliers added for supplier management feature'),
(5, 'INSERT', 'products', 'Demo products added for product management and stock alert feature')
ON DUPLICATE KEY UPDATE
action_type = VALUES(action_type),
table_name = VALUES(table_name),
description = VALUES(description);