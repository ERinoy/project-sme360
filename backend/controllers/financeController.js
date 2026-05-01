const Finance = require('../models/financeModel');

exports.getRevenueSummary = async (req, res) => {
  try {
    const data = await Finance.getRevenueSummary();
    res.status(200).json(data);
  } catch (err) {
    console.error('Revenue summary error:', err);
    res.status(500).json({ error: 'Failed to calculate revenue summary' });
  }
};

exports.getTopExpenseCategories = async (req, res) => {
  try {
    const data = await Finance.getTopExpenseCategories();
    res.status(200).json(data);
  } catch (err) {
    console.error('Top expense category error:', err);
    res.status(500).json({ error: 'Failed to identify highest expense categories' });
  }
};

exports.getBreakEvenAnalysis = async (req, res) => {
  try {
    const data = await Finance.getBreakEvenAnalysis();
    res.status(200).json(data);
  } catch (err) {
    console.error('Break-even analysis error:', err);
    res.status(500).json({ error: 'Failed to perform break-even analysis' });
  }
};

exports.calculateBreakEvenFromInput = async (req, res) => {
  try {
    const { fixedCost, sellingPricePerUnit, variableCostPerUnit } = req.body;

    if (
      fixedCost === undefined ||
      sellingPricePerUnit === undefined ||
      variableCostPerUnit === undefined
    ) {
      return res.status(400).json({
        error: 'Fixed cost, selling price per unit, and variable cost per unit are required'
      });
    }

    if (
      Number(fixedCost) <= 0 ||
      Number(sellingPricePerUnit) <= 0 ||
      Number(variableCostPerUnit) < 0
    ) {
      return res.status(400).json({
        error: 'Fixed cost and selling price must be greater than 0. Variable cost cannot be negative.'
      });
    }

    if (Number(sellingPricePerUnit) <= Number(variableCostPerUnit)) {
      return res.status(400).json({
        error: 'Selling price must be greater than variable cost per unit'
      });
    }

    const data = await Finance.calculateBreakEvenFromInput(
      fixedCost,
      sellingPricePerUnit,
      variableCostPerUnit
    );

    res.status(200).json(data);
  } catch (err) {
    console.error('Manual break-even calculation error:', err);
    res.status(500).json({ error: 'Failed to calculate break-even from user input' });
  }
};

exports.getMonthlyPerformanceSummary = async (req, res) => {
  try {
    const data = await Finance.getMonthlyPerformanceSummary();
    res.status(200).json(data);
  } catch (err) {
    console.error('Monthly summary error:', err);
    res.status(500).json({ error: 'Failed to generate monthly performance summary' });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const data = await Finance.getAuditLogs();
    res.status(200).json(data);
  } catch (err) {
    console.error('Audit logs error:', err);
    res.status(500).json({ error: 'Failed to fetch financial audit logs' });
  }
};