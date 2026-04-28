const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/highest-categories', expenseController.getHighestExpenseCategories);

module.exports = router;