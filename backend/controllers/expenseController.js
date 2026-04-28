const Expense = require('../models/expenseModel');

exports.getHighestExpenseCategories = async (req, res) => {
    try {
        const data = await Expense.getHighestExpenseCategories();
        res.status(200).json(data);
    } catch (err) {
        console.error("Expense Category Error:", err);
        res.status(500).json({
            error: "Failed to fetch highest expense categories",
            sqlMessage: err.sqlMessage
        });
    }
};