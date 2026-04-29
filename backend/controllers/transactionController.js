// backend/controllers/transactionController.js

const transactionModel = require('../models/transactionModel');

// ─────────────────────────────────────────
// POST /api/transactions
// Record a new sale
// ─────────────────────────────────────────
const createTransaction = async (req, res) => {
  try {
    const { product_id, customer_id, quantity, unit_price } = req.body;
    const created_by = req.user.userId; // comes from JWT via authMiddleware

    // Validation
    if (!product_id || !quantity || !unit_price) {
      return res.status(400).json({ message: 'product_id, quantity, and unit_price are required.' });
    }
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero.' });
    }
    if (unit_price <= 0) {
      return res.status(400).json({ message: 'Unit price must be greater than zero.' });
    }

    const newId = await transactionModel.createTransaction(
      product_id,
      customer_id,
      quantity,
      unit_price,
      created_by
    );

    res.status(201).json({
      message:        'Transaction recorded successfully.',
      transaction_id: newId
    });

  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error while recording transaction.' });
  }
};

// ─────────────────────────────────────────
// GET /api/transactions
// Get all transactions — optional ?month=&year= query params
// ─────────────────────────────────────────
const getAllTransactions = async (req, res) => {
  try {
    const { month, year } = req.query;
    const transactions = await transactionModel.getAllTransactions(month, year);

    res.status(200).json({
      count: transactions.length,
      transactions
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error while fetching transactions.' });
  }
};

// ─────────────────────────────────────────
// GET /api/transactions/:id
// Get single transaction
// ─────────────────────────────────────────
const getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionModel.getTransactionById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    res.status(200).json(transaction);

  } catch (error) {
    console.error('Get transaction by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching transaction.' });
  }
};

// ─────────────────────────────────────────
// GET /api/transactions/revenue/daily
// Get today's revenue
// ─────────────────────────────────────────
const getDailyRevenue = async (req, res) => {
  try {
    const revenue = await transactionModel.getDailyRevenue();
    res.status(200).json(revenue);

  } catch (error) {
    console.error('Get daily revenue error:', error);
    res.status(500).json({ message: 'Server error while fetching daily revenue.' });
  }
};

// ─────────────────────────────────────────
// GET /api/transactions/revenue/monthly
// Get monthly revenue — optional ?month=&year= query params
// ─────────────────────────────────────────
const getMonthlyRevenue = async (req, res) => {
  try {
    const { month, year } = req.query;
    const revenue = await transactionModel.getMonthlyRevenue(month, year);
    res.status(200).json(revenue);

  } catch (error) {
    console.error('Get monthly revenue error:', error);
    res.status(500).json({ message: 'Server error while fetching monthly revenue.' });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getDailyRevenue,
  getMonthlyRevenue
};