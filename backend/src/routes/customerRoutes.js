const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/:id/history", customerController.getCustomerHistory);

module.exports = router;