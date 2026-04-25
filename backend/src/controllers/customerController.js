const db = require("../config/db");

exports.getCustomerHistory = (req, res) => {
  const customerId = req.params.id;

  const sql = `
    SELECT 
      s.id AS sale_id,
      s.created_at,
      p.name AS product_name,
      si.quantity,
      si.price,
      s.total_amount
    FROM sales s
    JOIN sale_items si ON s.id = si.sale_id
    JOIN products p ON si.product_id = p.id
    WHERE s.customer_id = ?
    ORDER BY s.created_at DESC
  `;

  db.query(sql, [customerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results);
  });
};