CREATE DATABASE IF NOT EXISTS sme_db;
USE sme_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  product_id INT,
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

INSERT INTO users (username, password)
VALUES ('sadab', '1234')
ON DUPLICATE KEY UPDATE password = '1234';

INSERT INTO sales (customer_id, product_id, amount, cost, sale_date) VALUES
(1, 1, 5000, 3000, '2026-04-01'),
(1, 2, 3000, 1800, '2026-04-02'),
(2, 1, 7000, 4000, '2026-05-01');

INSERT INTO expenses (category, amount, expense_date, description) VALUES
('Rent', 12000, '2026-04-05', 'Shop rent'),
('Utilities', 3000, '2026-04-10', 'Electricity bill'),
('Marketing', 5000, '2026-04-15', 'Facebook ads'),
('Rent', 12000, '2026-05-05', 'Shop rent');

INSERT INTO audit_logs (action_type, table_name, description) VALUES
('INSERT', 'sales', 'Initial sales records inserted for finance analytics'),
('INSERT', 'expenses', 'Initial expense records inserted for expense category analysis');