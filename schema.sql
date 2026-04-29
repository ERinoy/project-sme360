-- ============================================
-- SME Business Performance System
-- Schema for Rinoy's Features: FR-1, FR-6, FR-11, FR-16, FR-21
-- ============================================

CREATE DATABASE IF NOT EXISTS sme_db;
USE sme_db;

-- ─────────────────────────────────────────
-- 1. USERS (required for auth)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  user_id       INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL UNIQUE,
  email         VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'viewer') DEFAULT 'viewer',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 2. PRODUCTS (local version — coordinate with Rashedeen later)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  product_id     INT AUTO_INCREMENT PRIMARY KEY,
  product_name   VARCHAR(100)  NOT NULL,
  category       VARCHAR(50)   NOT NULL,
  cost_price     DECIMAL(10,2) NOT NULL,
  selling_price  DECIMAL(10,2) NOT NULL,
  stock_quantity INT           NOT NULL DEFAULT 0,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 3. CUSTOMERS (FR-1 dependency)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  customer_id   INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email         VARCHAR(100),
  phone         VARCHAR(20),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 4. SALES TRANSACTIONS (FR-1)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sales_transactions (
  transaction_id   INT AUTO_INCREMENT PRIMARY KEY,
  product_id       INT           NOT NULL,
  customer_id      INT,
  quantity         INT           NOT NULL,
  unit_price       DECIMAL(10,2) NOT NULL,
  total_amount     DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  transaction_date DATETIME      DEFAULT CURRENT_TIMESTAMP,
  created_by       INT,
  FOREIGN KEY (product_id)  REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (created_by)  REFERENCES users(user_id)
);

-- ─────────────────────────────────────────
-- 5. EXPENSE CATEGORIES (FR-6)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS expense_categories (
  category_id   INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE
);

-- Seed default categories immediately
INSERT INTO expense_categories (category_name) VALUES
  ('Rent'),
  ('Utilities'),
  ('Salaries'),
  ('Marketing'),
  ('Logistics'),
  ('Miscellaneous');

-- ─────────────────────────────────────────
-- 6. EXPENSES (FR-6)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  expense_id    INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(150)  NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  category_id   INT           NOT NULL,
  expense_date  DATE          NOT NULL,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by    INT,
  FOREIGN KEY (category_id) REFERENCES expense_categories(category_id),
  FOREIGN KEY (created_by)  REFERENCES users(user_id)
);

-- ============================================
-- Schema for Rinoy's Features: FR-1, FR-6, FR-11, FR-16, FR-21
--Ends here
-- ============================================