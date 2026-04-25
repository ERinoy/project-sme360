const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

router.get("/highest-expense-category", analyticsController.getHighestExpenseCategory);

module.exports = router;