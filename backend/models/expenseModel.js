// backend/models/expenseModel.js

const db = require('../config/db');

// ─────────────────────────────────────────
// CREATE a new expense
// ─────────────────────────────────────────
const createExpense = async (title, amount, category_id, expense_date, created_by) => {
  const [result] = await db.execute(
    `INSERT INTO expenses (title, amount, category_id, expense_date, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [title, amount, category_id, expense_date, created_by]
  );
  return result.insertId;
};

// ─────────────────────────────────────────
// GET all expenses
// Optional filter by month and year
// ─────────────────────────────────────────
const getAllExpenses = async (month, year) => {
  if (month && year) {
    const [rows] = await db.execute(
      `SELECT
        e.expense_id,
        e.title,
        e.amount,
        e.expense_date,
        e.created_at,
        ec.category_name
       FROM expenses e
       JOIN expense_categories ec ON e.category_id = ec.category_id
       WHERE MONTH(e.expense_date) = ? AND YEAR(e.expense_date) = ?
       ORDER BY e.expense_date DESC`,
      [month, year]
    );
    return rows;
  }

  const [rows] = await db.execute(
    `SELECT
      e.expense_id,
      e.title,
      e.amount,
      e.expense_date,
      e.created_at,
      ec.category_name
     FROM expenses e
     JOIN expense_categories ec ON e.category_id = ec.category_id
     ORDER BY e.expense_date DESC`
  );
  return rows;
};

// ─────────────────────────────────────────
// GET single expense by ID
// ─────────────────────────────────────────
const getExpenseById = async (expense_id) => {
  const [rows] = await db.execute(
    `SELECT
      e.expense_id,
      e.title,
      e.amount,
      e.expense_date,
      e.created_at,
      ec.category_name,
      ec.category_id
     FROM expenses e
     JOIN expense_categories ec ON e.category_id = ec.category_id
     WHERE e.expense_id = ?`,
    [expense_id]
  );
  return rows[0];
};

// ─────────────────────────────────────────
// GET all expense categories
// ─────────────────────────────────────────
const getAllCategories = async () => {
  const [rows] = await db.execute(
    `SELECT category_id, category_name
     FROM expense_categories
     ORDER BY category_name ASC`
  );
  return rows;
};

// ─────────────────────────────────────────
// GET total monthly expenses
// Optional month and year — defaults to current month
// ─────────────────────────────────────────
const getMonthlyTotal = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  const [rows] = await db.execute(
    `SELECT
      MONTH(expense_date) AS month,
      YEAR(expense_date)  AS year,
      SUM(amount)         AS total_expenses,
      COUNT(*)            AS total_entries
     FROM expenses
     WHERE MONTH(expense_date) = ? AND YEAR(expense_date) = ?
     GROUP BY MONTH(expense_date), YEAR(expense_date)`,
    [targetMonth, targetYear]
  );
  return rows[0] || { month: targetMonth, year: targetYear, total_expenses: 0, total_entries: 0 };
};

// ─────────────────────────────────────────
// GET top expense categories for a given month
// Returns categories ranked by total amount spent
// ─────────────────────────────────────────
const getTopExpenseCategories = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  const [rows] = await db.execute(
    `SELECT
      ec.category_name,
      SUM(e.amount)  AS total_amount,
      COUNT(*)       AS total_entries
     FROM expenses e
     JOIN expense_categories ec ON e.category_id = ec.category_id
     WHERE MONTH(e.expense_date) = ? AND YEAR(e.expense_date) = ?
     GROUP BY ec.category_id, ec.category_name
     ORDER BY total_amount DESC`,
    [targetMonth, targetYear]
  );
  return rows;
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  getAllCategories,
  getMonthlyTotal,
  getTopExpenseCategories
};