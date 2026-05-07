const Product = require('../models/productModel');

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Product.getLowStockAlerts();
        res.status(200).json(alerts);
    } catch (err) {
        console.error("Inventory Error:", err);
        res.status(500).json({ error: "Failed to fetch stock alerts" });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json({ products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};