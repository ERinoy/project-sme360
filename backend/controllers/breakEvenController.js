const BreakEven = require('../models/breakEvenModel');

exports.calculateBreakEven = (req, res) => {
    try {
        const { fixedCost, sellingPrice, variableCost } = req.body;

        if (!fixedCost || !sellingPrice || variableCost === undefined) {
            return res.status(400).json({
                error: "fixedCost, sellingPrice, and variableCost are required"
            });
        }

        const result = BreakEven.calculate(
            Number(fixedCost),
            Number(sellingPrice),
            Number(variableCost)
        );

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};