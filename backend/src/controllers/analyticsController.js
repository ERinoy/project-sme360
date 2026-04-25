const db = require("../config/db");

exports.getHighestExpenseCategory = (req, res) => {
  const sql = `
    SELECT 
      ec.name AS category,
      SUM(e.amount) AS total_expense
    FROM expenses e
    JOIN expense_categories ec ON e.category_id = ec.id
    GROUP BY ec.name
    ORDER BY total_expense DESC
    LIMIT 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results[0] || {});
  });
};