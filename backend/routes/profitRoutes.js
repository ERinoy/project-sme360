// backend/routes/profitRoutes.js

const express          = require('express');
const router           = express.Router();
const profitController = require('../controllers/profitController');
const { verifyToken }  = require('../middleware/authMiddleware');

// All profit routes are protected
router.use(verifyToken);

router.get('/gross',        profitController.getGrossProfit);
router.get('/net',          profitController.getNetProfit);
router.get('/margins',      profitController.getProductMargins);
router.get('/low-margin',   profitController.getLowMarginProducts);
router.get('/trend',        profitController.getSalesTrend);
router.get('/trend/history',profitController.getTrendHistory);

module.exports = router;