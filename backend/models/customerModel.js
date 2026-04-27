const db = require('../config/db');

const Customer = {

    // Feature 1: Customer History (FR-4)
    getPurchaseHistory: async (customerId) => {
        const query = `
            SELECT s.id, s.amount, s.sale_date, c.name as customer_name
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            WHERE c.id = ?
            ORDER BY s.sale_date DESC`;
        const [rows] = await db.execute(query, [customerId]);
        return rows;
    },

    // Feature 2: Monthly Analytics (FR-14) 
    getMonthlyAnalytics: async () => {
        const query = `
            SELECT 
                DATE_FORMAT(sale_date, '%Y-%m') AS month,
                SUM(amount) AS total_revenue,
                SUM(amount - cost) AS total_profit
            FROM sales
            GROUP BY month
            ORDER BY month ASC`;
        const [rows] = await db.execute(query);
        return rows;
    },

    //(Feature 5)

    getDailyRevenue: async () => {
        const query = `
            SELECT 
                DATE(sale_date) AS date,
                SUM(amount) AS total_revenue
            FROM sales
            GROUP BY DATE(sale_date)
            ORDER BY date DESC
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    getMonthlyRevenue: async () => {
        const query = `
            SELECT 
                DATE_FORMAT(sale_date, '%Y-%m') AS month,
                SUM(amount) AS total_revenue
            FROM sales
            GROUP BY month
            ORDER BY month DESC
        `;
        const [rows] = await db.execute(query);
        return rows;
    }

    

};

module.exports = Customer;