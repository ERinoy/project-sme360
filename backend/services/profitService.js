// backend/services/profitService.js

const db = require('../config/db');

// ─────────────────────────────────────────
// GROSS PROFIT
// Gross Profit = Total Revenue − COGS
// COGS = SUM(quantity * cost_price) for all transactions in period
// ─────────────────────────────────────────
const calculateGrossProfit = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  // Total revenue for the period
  const [revenueRows] = await db.execute(
    `SELECT COALESCE(SUM(total_amount), 0) AS total_revenue
     FROM sales_transactions
     WHERE MONTH(transaction_date) = ? AND YEAR(transaction_date) = ?`,
    [targetMonth, targetYear]
  );

  // COGS — cost_price comes from products table
  const [cogsRows] = await db.execute(
    `SELECT COALESCE(SUM(st.quantity * p.cost_price), 0) AS total_cogs
     FROM sales_transactions st
     JOIN products p ON st.product_id = p.product_id
     WHERE MONTH(st.transaction_date) = ? AND YEAR(st.transaction_date) = ?`,
    [targetMonth, targetYear]
  );

  const totalRevenue = parseFloat(revenueRows[0].total_revenue);
  const totalCOGS    = parseFloat(cogsRows[0].total_cogs);
  const grossProfit  = totalRevenue - totalCOGS;

  return {
    month:         targetMonth,
    year:          targetYear,
    total_revenue: totalRevenue,
    total_cogs:    totalCOGS,
    gross_profit:  grossProfit
  };
};

// ─────────────────────────────────────────
// NET PROFIT
// Net Profit = Gross Profit − Total Expenses
// ─────────────────────────────────────────
const calculateNetProfit = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  // Reuse gross profit logic
  const grossData = await calculateGrossProfit(targetMonth, targetYear);

  // Total expenses for the period
  const [expenseRows] = await db.execute(
    `SELECT COALESCE(SUM(amount), 0) AS total_expenses
     FROM expenses
     WHERE MONTH(expense_date) = ? AND YEAR(expense_date) = ?`,
    [targetMonth, targetYear]
  );

  const totalExpenses = parseFloat(expenseRows[0].total_expenses);
  const netProfit     = grossData.gross_profit - totalExpenses;

  return {
    month:           targetMonth,
    year:            targetYear,
    total_revenue:   grossData.total_revenue,
    total_cogs:      grossData.total_cogs,
    gross_profit:    grossData.gross_profit,
    total_expenses:  totalExpenses,
    net_profit:      netProfit
  };
};

// ─────────────────────────────────────────
// PRODUCT-WISE PROFIT MARGINS
// Returns each product sold this period with its margin %
// ─────────────────────────────────────────
const getProductMargins = async (month, year) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  const [rows] = await db.execute(
    `SELECT
      p.product_id,
      p.product_name,
      p.category,
      p.cost_price,
      p.selling_price,
      SUM(st.quantity)       AS units_sold,
      SUM(st.total_amount)   AS total_revenue,
      SUM(st.quantity * p.cost_price) AS total_cost,
      ROUND(
        ((p.selling_price - p.cost_price) / p.selling_price) * 100
      , 2) AS profit_margin_pct
     FROM sales_transactions st
     JOIN products p ON st.product_id = p.product_id
     WHERE MONTH(st.transaction_date) = ? AND YEAR(st.transaction_date) = ?
     GROUP BY p.product_id, p.product_name, p.category, p.cost_price, p.selling_price
     ORDER BY profit_margin_pct ASC`,
    [targetMonth, targetYear]
  );
  return rows;
};

module.exports = {
  calculateGrossProfit,
  calculateNetProfit,
  getProductMargins
};