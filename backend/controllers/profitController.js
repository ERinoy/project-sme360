// backend/controllers/profitController.js

const profitService = require('../services/profitService');
const trendService  = require('../services/trendService');
const profitModel   = require('../models/profitModel');

// ─────────────────────────────────────────
// GET /api/profit/gross
// Optional ?month=&year=
// ─────────────────────────────────────────
const getGrossProfit = async (req, res) => {
  try {
    const { month, year } = req.query;
    const data = await profitService.calculateGrossProfit(month, year);
    res.status(200).json(data);

  } catch (error) {
    console.error('Gross profit error:', error);
    res.status(500).json({ message: 'Server error while calculating gross profit.' });
  }
};

// ─────────────────────────────────────────
// GET /api/profit/net
// Optional ?month=&year=
// ─────────────────────────────────────────
const getNetProfit = async (req, res) => {
  try {
    const { month, year } = req.query;
    const data = await profitService.calculateNetProfit(month, year);
    res.status(200).json(data);

  } catch (error) {
    console.error('Net profit error:', error);
    res.status(500).json({ message: 'Server error while calculating net profit.' });
  }
};

// ─────────────────────────────────────────
// GET /api/profit/margins
// Product-wise margins for the period
// Optional ?month=&year=
// ─────────────────────────────────────────
const getProductMargins = async (req, res) => {
  try {
    const { month, year } = req.query;
    const data = await profitService.getProductMargins(month, year);
    res.status(200).json({ count: data.length, products: data });

  } catch (error) {
    console.error('Product margins error:', error);
    res.status(500).json({ message: 'Server error while fetching product margins.' });
  }
};

// ─────────────────────────────────────────
// GET /api/profit/low-margin
// Products below margin threshold
// Optional ?threshold= (default 10)
// ─────────────────────────────────────────
const getLowMarginProducts = async (req, res) => {
  try {
    const threshold = req.query.threshold || 10;
    const data = await profitModel.getLowMarginProducts(threshold);
    res.status(200).json({ count: data.length, products: data });

  } catch (error) {
    console.error('Low margin error:', error);
    res.status(500).json({ message: 'Server error while fetching low margin products.' });
  }
};

// ─────────────────────────────────────────
// GET /api/profit/trend
// Month-over-month comparison + decline alert (FR-16)
// Optional ?month=&year=&threshold=
// ─────────────────────────────────────────
const getSalesTrend = async (req, res) => {
  try {
    const { month, year, threshold } = req.query;
    const data = await trendService.detectSalesTrend(
      month     ? parseInt(month)     : undefined,
      year      ? parseInt(year)      : undefined,
      threshold ? parseFloat(threshold) / 100 : 0.15
    );
    res.status(200).json(data);

  } catch (error) {
    console.error('Sales trend error:', error);
    res.status(500).json({ message: 'Server error while detecting sales trend.' });
  }
};

// ─────────────────────────────────────────
// GET /api/profit/trend/history
// Last 6 months revenue for chart visualization
// ─────────────────────────────────────────
const getTrendHistory = async (req, res) => {
  try {
    const data = await trendService.getLast6MonthsTrend();
    res.status(200).json({ months: data });

  } catch (error) {
    console.error('Trend history error:', error);
    res.status(500).json({ message: 'Server error while fetching trend history.' });
  }
};

module.exports = {
  getGrossProfit,
  getNetProfit,
  getProductMargins,
  getLowMarginProducts,
  getSalesTrend,
  getTrendHistory
};