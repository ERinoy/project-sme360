// backend/controllers/expenseController.js

const expenseModel = require('../models/expenseModel');

// ─────────────────────────────────────────
// POST /api/expenses
// Record a new expense
// ─────────────────────────────────────────
const createExpense = async (req, res) => {
  try {
    const { title, amount, category_id, expense_date } = req.body;
    const created_by = req.user.userId;

    if (!title || !amount || !category_id || !expense_date) {
      return res.status(400).json({
        message: 'title, amount, category_id, and expense_date are required.'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero.' });
    }

    const newId = await expenseModel.createExpense(
      title,
      amount,
      category_id,
      expense_date,
      created_by
    );

    res.status(201).json({
      message: 'Expense recorded successfully.',
      expense_id: newId
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error while recording expense.' });
  }
};

// ─────────────────────────────────────────
// GET /api/expenses
// Get all expenses — optional ?month=&year= filters
// ─────────────────────────────────────────
const getAllExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;
    const expenses = await expenseModel.getAllExpenses(month, year);

    res.status(200).json({
      count: expenses.length,
      expenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error while fetching expenses.' });
  }
};

// ─────────────────────────────────────────
// GET /api/expenses/:id
// Get single expense
// ─────────────────────────────────────────
const getExpenseById = async (req, res) => {
  try {
    const expense = await expenseModel.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error('Get expense by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching expense.' });
  }
};

// ─────────────────────────────────────────
// GET /api/expenses/categories
// Get all expense categories
// ─────────────────────────────────────────
const getAllCategories = async (req, res) => {
  try {
    const categories = await expenseModel.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error while fetching categories.' });
  }
};

// ─────────────────────────────────────────
// GET /api/expenses/monthly-total
// Get total expenses for current or given month
// Optional ?month=&year= query params
// ─────────────────────────────────────────
const getMonthlyTotal = async (req, res) => {
  try {
    const { month, year } = req.query;
    const total = await expenseModel.getMonthlyTotal(month, year);
    res.status(200).json(total);
  } catch (error) {
    console.error('Get monthly total error:', error);
    res.status(500).json({ message: 'Server error while fetching monthly total.' });
  }
};

// ─────────────────────────────────────────
// GET /api/expenses/top-categories
// Get highest spending categories this month
// Optional ?month=&year= query params
// ─────────────────────────────────────────
const getTopExpenseCategories = async (req, res) => {
  try {
    const { month, year } = req.query;
    const categories = await expenseModel.getTopExpenseCategories(month, year);
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get top categories error:', error);
    res.status(500).json({ message: 'Server error while fetching top categories.' });
  }
};

const getHighestExpenseCategories = async (req, res) => {
  try {
    const { month, year } = req.query;
    const categories = await expenseModel.getHighestExpenseCategories(month, year);
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get highest categories error:', error);
    res.status(500).json({ message: 'Server error while fetching highest expense categories.' });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  getAllCategories,
  getMonthlyTotal,
  getTopExpenseCategories,
  getHighestExpenseCategories
};