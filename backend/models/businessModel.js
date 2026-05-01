const db = require('../config/db');

// #Model_Business_Ekhane_FR1_FR2_FR3_FR6_Er_Database_Query_Ase
const Business = {
  // #Customer_List_Ekhane_Sales_Form_Er_Jonno_Customer_Data_Ana_Hoy
  getAllCustomers: async () => {
    const query = `
      SELECT 
        id,
        name,
        phone,
        email
      FROM customers
      ORDER BY id ASC
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  // #Product_List_Ekhane_Product_Table_Er_Sob_Product_Ana_Hoy
  getAllProducts: async () => {
    const query = `
      SELECT 
        id,
        product_name,
        category,
        stock_quantity,
        min_threshold,
        supplier_id,
        selling_price,
        variable_cost
      FROM products
      ORDER BY id ASC
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  // #Sales_List_Ekhane_Record_Kora_Sales_Transaction_Gula_Ana_Hoy
  getAllSales: async () => {
    const query = `
      SELECT 
        s.id,
        s.customer_id,
        c.name AS customer_name,
        s.product_id,
        p.product_name,
        s.quantity,
        s.amount,
        s.cost,
        s.sale_date
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      LEFT JOIN products p ON s.product_id = p.id
      ORDER BY s.sale_date DESC, s.id DESC
      LIMIT 30
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  // #FR1_Record_Sales_Ekhane_User_New_Sales_Transaction_Add_Korte_Parbe
  createSale: async (saleData) => {
    const { customerId, productId, quantity, saleDate } = saleData;

    // #Product_Info_Ekhane_Selected_Product_Er_Price_Cost_Stock_Ana_Hoy
    const productQuery = `
      SELECT 
        id,
        product_name,
        stock_quantity,
        selling_price,
        variable_cost
      FROM products
      WHERE id = ?
    `;

    const [productRows] = await db.execute(productQuery, [productId]);

    if (productRows.length === 0) {
      throw new Error('Product not found');
    }

    const product = productRows[0];
    const saleQuantity = Number(quantity);

    if (Number(product.stock_quantity) < saleQuantity) {
      throw new Error('Not enough stock available');
    }

    // #Sales_Calculation_Ekhane_Quantity_Diye_Amount_Ar_Cost_Calculate_Hoy
    const amount = Number(product.selling_price) * saleQuantity;
    const cost = Number(product.variable_cost) * saleQuantity;

    // #Sales_Insert_Ekhane_Sales_Table_E_New_Record_Save_Hoy
    const insertSaleQuery = `
      INSERT INTO sales 
      (customer_id, product_id, quantity, amount, cost, sale_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [saleResult] = await db.execute(insertSaleQuery, [
      customerId,
      productId,
      saleQuantity,
      amount,
      cost,
      saleDate
    ]);

    // #Stock_Update_Ekhane_Sale_Howar_Por_Product_Stock_Komano_Hoy
    const updateStockQuery = `
      UPDATE products
      SET stock_quantity = stock_quantity - ?
      WHERE id = ?
    `;

    await db.execute(updateStockQuery, [saleQuantity, productId]);

    // #Audit_Log_Ekhane_Sales_Insert_Er_Record_Rakha_Hoy
    const auditQuery = `
      INSERT INTO audit_logs 
      (action_type, table_name, description)
      VALUES (?, ?, ?)
    `;

    await db.execute(auditQuery, [
      'INSERT',
      'sales',
      `New sale recorded for product ID ${productId}, quantity ${saleQuantity}`
    ]);

    return {
      id: saleResult.insertId,
      customerId,
      productId,
      quantity: saleQuantity,
      amount,
      cost,
      saleDate
    };
  },

  // #Expense_List_Ekhane_Record_Kora_Operational_Expense_Gula_Ana_Hoy
  getAllExpenses: async () => {
    const query = `
      SELECT 
        id,
        category,
        amount,
        expense_date,
        description
      FROM expenses
      ORDER BY expense_date DESC, id DESC
      LIMIT 30
    `;

    const [rows] = await db.execute(query);
    return rows;
  },

  // #FR6_Record_Expense_Ekhane_User_New_Operational_Expense_Add_Korte_Parbe
  createExpense: async (expenseData) => {
    const { category, amount, expenseDate, description } = expenseData;

    // #Expense_Insert_Ekhane_Expense_Table_E_New_Record_Save_Hoy
    const query = `
      INSERT INTO expenses
      (category, amount, expense_date, description)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      category,
      amount,
      expenseDate,
      description
    ]);

    // #Audit_Log_Ekhane_Expense_Insert_Er_Record_Rakha_Hoy
    const auditQuery = `
      INSERT INTO audit_logs 
      (action_type, table_name, description)
      VALUES (?, ?, ?)
    `;

    await db.execute(auditQuery, [
      'INSERT',
      'expenses',
      `New expense added under category ${category}`
    ]);

    return {
      id: result.insertId,
      category,
      amount,
      expenseDate,
      description
    };
  },

  // #FR2_FR3_Add_Product_Ekhane_User_Category_Shoho_New_Product_Add_Korte_Parbe
  createProduct: async (productData) => {
    const {
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    } = productData;

    // #Product_Insert_Ekhane_Product_Table_E_New_Product_Save_Hoy
    const query = `
      INSERT INTO products
      (product_name, category, stock_quantity, min_threshold, supplier_id, selling_price, variable_cost)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId || null,
      sellingPrice,
      variableCost
    ]);

    // #Audit_Log_Ekhane_Product_Insert_Er_Record_Rakha_Hoy
    const auditQuery = `
      INSERT INTO audit_logs 
      (action_type, table_name, description)
      VALUES (?, ?, ?)
    `;

    await db.execute(auditQuery, [
      'INSERT',
      'products',
      `New product added: ${productName}`
    ]);

    return {
      id: result.insertId,
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    };
  },

  // #FR2_FR3_Update_Product_Ekhane_User_Product_Info_Edit_Korte_Parbe
  updateProduct: async (productId, productData) => {
    const {
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    } = productData;

    // #Product_Update_Ekhane_Product_Table_E_Existing_Product_Update_Hoy
    const query = `
      UPDATE products
      SET 
        product_name = ?,
        category = ?,
        stock_quantity = ?,
        min_threshold = ?,
        supplier_id = ?,
        selling_price = ?,
        variable_cost = ?
      WHERE id = ?
    `;

    await db.execute(query, [
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId || null,
      sellingPrice,
      variableCost,
      productId
    ]);

    // #Audit_Log_Ekhane_Product_Update_Er_Record_Rakha_Hoy
    const auditQuery = `
      INSERT INTO audit_logs 
      (action_type, table_name, description)
      VALUES (?, ?, ?)
    `;

    await db.execute(auditQuery, [
      'UPDATE',
      'products',
      `Product updated: ${productName}`
    ]);

    return {
      id: productId,
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    };
  },

  // #FR2_Delete_Product_Ekhane_User_Product_Delete_Korte_Parbe
  deleteProduct: async (productId) => {
    // #Product_Delete_Ekhane_Product_Table_Theke_Product_Delete_Hoy
    const query = `
      DELETE FROM products
      WHERE id = ?
    `;

    await db.execute(query, [productId]);

    // #Audit_Log_Ekhane_Product_Delete_Er_Record_Rakha_Hoy
    const auditQuery = `
      INSERT INTO audit_logs 
      (action_type, table_name, description)
      VALUES (?, ?, ?)
    `;

    await db.execute(auditQuery, [
      'DELETE',
      'products',
      `Product deleted with ID ${productId}`
    ]);

    return {
      id: productId,
      message: 'Product deleted successfully'
    };
  }
};

module.exports = Business;