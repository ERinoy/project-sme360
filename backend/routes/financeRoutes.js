const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');

router.get('/revenue-summary', financeController.getRevenueSummary);
router.get('/top-expense-categories', financeController.getTopExpenseCategories);
router.get('/break-even', financeController.getBreakEvenAnalysis);
router.post('/break-even/manual', financeController.calculateBreakEvenFromInput);
router.get('/monthly-summary', financeController.getMonthlyPerformanceSummary);
router.get('/audit-logs', financeController.getAuditLogs);

module.exports = router;