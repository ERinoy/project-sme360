// backend/routes/transactionRoutes.js

const express               = require('express');
const router                = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken }       = require('../middleware/authMiddleware');

// All transaction routes are protected — must be logged in
router.use(verifyToken);

// ── Specific routes MUST come before parameterized routes ──
router.get('/revenue/daily',   transactionController.getDailyRevenue);
router.get('/revenue/monthly', transactionController.getMonthlyRevenue);

// ── General routes ──
router.post('/',    transactionController.createTransaction);
router.get('/',     transactionController.getAllTransactions);
router.get('/:id',  transactionController.getTransactionById);

module.exports = router;
