const db = require('../config/db');

const Product = {
    // Feature: Low Stock Alerts (FR-9)
    getLowStockAlerts: async () => {
        const query = `
        SELECT p.product_name, p.stock_quantity, p.min_threshold, s.supplier_name, s.phone 
        FROM products p
        JOIN suppliers s ON p.supplier_id = s.id
        WHERE p.stock_quantity < p.min_threshold`;
        const [rows] = await db.execute(query);
        return rows;
    },

    getAll: async () => {
        const [rows] = await db.execute('SELECT product_id, product_name, selling_price FROM products');
        return rows;
    }
};

module.exports = Product;