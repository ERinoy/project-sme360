// backend/routes/expenseRoutes.js

const express            = require('express');
const router             = express.Router();
const expenseController  = require('../controllers/expenseController');
const { verifyToken }    = require('../middleware/authMiddleware');

// All expense routes are protected
router.use(verifyToken);

// ── Specific routes BEFORE parameterized routes ──
router.get('/categories',     expenseController.getAllCategories);
router.get('/monthly-total',  expenseController.getMonthlyTotal);
router.get('/top-categories', expenseController.getTopExpenseCategories);

// ── General routes ──
router.post('/',   expenseController.createExpense);
router.get('/',    expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);

module.exports = router;