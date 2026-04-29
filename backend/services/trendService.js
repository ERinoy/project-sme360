// backend/services/trendService.js

const db = require('../config/db');

// ─────────────────────────────────────────
// HELPER — get total revenue for any month/year
// ─────────────────────────────────────────
const getMonthRevenue = async (month, year) => {
  const [rows] = await db.execute(
    `SELECT COALESCE(SUM(total_amount), 0) AS revenue
     FROM sales_transactions
     WHERE MONTH(transaction_date) = ? AND YEAR(transaction_date) = ?`,
    [month, year]
  );
  return parseFloat(rows[0].revenue);
};

// ─────────────────────────────────────────
// HELPER — get previous month and year
// Handles January → December of previous year correctly
// ─────────────────────────────────────────
const getPreviousMonth = (month, year) => {
  if (month === 1) {
    return { month: 12, year: year - 1 };
  }
  return { month: month - 1, year };
};

// ─────────────────────────────────────────
// DETECT DECLINING SALES TREND  (FR-16)
// Compares current month revenue vs previous month
// Raises alert if decline exceeds threshold (default 15%)
// ─────────────────────────────────────────
const detectSalesTrend = async (month, year, threshold = 0.15) => {
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear  = year  || new Date().getFullYear();

  const prev = getPreviousMonth(targetMonth, targetYear);

  const currentRevenue  = await getMonthRevenue(targetMonth, targetYear);
  const previousRevenue = await getMonthRevenue(prev.month, prev.year);

  // Calculate change percentage
  // If previous month had zero revenue, we cannot calculate a meaningful % change
  let changePercent = 0;
  let changeAmount  = currentRevenue - previousRevenue;

  if (previousRevenue > 0) {
    changePercent = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  }

  // Determine trend direction
  const isDecline    = changePercent < 0 && Math.abs(changePercent) / 100 >= threshold;
  const isGrowth     = changePercent > 0;
  const isStable     = !isDecline && !isGrowth;

  // Build alert if declining beyond threshold
  let alert = null;
  if (isDecline) {
    alert = {
      type:    'DECLINING_SALES',
      message: `Sales have declined by ${Math.abs(changePercent).toFixed(2)}% compared to last month, exceeding the ${threshold * 100}% alert threshold.`,
      severity: Math.abs(changePercent) >= 30 ? 'HIGH' : 'MEDIUM'
    };
  }

  return {
    current_month:    { month: targetMonth, year: targetYear, revenue: currentRevenue },
    previous_month:   { month: prev.month,  year: prev.year,  revenue: previousRevenue },
    change_amount:    parseFloat(changeAmount.toFixed(2)),
    change_percent:   parseFloat(changePercent.toFixed(2)),
    trend:            isDecline ? 'DECLINING' : isGrowth ? 'GROWING' : 'STABLE',
    threshold_pct:    threshold * 100,
    alert_triggered:  isDecline,
    alert:            alert
  };
};

// ─────────────────────────────────────────
// GET last 6 months revenue trend
// Used by dashboard chart to visualize trend over time
// ─────────────────────────────────────────
const getLast6MonthsTrend = async () => {
  const [rows] = await db.execute(
    `SELECT
      MONTH(transaction_date) AS month,
      YEAR(transaction_date)  AS year,
      SUM(total_amount)       AS revenue
     FROM sales_transactions
     WHERE transaction_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
     GROUP BY MONTH(transaction_date), YEAR(transaction_date)
     ORDER BY year ASC, month ASC`
  );
  return rows;
};

module.exports = {
  detectSalesTrend,
  getLast6MonthsTrend
};