const Business = require('../models/businessModel');

// #Controller_Business_Ekhane_Request_Response_Handle_Kora_Hoy

// #Customer_List_Controller_Ekhane_Sales_Form_Er_Jonno_Customer_List_Pathay
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Business.getAllCustomers();
    res.status(200).json(customers);
  } catch (err) {
    console.error('Customer list error:', err);
    res.status(500).json({ error: 'Failed to load customers' });
  }
};

// #Product_List_Controller_Ekhane_Product_List_Frontend_E_Pathay
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Business.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error('Product list error:', err);
    res.status(500).json({ error: 'Failed to load products' });
  }
};

// #Sales_List_Controller_Ekhane_Record_Kora_Sales_List_Pathay
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Business.getAllSales();
    res.status(200).json(sales);
  } catch (err) {
    console.error('Sales list error:', err);
    res.status(500).json({ error: 'Failed to load sales transactions' });
  }
};

// #FR1_Create_Sale_Controller_Ekhane_New_Sales_Transaction_Record_Kora_Hoy
exports.createSale = async (req, res) => {
  try {
    const { customerId, productId, quantity, saleDate } = req.body;

    // #Validation_Sale_Ekhane_Required_Field_Check_Kora_Hoy
    if (!customerId || !productId || !quantity || !saleDate) {
      return res.status(400).json({
        error: 'Customer, product, quantity, and sale date are required'
      });
    }

    // #Validation_Quantity_Ekhane_Quantity_Positive_Kina_Check_Kora_Hoy
    if (Number(quantity) <= 0) {
      return res.status(400).json({
        error: 'Quantity must be greater than 0'
      });
    }

    const sale = await Business.createSale({
      customerId,
      productId,
      quantity,
      saleDate
    });

    res.status(201).json({
      message: 'Sales transaction recorded successfully',
      sale
    });
  } catch (err) {
    console.error('Create sale error:', err);

    if (err.message === 'Product not found' || err.message === 'Not enough stock available') {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: 'Failed to record sales transaction' });
  }
};

// #Expense_List_Controller_Ekhane_Record_Kora_Expense_List_Pathay
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Business.getAllExpenses();
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Expense list error:', err);
    res.status(500).json({ error: 'Failed to load expenses' });
  }
};

// #FR6_Create_Expense_Controller_Ekhane_New_Operational_Expense_Record_Kora_Hoy
exports.createExpense = async (req, res) => {
  try {
    const { category, amount, expenseDate, description } = req.body;

    // #Validation_Expense_Ekhane_Required_Field_Check_Kora_Hoy
    if (!category || !amount || !expenseDate) {
      return res.status(400).json({
        error: 'Category, amount, and expense date are required'
      });
    }

    // #Validation_Amount_Ekhane_Expense_Amount_Positive_Kina_Check_Kora_Hoy
    if (Number(amount) <= 0) {
      return res.status(400).json({
        error: 'Expense amount must be greater than 0'
      });
    }

    const expense = await Business.createExpense({
      category,
      amount,
      expenseDate,
      description: description || ''
    });

    res.status(201).json({
      message: 'Operational expense recorded successfully',
      expense
    });
  } catch (err) {
    console.error('Create expense error:', err);
    res.status(500).json({ error: 'Failed to record operational expense' });
  }
};

// #FR2_FR3_Create_Product_Controller_Ekhane_Category_Shoho_New_Product_Add_Kora_Hoy
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    } = req.body;

    // #Validation_Product_Ekhane_Required_Field_Check_Kora_Hoy
    if (
      !productName ||
      !category ||
      stockQuantity === undefined ||
      minThreshold === undefined ||
      sellingPrice === undefined ||
      variableCost === undefined
    ) {
      return res.status(400).json({
        error: 'Product name, category, stock, threshold, selling price, and variable cost are required'
      });
    }

    // #Validation_Product_Number_Ekhane_Negative_Value_Check_Kora_Hoy
    if (
      Number(stockQuantity) < 0 ||
      Number(minThreshold) < 0 ||
      Number(sellingPrice) < 0 ||
      Number(variableCost) < 0
    ) {
      return res.status(400).json({
        error: 'Stock, threshold, selling price, and variable cost cannot be negative'
      });
    }

    const product = await Business.createProduct({
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    });

    res.status(201).json({
      message: 'Product added successfully',
      product
    });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// #FR2_FR3_Update_Product_Controller_Ekhane_Existing_Product_Edit_Kora_Hoy
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    } = req.body;

    // #Validation_Update_Product_Ekhane_Required_Field_Check_Kora_Hoy
    if (
      !productName ||
      !category ||
      stockQuantity === undefined ||
      minThreshold === undefined ||
      sellingPrice === undefined ||
      variableCost === undefined
    ) {
      return res.status(400).json({
        error: 'Product name, category, stock, threshold, selling price, and variable cost are required'
      });
    }

    const product = await Business.updateProduct(productId, {
      productName,
      category,
      stockQuantity,
      minThreshold,
      supplierId,
      sellingPrice,
      variableCost
    });

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// #FR2_Delete_Product_Controller_Ekhane_Product_Delete_Kora_Hoy
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await Business.deleteProduct(productId);

    res.status(200).json(result);
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};