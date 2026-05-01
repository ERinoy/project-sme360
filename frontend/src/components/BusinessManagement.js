import React, { useEffect, useState } from 'react';

// #Style_Card_Ekhane_Common_Box_Design_Ase
const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  border: '1px solid #e5e7eb'
};

// #Style_Title_Ekhane_Section_Title_Design_Ase
const titleStyle = {
  color: '#1f2937',
  marginTop: 0
};

// #Style_Input_Ekhane_Form_Input_Design_Ase
const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  width: '100%',
  marginTop: '5px'
};

// #Style_Button_Ekhane_Main_Button_Design_Ase
const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '12px'
};

// #Style_Delete_Button_Ekhane_Delete_Button_Design_Ase
const deleteButtonStyle = {
  padding: '7px 12px',
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

// #Style_Edit_Button_Ekhane_Edit_Button_Design_Ase
const editButtonStyle = {
  padding: '7px 12px',
  backgroundColor: '#16a34a',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginRight: '8px'
};

// #Style_Table_Ekhane_Table_Layout_Ase
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '12px'
};

// #Style_Table_Cell_Ekhane_Cell_Design_Ase
const cellStyle = {
  border: '1px solid #e5e7eb',
  padding: '10px',
  textAlign: 'left'
};

// #Style_Form_Grid_Ekhane_Input_Gula_Grid_E_Sajano_Hoy
const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '15px'
};

const BusinessManagement = () => {
  // #State_Master_Data_Ekhane_Customers_Products_Sales_Expenses_Store_Hoy
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // #State_Message_Ekhane_Success_Or_Error_Message_Dekhay
  const [message, setMessage] = useState('');

  // #State_Sales_Form_Ekhane_FR1_Sales_Input_Store_Hoy
  const [salesForm, setSalesForm] = useState({
    customerId: '',
    productId: '',
    quantity: '',
    saleDate: ''
  });

  // #State_Expense_Form_Ekhane_FR6_Expense_Input_Store_Hoy
  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    expenseDate: '',
    description: ''
  });

  // #State_Product_Form_Ekhane_FR2_FR3_Product_Input_Store_Hoy
  const [productForm, setProductForm] = useState({
    productName: '',
    category: '',
    stockQuantity: '',
    minThreshold: '',
    supplierId: '',
    sellingPrice: '',
    variableCost: ''
  });

  // #State_Edit_Product_Ekhane_Kon_Product_Edit_Hocche_Ta_Track_Kora_Hoy
  const [editingProductId, setEditingProductId] = useState(null);

  // #Helper_Taka_Format_Ekhane_Number_Ke_BDT_Format_Kora_Hoy
  const formatMoney = (value) => {
    return `BDT ${Number(value || 0).toFixed(2)}`;
  };

  // #Helper_Date_Format_Ekhane_Date_Clean_Kore_Show_Kora_Hoy
  const formatDate = (value) => {
    if (!value) {
      return 'N/A';
    }

    return String(value).slice(0, 10);
  };

  // #API_Load_All_Data_Ekhane_Page_Load_Hole_Required_Data_Ana_Hoy
  const loadBusinessData = () => {
    Promise.all([
      fetch('/api/business/customers').then(res => res.json()),
      fetch('/api/business/products').then(res => res.json()),
      fetch('/api/business/sales').then(res => res.json()),
      fetch('/api/business/expenses').then(res => res.json())
    ])
      .then(([customerData, productData, salesData, expenseData]) => {
        // #API_Set_Customers_Ekhane_Customer_Dropdown_Er_Data_Save_Hoy
        setCustomers(Array.isArray(customerData) ? customerData : []);

        // #API_Set_Products_Ekhane_Product_List_Ar_Dropdown_Data_Save_Hoy
        setProducts(Array.isArray(productData) ? productData : []);

        // #API_Set_Sales_Ekhane_Record_Kora_Sales_Save_Hoy
        setSales(Array.isArray(salesData) ? salesData : []);

        // #API_Set_Expenses_Ekhane_Record_Kora_Expenses_Save_Hoy
        setExpenses(Array.isArray(expenseData) ? expenseData : []);
      })
      .catch(err => {
        // #API_Error_Ekhane_Data_Load_Error_Handle_Kora_Hoy
        console.error('Business data load error:', err);
        setMessage('Could not load business management data.');
      });
  };

  // #Effect_Load_Data_Ekhane_Component_Open_Hole_Data_Load_Hoy
  useEffect(() => {
    loadBusinessData();
  }, []);

  // #Input_Sales_Change_Ekhane_Sales_Form_Input_Update_Hoy
  const handleSalesChange = (event) => {
    const { name, value } = event.target;

    setSalesForm({
      ...salesForm,
      [name]: value
    });
  };

  // #Input_Expense_Change_Ekhane_Expense_Form_Input_Update_Hoy
  const handleExpenseChange = (event) => {
    const { name, value } = event.target;

    setExpenseForm({
      ...expenseForm,
      [name]: value
    });
  };

  // #Input_Product_Change_Ekhane_Product_Form_Input_Update_Hoy
  const handleProductChange = (event) => {
    const { name, value } = event.target;

    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  // #FR1_Submit_Sales_Ekhane_New_Sales_Transaction_Backend_E_Pathano_Hoy
  const handleSalesSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    fetch('/api/business/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: Number(salesForm.customerId),
        productId: Number(salesForm.productId),
        quantity: Number(salesForm.quantity),
        saleDate: salesForm.saleDate
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage('Sales transaction recorded successfully.');
          setSalesForm({
            customerId: '',
            productId: '',
            quantity: '',
            saleDate: ''
          });
          loadBusinessData();
        }
      })
      .catch(err => {
        console.error('Sales submit error:', err);
        setMessage('Failed to record sales transaction.');
      });
  };

  // #FR6_Submit_Expense_Ekhane_New_Operational_Expense_Backend_E_Pathano_Hoy
  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    fetch('/api/business/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: expenseForm.category,
        amount: Number(expenseForm.amount),
        expenseDate: expenseForm.expenseDate,
        description: expenseForm.description
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage('Operational expense recorded successfully.');
          setExpenseForm({
            category: '',
            amount: '',
            expenseDate: '',
            description: ''
          });
          loadBusinessData();
        }
      })
      .catch(err => {
        console.error('Expense submit error:', err);
        setMessage('Failed to record operational expense.');
      });
  };

  // #FR2_FR3_Submit_Product_Ekhane_Add_Or_Update_Product_Backend_E_Pathano_Hoy
  const handleProductSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    const productPayload = {
      productName: productForm.productName,
      category: productForm.category,
      stockQuantity: Number(productForm.stockQuantity),
      minThreshold: Number(productForm.minThreshold),
      supplierId: productForm.supplierId ? Number(productForm.supplierId) : null,
      sellingPrice: Number(productForm.sellingPrice),
      variableCost: Number(productForm.variableCost)
    };

    const url = editingProductId
      ? `/api/business/products/${editingProductId}`
      : '/api/business/products';

    const method = editingProductId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productPayload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(editingProductId ? 'Product updated successfully.' : 'Product added successfully.');
          setEditingProductId(null);
          setProductForm({
            productName: '',
            category: '',
            stockQuantity: '',
            minThreshold: '',
            supplierId: '',
            sellingPrice: '',
            variableCost: ''
          });
          loadBusinessData();
        }
      })
      .catch(err => {
        console.error('Product submit error:', err);
        setMessage('Failed to save product.');
      });
  };

  // #FR2_Edit_Product_Ekhane_Table_Theke_Product_Data_Form_E_Load_Hoy
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);

    setProductForm({
      productName: product.product_name || '',
      category: product.category || '',
      stockQuantity: product.stock_quantity || '',
      minThreshold: product.min_threshold || '',
      supplierId: product.supplier_id || '',
      sellingPrice: product.selling_price || '',
      variableCost: product.variable_cost || ''
    });

    setMessage('Editing selected product.');
  };

  // #FR2_Delete_Product_Ekhane_Product_Delete_API_Call_Hoy
  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) {
      return;
    }

    fetch(`/api/business/products/${productId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage('Product deleted successfully.');
          loadBusinessData();
        }
      })
      .catch(err => {
        console.error('Product delete error:', err);
        setMessage('Failed to delete product.');
      });
  };

  // #FR2_Cancel_Edit_Ekhane_Edit_Mode_Off_Kora_Hoy
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setProductForm({
      productName: '',
      category: '',
      stockQuantity: '',
      minThreshold: '',
      supplierId: '',
      sellingPrice: '',
      variableCost: ''
    });
    setMessage('');
  };

  return (
    <div style={{ marginTop: '30px' }}>
      {/* #Main_Title_Ekhane_Business_Management_Module_Title_Dekhay */}
      <h2 style={{ color: '#111827' }}>Business Management</h2>

      {/* #Message_Box_Ekhane_Success_Error_Message_Dekhay */}
      {message && (
        <div
          style={{
            backgroundColor: '#eef2ff',
            color: '#1e3a8a',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '15px',
            border: '1px solid #c7d2fe'
          }}
        >
          {message}
        </div>
      )}

      {/* #FR1_Sales_Record_Section_Ekhane_User_New_Sales_Record_Korte_Parbe */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Record Sales Transaction</h3>

        <form onSubmit={handleSalesSubmit}>
          <div style={formGridStyle}>
            {/* #Sales_Customer_Select_Ekhane_Customer_Choose_Kora_Hoy */}
            <div>
              <label>Customer</label>
              <select
                name="customerId"
                value={salesForm.customerId}
                onChange={handleSalesChange}
                style={inputStyle}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* #Sales_Product_Select_Ekhane_Product_Choose_Kora_Hoy */}
            <div>
              <label>Product</label>
              <select
                name="productId"
                value={salesForm.productId}
                onChange={handleSalesChange}
                style={inputStyle}
                required
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name} - Stock: {product.stock_quantity}
                  </option>
                ))}
              </select>
            </div>

            {/* #Sales_Quantity_Input_Ekhane_Product_Quantity_Dewa_Hoy */}
            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={salesForm.quantity}
                onChange={handleSalesChange}
                placeholder="Example: 2"
                style={inputStyle}
                required
              />
            </div>

            {/* #Sales_Date_Input_Ekhane_Sales_Date_Dewa_Hoy */}
            <div>
              <label>Sale Date</label>
              <input
                type="date"
                name="saleDate"
                value={salesForm.saleDate}
                onChange={handleSalesChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* #Sales_Submit_Button_Ekhane_Sales_Record_Save_Hoy */}
          <button type="submit" style={buttonStyle}>
            Record Sale
          </button>
        </form>

        {/* #Sales_Table_Ekhane_Recent_Sales_Transaction_Dekhay */}
        <h4>Recent Sales Transactions</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Customer</th>
              <th style={cellStyle}>Product</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Cost</th>
              <th style={cellStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td style={cellStyle}>{sale.customer_name || 'N/A'}</td>
                <td style={cellStyle}>{sale.product_name || 'N/A'}</td>
                <td style={cellStyle}>{sale.quantity}</td>
                <td style={cellStyle}>{formatMoney(sale.amount)}</td>
                <td style={cellStyle}>{formatMoney(sale.cost)}</td>
                <td style={cellStyle}>{formatDate(sale.sale_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* #FR6_Expense_Record_Section_Ekhane_User_Operational_Expense_Record_Korte_Parbe */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Record Operational Expense</h3>

        <form onSubmit={handleExpenseSubmit}>
          <div style={formGridStyle}>
            {/* #Expense_Category_Input_Ekhane_Expense_Category_Dewa_Hoy */}
            <div>
              <label>Expense Category</label>
              <input
                type="text"
                name="category"
                value={expenseForm.category}
                onChange={handleExpenseChange}
                placeholder="Example: Rent"
                style={inputStyle}
                required
              />
            </div>

            {/* #Expense_Amount_Input_Ekhane_Expense_Amount_Dewa_Hoy */}
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
                placeholder="Example: 5000"
                style={inputStyle}
                required
              />
            </div>

            {/* #Expense_Date_Input_Ekhane_Expense_Date_Dewa_Hoy */}
            <div>
              <label>Expense Date</label>
              <input
                type="date"
                name="expenseDate"
                value={expenseForm.expenseDate}
                onChange={handleExpenseChange}
                style={inputStyle}
                required
              />
            </div>

            {/* #Expense_Description_Input_Ekhane_Expense_Description_Dewa_Hoy */}
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={expenseForm.description}
                onChange={handleExpenseChange}
                placeholder="Example: Shop rent"
                style={inputStyle}
              />
            </div>
          </div>

          {/* #Expense_Submit_Button_Ekhane_Expense_Record_Save_Hoy */}
          <button type="submit" style={buttonStyle}>
            Record Expense
          </button>
        </form>

        {/* #Expense_Table_Ekhane_Recent_Operational_Expenses_Dekhay */}
        <h4>Recent Operational Expenses</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Category</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Description</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td style={cellStyle}>{expense.category}</td>
                <td style={cellStyle}>{formatMoney(expense.amount)}</td>
                <td style={cellStyle}>{formatDate(expense.expense_date)}</td>
                <td style={cellStyle}>{expense.description || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* #FR2_FR3_Product_Management_Section_Ekhane_Product_Add_Edit_Delete_Category_Kora_Hoy */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Product Management</h3>

        <form onSubmit={handleProductSubmit}>
          <div style={formGridStyle}>
            {/* #Product_Name_Input_Ekhane_Product_Name_Dewa_Hoy */}
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={productForm.productName}
                onChange={handleProductChange}
                placeholder="Example: Notebook"
                style={inputStyle}
                required
              />
            </div>

            {/* #Product_Category_Input_Ekhane_Product_Category_Dewa_Hoy */}
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={productForm.category}
                onChange={handleProductChange}
                placeholder="Example: Stationery"
                style={inputStyle}
                required
              />
            </div>

            {/* #Product_Stock_Input_Ekhane_Stock_Quantity_Dewa_Hoy */}
            <div>
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={productForm.stockQuantity}
                onChange={handleProductChange}
                placeholder="Example: 50"
                style={inputStyle}
                required
              />
            </div>

            {/* #Product_Threshold_Input_Ekhane_Minimum_Stock_Threshold_Dewa_Hoy */}
            <div>
              <label>Minimum Threshold</label>
              <input
                type="number"
                name="minThreshold"
                value={productForm.minThreshold}
                onChange={handleProductChange}
                placeholder="Example: 10"
                style={inputStyle}
                required
              />
            </div>

            {/* #Product_Supplier_Input_Ekhane_Supplier_ID_Dewa_Hoy */}
            <div>
              <label>Supplier ID</label>
              <input
                type="number"
                name="supplierId"
                value={productForm.supplierId}
                onChange={handleProductChange}
                placeholder="Example: 1"
                style={inputStyle}
              />
            </div>

            {/* #Product_SellingPrice_Input_Ekhane_Selling_Price_Dewa_Hoy */}
            <div>
              <label>Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={productForm.sellingPrice}
                onChange={handleProductChange}
                placeholder="Example: 100"
                style={inputStyle}
                required
              />
            </div>

            {/* #Product_VariableCost_Input_Ekhane_Variable_Cost_Dewa_Hoy */}
            <div>
              <label>Variable Cost</label>
              <input
                type="number"
                name="variableCost"
                value={productForm.variableCost}
                onChange={handleProductChange}
                placeholder="Example: 60"
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* #Product_Submit_Button_Ekhane_Product_Add_Ba_Update_Hoy */}
          <button type="submit" style={buttonStyle}>
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>

          {/* #Product_Cancel_Edit_Button_Ekhane_Edit_Mode_Cancel_Kora_Hoy */}
          {editingProductId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                ...buttonStyle,
                backgroundColor: '#64748b',
                marginLeft: '10px'
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* #Product_Table_Ekhane_Product_List_Category_Shoho_Dekhay */}
        <h4>Product List</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Category</th>
              <th style={cellStyle}>Stock</th>
              <th style={cellStyle}>Threshold</th>
              <th style={cellStyle}>Selling Price</th>
              <th style={cellStyle}>Variable Cost</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={cellStyle}>{product.product_name}</td>
                <td style={cellStyle}>{product.category}</td>
                <td style={cellStyle}>{product.stock_quantity}</td>
                <td style={cellStyle}>{product.min_threshold}</td>
                <td style={cellStyle}>{formatMoney(product.selling_price)}</td>
                <td style={cellStyle}>{formatMoney(product.variable_cost)}</td>
                <td style={cellStyle}>
                  {/* #Product_Edit_Button_Ekhane_Product_Edit_Mode_E_Jay */}
                  <button
                    type="button"
                    onClick={() => handleEditProduct(product)}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>

                  {/* #Product_Delete_Button_Ekhane_Product_Delete_Kora_Hoy */}
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessManagement;