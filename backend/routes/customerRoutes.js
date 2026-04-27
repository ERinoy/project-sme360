const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Routes
router.get('/:id/history', customerController.getCustomerHistory);
router.get('/analytics/monthly', customerController.getAnalytics);
router.get('/revenue/daily', customerController.getDailyRevenue);
router.get('/revenue/monthly', customerController.getMonthlyRevenue);

module.exports = router;