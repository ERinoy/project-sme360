const express = require('express');
const router = express.Router();
const breakEvenController = require('../controllers/breakEvenController');

router.post('/', breakEvenController.calculateBreakEven);

module.exports = router;