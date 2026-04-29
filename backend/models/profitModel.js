// backend/models/profitModel.js

const db = require('../config/db');

// ─────────────────────────────────────────
// GET low margin products
// Products whose margin is below the given threshold
// Default threshold: 10%
// ─────────────────────────────────────────
const getLowMarginProducts = async (threshold = 10) => {
  const [rows] = await db.execute(
    `SELECT
      product_id,
      product_name,
      category,
      cost_price,
      selling_price,
      ROUND(
        ((selling_price - cost_price) / selling_price) * 100
      , 2) AS profit_margin_pct
     FROM products
     WHERE ((selling_price - cost_price) / selling_price) * 100 < ?
     ORDER BY profit_margin_pct ASC`,
    [threshold]
  );
  return rows;
};

module.exports = { getLowMarginProducts };