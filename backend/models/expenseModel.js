const db = require('../config/db');

const Expense = {
    getHighestExpenseCategories: async () => {
        const query = `
            SELECT 
                category,
                SUM(amount) AS total_expense
            FROM expenses
            GROUP BY category
            ORDER BY total_expense DESC
        `;

        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = Expense;