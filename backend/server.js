// backend/server.js

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes       = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const expenseRoutes    = require('./routes/expenseRoutes');
const profitRoutes     = require('./routes/profitRoutes');
const dashboardRoutes  = require('./routes/dashboardRoutes');
const productRoutes    = require('./routes/productRoutes');

app.use('/api/auth',         authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/expenses',     expenseRoutes);
app.use('/api/profit',       profitRoutes);
app.use('/api/dashboard',    dashboardRoutes);
app.use('/api/products',     productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SME System API is running.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});