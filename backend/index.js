require('dotenv').config(); // Loads .env for local or cloud DB
const express = require('express');
const cors = require('cors');

// #Route_Import_Ekhane_Sob_Backend_Route_File_Import_Kora_Hoy
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const auditRoutes = require('./routes/auditRoutes');
const financeRoutes = require('./routes/financeRoutes');
const businessRoutes = require('./routes/businessRoutes');

// #App_Setup_Ekhane_Express_App_Create_Kora_Hoy
const app = express();

// #Middleware_Setup_Ekhane_CORS_Ar_JSON_Body_Enable_Kora_Hoy
app.use(cors());
app.use(express.json());

// #API_Route_Setup_Ekhane_Frontend_Theke_Backend_API_Connect_Kora_Hoy
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/finance', financeRoutes);

// #Business_Route_Ekhane_FR1_FR2_FR3_FR6_Er_API_Connect_Kora_Hoy
app.use('/api/business', businessRoutes);

// #Health_Check_Ekhane_Server_Running_Kina_Check_Kora_Hoy
app.get('/', (req, res) => {
    res.send('SME360 API is active and connected.');
});

// #Error_Handler_Ekhane_Backend_Error_Handle_Kora_Hoy
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error - Check Backend Logs' });
});

// #Server_Start_Ekhane_Backend_Server_Port_5000_E_Run_Hoy
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 SME360 SERVER RUNNING ON PORT: ${PORT}`);
    console.log(`✅ EXISTING + FINANCE + BUSINESS FEATURES CONNECTED`);
    console.log(`-----------------------------------------`);
});