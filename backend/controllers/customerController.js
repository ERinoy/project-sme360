const Customer = require('../models/customerModel');

exports.getCustomerHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await Customer.getPurchaseHistory(id);
        res.status(200).json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch customer history" });
    }
};



exports.getAnalytics = async (req, res) => {
    try {
        const data = await Customer.getMonthlyAnalytics();
        res.status(200).json(data);
    } catch (err) {
        // This will print the actual MySQL error in your CMD/Terminal
        console.error("SQL Error Detected:", err); 
        res.status(500).json({ 
            error: "Failed to fetch analytics", 
            sqlMessage: err.sqlMessage // This sends the real error to the browser
        });
    }
};
// Feature 5: Daily Revenue
exports.getDailyRevenue = async (req, res) => {
    try {
        const data = await Customer.getDailyRevenue();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch daily revenue" });
    }
};

// Feature 5: Monthly Revenue
exports.getMonthlyRevenue = async (req, res) => {
    try {
        const data = await Customer.getMonthlyRevenue();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch monthly revenue" });
    }
};