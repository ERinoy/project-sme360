const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');

// #Route_Customer_List_Ekhane_Sales_Form_E_Customer_Dropdown_Er_Data_Jabe
router.get('/customers', businessController.getAllCustomers);

// #Route_Product_List_Ekhane_Product_Management_Ar_Sales_Form_E_Product_Data_Jabe
router.get('/products', businessController.getAllProducts);

// #Route_Sales_List_Ekhane_Record_Kora_Sales_Transaction_Dekha_Jabe
router.get('/sales', businessController.getAllSales);

// #Route_FR1_Create_Sale_Ekhane_New_Sales_Transaction_Record_Hobe
router.post('/sales', businessController.createSale);

// #Route_Expense_List_Ekhane_Record_Kora_Operational_Expense_Dekha_Jabe
router.get('/expenses', businessController.getAllExpenses);

// #Route_FR6_Create_Expense_Ekhane_New_Operational_Expense_Record_Hobe
router.post('/expenses', businessController.createExpense);

// #Route_FR2_FR3_Create_Product_Ekhane_Category_Shoho_New_Product_Add_Hobe
router.post('/products', businessController.createProduct);

// #Route_FR2_FR3_Update_Product_Ekhane_Existing_Product_Edit_Hobe
router.put('/products/:id', businessController.updateProduct);

// #Route_FR2_Delete_Product_Ekhane_Product_Delete_Hobe
router.delete('/products/:id', businessController.deleteProduct);

module.exports = router;