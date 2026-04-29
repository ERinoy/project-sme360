// backend/controllers/dashboardController.js

const profitService = require('../services/profitService');
const trendService  = require('../services/trendService');
const db            = require('../config/db');

// ─────────────────────────────────────────
// GET /api/dashboard/kpis
// Single aggregated call — powers the entire dashboard
// ─────────────────────────────────────────
const getDashboardKPIs = async (req, res) => {
  try {
    const month = req.query.month ? parseInt(req.query.month) : new Date().getMonth() + 1;
    const year  = req.query.year  ? parseInt(req.query.year)  : new Date().getFullYear();

    // Run all queries in parallel for performance
    const [
      profitData,
      trendData,
      trendHistory,
      topProductsRows,
      topExpenseCategoriesRows
    ] = await Promise.all([
      profitService.calculateNetProfit(month, year),
      trendService.detectSalesTrend(month, year),
      trendService.getLast6MonthsTrend(),

      // Top 5 products by revenue this month
      db.execute(
        `SELECT
          p.product_name,
          p.category,
          SUM(st.quantity)     AS units_sold,
          SUM(st.total_amount) AS total_revenue,
          ROUND(((p.selling_price - p.cost_price) / p.selling_price) * 100, 2) AS margin_pct
         FROM sales_transactions st
         JOIN products p ON st.product_id = p.product_id
         WHERE MONTH(st.transaction_date) = ? AND YEAR(st.transaction_date) = ?
         GROUP BY p.product_id, p.product_name, p.category, p.selling_price, p.cost_price
         ORDER BY total_revenue DESC
         LIMIT 5`,
        [month, year]
      ),

      // Top expense categories this month
      db.execute(
        `SELECT
          ec.category_name,
          SUM(e.amount)  AS total_amount
         FROM expenses e
         JOIN expense_categories ec ON e.category_id = ec.category_id
         WHERE MONTH(e.expense_date) = ? AND YEAR(e.expense_date) = ?
         GROUP BY ec.category_id, ec.category_name
         ORDER BY total_amount DESC`,
        [month, year]
      )
    ]);

    res.status(200).json({
      period: { month, year },
      kpis: {
        total_revenue:  profitData.total_revenue,
        total_cogs:     profitData.total_cogs,
        gross_profit:   profitData.gross_profit,
        total_expenses: profitData.total_expenses,
        net_profit:     profitData.net_profit
      },
      trend: {
        current_month:   trendData.current_month,
        previous_month:  trendData.previous_month,
        change_percent:  trendData.change_percent,
        change_amount:   trendData.change_amount,
        trend_direction: trendData.trend,
        alert_triggered: trendData.alert_triggered,
        alert:           trendData.alert
      },
      charts: {
        revenue_trend:      trendHistory,
        top_products:       topProductsRows[0],
        expense_categories: topExpenseCategoriesRows[0]
      }
    });

  } catch (error) {
    console.error('Dashboard KPI error:', error);
    res.status(500).json({ message: 'Server error while loading dashboard.' });
  }
};

module.exports = { getDashboardKPIs };