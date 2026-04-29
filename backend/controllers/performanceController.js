const Performance = require('../models/performanceModel');

exports.getMonthlySummary = async (req, res) => {
    try {
        const data = await Performance.getMonthlySummary();
        res.status(200).json(data);
    } catch (err) {
        console.error("Monthly Performance Summary Error:", err);
        res.status(500).json({
            error: "Failed to fetch monthly performance summary",
            sqlMessage: err.sqlMessage
        });
    }
};