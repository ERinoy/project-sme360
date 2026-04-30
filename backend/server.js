const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
app.use(cors()); app.use(express.json());

const db = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'sme_db' });

app.get('/api/products', async (req, res) => {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
});

app.get('/api/finance/break-even', async (req, res) => {
    const [expenses] = await db.query("SELECT SUM(amount) as totalFixed FROM expenses");
    const [products] = await db.query("SELECT AVG(selling_price - cost_price) as avgMargin FROM products");
    res.json({ fixedCosts: expenses[0].totalFixed || 0, unitsNeeded: Math.ceil(expenses[0].totalFixed / (products[0].avgMargin || 1)) });
});
// --- KEEP YOUR EXISTING CODE ABOVE THIS LINE ---

// Feature 7: Get Categorized Expenses
app.get('/api/finance/expenses', async (req, res) => {
    try {
        // This selects individual categories and amounts for the breakdown
        const [rows] = await db.query("SELECT category, amount FROM expenses");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Feature 12: Calculate Net Profit
app.get('/api/finance/net-profit', async (req, res) => {
    try {
        // 1. Get Total Expenses
        const [expenseData] = await db.query("SELECT SUM(amount) as totalExpenses FROM expenses");
        const totalExpenses = parseFloat(expenseData[0].totalExpenses) || 0;

        // 2. Calculate Gross Profit from Inventory (Feature 2 data)
        // Formula: (Selling Price - Cost Price) * Stock Quantity
        const [profitData] = await db.query("SELECT SUM((selling_price - cost_price) * stock_quantity) as grossProfit FROM products");
        const grossProfit = parseFloat(profitData[0].grossProfit) || 0;

        // 3. Final Net Profit Calculation
        const netProfit = grossProfit - totalExpenses;

        res.json({ 
            grossProfit, 
            totalExpenses, 
            netProfit 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- KEEP YOUR app.listen LINE BELOW THIS ---
app.listen(5000, () => console.log('🚀 Server Live on 5000'));