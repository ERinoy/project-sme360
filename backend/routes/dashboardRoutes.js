// backend/routes/dashboardRoutes.js

const express              = require('express');
const router               = express.Router();
const dashboardController  = require('../controllers/dashboardController');
const { verifyToken }      = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/kpis', dashboardController.getDashboardKPIs);

module.exports = router;