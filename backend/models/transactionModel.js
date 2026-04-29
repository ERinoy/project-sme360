// backend/models/transactionModel.js

const db = require('../config/db');

// ─────────────────────────────────────────
// CREATE a new sales transaction
// ─────────────────────────────────────────
const createTransaction = async (product_id, customer_id, quantity, unit_price, created_by) => {
  const [result] = await db.execute(
    `INSERT INTO sales_transactions 
      (product_id, customer_id, quantity, unit_price, created_by) 
     VALUES (?, ?, ?, ?, ?)`,
    [product_id, customer_id || null, quantity, unit_price, created_by]
  );
  return result.insertId;
};

// ─────────────────────────────────────────
// GET all transactions
// Optional filter by month and year
// ─────────────────────────────────────────
const getAllTransactions = async (month, year) => {
  if (month && year) {
    const [rows] = await db.execute(
      `SELECT 
        st.transaction_id,
        st.quantity,
        st.unit_price,
        st.total_amount,
        st.transaction_date,
        p.product_name,
        p.category,
        c.customer_name
       FROM sales_transactions st
       JOIN products p ON st.product_id = p.product_id
       LEFT JOIN customers c ON st.customer_id = c.customer_id
       WHERE MONTH(st.transaction_date) = ? AND YEAR(st.transaction_date) = ?
       ORDER BY st.transaction_date DESC`,
      [month, year]
    );
    return rows;
  }

  const [rows] = await db.execute(
    `SELECT 
      st.transaction_id,
      st.quantity,
      st.unit_price,
      st.total_amount,
      st.transaction_date,
      p.product_name,
      p.category,
      c.customer_name
     FROM sales_transactions st
     JOIN products p ON st.product_id = p.product_id
     LEFT JOIN customers c ON st.customer_id = c.customer_id
     ORDER BY st.transaction_date DESC`
  );
  return rows;
};

// ─────────────────────────────────────────
// GET single transaction by ID
// ─────────────────────────────────────────
const getTransactionById = async (transaction_id) => {
  const [rows] = await db.execute(
    `SELECT 
      st.transaction_id,
      st.quantity,
      st.unit_price,
      st.total_amount,
      st.transaction_date,
      p.product_name,
      p.category,
      p.cost_price,
      c.customer_name,
      c.email AS customer_email
     FROM sales_transactions st
     JOIN products p ON st.product_id = p.product_id
     LEFT JOIN customers c ON st.customer_id = c.customer_id
     WHERE st.transaction_id = ?`,
    [transaction_id]
  );
  return rows[0];
};

// ─────────────────────────────────────────
// GET daily revenue — today's total
// ─────────────────────────────────────────
const getDailyRevenue = async () => {
  const [rows] = await db.execute(
    `SELECT 
      DATE(transaction_date) AS date,
      SUM(total_amount)      AS daily_revenue,
      COUNT(*)               AS total_transactions
     FROM sales_transactions
     WHERE DATE(transaction_date) = CURDATE()
     GROUP BY DATE(transaction_date)`
  );
  // If no transactions today, return zero
  return rows[0] || { date: new Date().toISOString().split('T')[0], daily_revenue: 0, total_transactions: 0 };
};

// ─────────────────────────────────────────
// GET monthly revenue — current month total
// ─────────────────────────────────────────
const getMonthlyRevenue = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  const [rows] = await db.execute(
    `SELECT 
      MONTH(transaction_date) AS month,
      YEAR(transaction_date)  AS year,
      SUM(total_amount)       AS monthly_revenue,
      COUNT(*)                AS total_transactions
     FROM sales_transactions
     WHERE MONTH(transaction_date) = ? AND YEAR(transaction_date) = ?
     GROUP BY MONTH(transaction_date), YEAR(transaction_date)`,
    [targetMonth, targetYear]
  );
  return rows[0] || { month: targetMonth, year: targetYear, monthly_revenue: 0, total_transactions: 0 };
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getDailyRevenue,
  getMonthlyRevenue
};