require('dotenv').config(); // Loads .env for local or cloud DB
const express = require('express');
const cors = require('cors');

// --- 1. IMPORT ALL ROUTE FILES ---
// These files handle the functional requirements (FRs)
const authRoutes = require('./routes/authRoutes');          // Login/Logout
const customerRoutes = require('./routes/customerRoutes');  // Customer History, Analytics, Low Margins, Max-ID
const supplierRoutes = require('./routes/supplierRoutes');  // Supplier Management
const productRoutes = require('./routes/productRoutes');    // Stock Alerts
const auditRoutes = require('./routes/auditRoutes');        // Existing Audit Logs

// Sadab Finance Decision Support Features
const financeRoutes = require('./routes/financeRoutes');    // FR-5, FR-10, FR-15, FR-20, FR-25

const app = express();

// --- 2. MIDDLEWARE ---
// Fixes the "Could not connect to server" error from frontend
app.use(cors());
app.use(express.json()); // Essential for reading JSON request bodies

// --- 3. REGISTER API ENDPOINTS ---

// Auth Gate (Used by the Login component)
app.use('/api/auth', authRoutes);

// Customer Intelligence & Analytics
app.use('/api/customers', customerRoutes);

// Supplier Management
app.use('/api/suppliers', supplierRoutes);

// Stock Alerts
app.use('/api/products', productRoutes);

// Existing Audit & Security
app.use('/api/audit', auditRoutes);

// Sadab Finance Decision Support APIs
app.use('/api/finance', financeRoutes);

// --- 4. HEALTH CHECK & ERROR HANDLING ---
app.get('/', (req, res) => {
    res.send('SME360 API is active and connected.');
});

// Global error catcher for database or route failures
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error - Check Backend Logs' });
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 SME360 SERVER RUNNING ON PORT: ${PORT}`);
    console.log(`✅ EXISTING FEATURES + SADAB FINANCE FEATURES CONNECTED`);
    console.log(`-----------------------------------------`);
});