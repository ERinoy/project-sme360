const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

router.get('/monthly-summary', performanceController.getMonthlySummary);

module.exports = router;