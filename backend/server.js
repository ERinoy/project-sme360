// ... existing imports ...

// FEATURE 12 & 13: Financial & Profit Margin Analytics
app.get('/api/finance/analytics', (req, res) => {
    const query = `
        SELECT 
            name, 
            selling_price, 
            (selling_price * 0.3) as profit_margin, 
            stock_quantity 
        FROM products
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// FEATURE 11: Revenue vs Expense Trends (Last 6 Months Mockup)
app.get('/api/finance/trends', (req, res) => {
    const trends = [
        { month: 'Jan', revenue: 45000, expenses: 32000 },
        { month: 'Feb', revenue: 52000, expenses: 34000 },
        { month: 'Mar', revenue: 48000, expenses: 31000 },
        { month: 'Apr', revenue: 61000, expenses: 40000 }
    ];
    res.json(trends);
});

// FEATURE 17 & 22: Strategic DSS & Sales Forecasting
app.get('/api/finance/strategy', (req, res) => {
    db.query('SELECT SUM(selling_price * stock_quantity) as asset_value FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        const val = results[0].asset_value || 0;
        res.json({
            currentVal: val,
            forecast15: val * 1.15, // Feature 17
            strategicGoal: val * 1.30 // Feature 22 (30% Expansion Target)
        });
    });
});