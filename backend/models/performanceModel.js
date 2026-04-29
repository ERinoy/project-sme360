const db = require('../config/db');

const Performance = {
    getMonthlySummary: async () => {
        const query = `
            SELECT 
                revenue_data.month,
                revenue_data.total_revenue,
                IFNULL(expense_data.total_expenses, 0) AS total_expenses,
                revenue_data.total_sales,
                (revenue_data.total_revenue - IFNULL(expense_data.total_expenses, 0)) AS net_profit
            FROM (
                SELECT 
                    DATE_FORMAT(sale_date, '%Y-%m') AS month,
                    SUM(amount) AS total_revenue,
                    COUNT(*) AS total_sales
                FROM sales
                GROUP BY DATE_FORMAT(sale_date, '%Y-%m')
            ) revenue_data
            LEFT JOIN (
                SELECT 
                    DATE_FORMAT(expense_date, '%Y-%m') AS month,
                    SUM(amount) AS total_expenses
                FROM expenses
                GROUP BY DATE_FORMAT(expense_date, '%Y-%m')
            ) expense_data
            ON revenue_data.month = expense_data.month
            ORDER BY revenue_data.month DESC
        `;

        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = Performance;