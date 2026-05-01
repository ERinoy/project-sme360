const db = require('../config/db');

const Finance = {
  getRevenueSummary: async () => {
    const dailyQuery = `
      SELECT 
        sale_date,
        SUM(amount) AS total_revenue
      FROM sales
      GROUP BY sale_date
      ORDER BY sale_date DESC
      LIMIT 30
    `;

    const monthlyQuery = `
      SELECT 
        DATE_FORMAT(sale_date, '%Y-%m') AS month,
        SUM(amount) AS total_revenue
      FROM sales
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
    `;

    const [dailyRevenue] = await db.execute(dailyQuery);
    const [monthlyRevenue] = await db.execute(monthlyQuery);

    return {
      dailyRevenue,
      monthlyRevenue
    };
  },

  getTopExpenseCategories: async () => {
    const query = `
      SELECT 
        category,
        SUM(amount) AS total_expense,
        COUNT(*) AS total_transactions
      FROM expenses
      GROUP BY category
      ORDER BY total_expense DESC
      LIMIT 5
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  getBreakEvenAnalysis: async () => {
    const expenseQuery = `
      SELECT 
        COALESCE(SUM(amount), 0) AS fixed_cost
      FROM expenses
    `;

    const salesQuery = `
      SELECT 
        COALESCE(SUM(amount), 0) AS total_revenue,
        COALESCE(SUM(cost), 0) AS total_variable_cost,
        COUNT(*) AS total_sales
      FROM sales
    `;

    const [expenseRows] = await db.execute(expenseQuery);
    const [salesRows] = await db.execute(salesQuery);

    const fixedCost = Number(expenseRows[0].fixed_cost);
    const totalRevenue = Number(salesRows[0].total_revenue);
    const totalVariableCost = Number(salesRows[0].total_variable_cost);
    const totalSales = Number(salesRows[0].total_sales);

    const contribution = totalRevenue - totalVariableCost;
    const averageContributionPerSale = totalSales > 0 ? contribution / totalSales : 0;
    const contributionMarginRatio = totalRevenue > 0 ? contribution / totalRevenue : 0;

    const breakEvenSalesCount =
      averageContributionPerSale > 0
        ? Math.ceil(fixedCost / averageContributionPerSale)
        : 0;

    const breakEvenRevenue =
      contributionMarginRatio > 0
        ? fixedCost / contributionMarginRatio
        : 0;

    return {
      fixedCost,
      totalRevenue,
      totalVariableCost,
      contribution,
      averageContributionPerSale,
      contributionMarginRatio,
      breakEvenSalesCount,
      breakEvenRevenue
    };
  },

  calculateBreakEvenFromInput: async (fixedCost, sellingPricePerUnit, variableCostPerUnit) => {
    const fixedCostNumber = Number(fixedCost);
    const sellingPriceNumber = Number(sellingPricePerUnit);
    const variableCostNumber = Number(variableCostPerUnit);

    const contributionMarginPerUnit = sellingPriceNumber - variableCostNumber;
    const contributionMarginRatio = contributionMarginPerUnit / sellingPriceNumber;

    const breakEvenUnits = fixedCostNumber / contributionMarginPerUnit;
    const breakEvenRevenue = breakEvenUnits * sellingPriceNumber;

    return {
      fixedCost: fixedCostNumber,
      sellingPricePerUnit: sellingPriceNumber,
      variableCostPerUnit: variableCostNumber,
      contributionMarginPerUnit,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenUnitsRounded: Math.ceil(breakEvenUnits),
      breakEvenRevenue
    };
  },

  getMonthlyPerformanceSummary: async () => {
    const query = `
      SELECT 
        m.month,
        COALESCE(r.total_revenue, 0) AS total_revenue,
        COALESCE(r.total_cost, 0) AS total_cost,
        COALESCE(e.total_expense, 0) AS total_expense,
        COALESCE(r.total_revenue, 0) - COALESCE(r.total_cost, 0) AS gross_profit,
        COALESCE(r.total_revenue, 0) - COALESCE(r.total_cost, 0) - COALESCE(e.total_expense, 0) AS net_profit
      FROM (
        SELECT DATE_FORMAT(sale_date, '%Y-%m') AS month FROM sales
        UNION
        SELECT DATE_FORMAT(expense_date, '%Y-%m') AS month FROM expenses
      ) m
      LEFT JOIN (
        SELECT 
          DATE_FORMAT(sale_date, '%Y-%m') AS month,
          SUM(amount) AS total_revenue,
          SUM(cost) AS total_cost
        FROM sales
        GROUP BY month
      ) r ON m.month = r.month
      LEFT JOIN (
        SELECT 
          DATE_FORMAT(expense_date, '%Y-%m') AS month,
          SUM(amount) AS total_expense
        FROM expenses
        GROUP BY month
      ) e ON m.month = e.month
      ORDER BY m.month DESC
      LIMIT 12
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  getAuditLogs: async () => {
    const query = `
      SELECT 
        id,
        action_type,
        table_name,
        description,
        action_date
      FROM audit_logs
      ORDER BY action_date DESC
      LIMIT 30
    `;

    const [rows] = await db.execute(query);
    return rows;
  }
};

module.exports = Finance;