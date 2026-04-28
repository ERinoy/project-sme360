const productRoutes = require('./routes/productRoutes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const auditRoutes = require('./routes/auditRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const breakEvenRoutes = require('./routes/breakEvenRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const app = express();

// Middleware
app.use('/api/suppliers', supplierRoutes);
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/breakeven', breakEvenRoutes);
app.use('/api/performance', performanceRoutes);


// Dummy Route to test if Server is alive
app.get('/', (req, res) => {
    res.send('SME360 Backend is running!');
});

// Database Connection Test Route
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ message: "Database connected successfully!", data: rows });
    } catch (err) {
        res.status(500).json({ message: "Database connection failed", error: err });
    }
});

// Main Feature Routes
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is sprinting on port ${PORT}`);
});