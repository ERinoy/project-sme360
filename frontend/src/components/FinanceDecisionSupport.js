import React, { useEffect, useState } from 'react';

// #Style_Setup_Ekhane_Common_Card_Design_Ase
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
  marginBottom: '12px',
  color: '#1f2937'
};

// #Style_Table_Ekhane_Table_Layout_Ase
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px'
};

// #Style_Table_Cell_Ekhane_Table_Cell_Design_Ase
const thTdStyle = {
  border: '1px solid #e5e7eb',
  padding: '10px',
  textAlign: 'left'
};

// #Style_Input_Ekhane_Form_Input_Design_Ase
const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  width: '100%',
  marginTop: '5px'
};

// #Style_Button_Ekhane_Calculate_Button_Design_Ase
const buttonStyle = {
  padding: '10px 18px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '15px'
};

// #Style_Graph_Box_Ekhane_Graph_Container_Design_Ase
const graphBoxStyle = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px',
  marginTop: '20px',
  overflowX: 'auto'
};

// #Style_Graph_Row_Ekhane_Graph_Bar_Gula_Sajano_Hoy
const graphRowStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '20px',
  minHeight: '260px',
  paddingTop: '20px'
};

// #Style_Legend_Ekhane_Graph_Color_Meaning_Dekhay
const legendStyle = {
  display: 'flex',
  gap: '18px',
  flexWrap: 'wrap',
  marginBottom: '15px',
  fontSize: '14px',
  color: '#374151'
};

// #Style_Legend_Item_Ekhane_Ekta_Legend_Item_Design_Ase
const legendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

// #Style_Month_Group_Ekhane_Proti_Month_Er_Bar_Group_Ase
const monthGroupStyle = {
  minWidth: '150px',
  textAlign: 'center'
};

// #Style_Bar_Group_Ekhane_Revenue_Expense_Profit_Bar_Ase
const barGroupStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '8px',
  height: '190px',
  borderBottom: '2px solid #cbd5e1'
};

// #Style_Bar_Label_Ekhane_Bar_Er_Niche_Label_Ase
const barLabelStyle = {
  fontSize: '12px',
  marginTop: '8px',
  color: '#475569',
  fontWeight: 'bold'
};

// #Style_Graph_Value_Ekhane_Bar_Er_Uporer_Value_Ase
const graphValueStyle = {
  fontSize: '10px',
  color: 'white',
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  padding: '4px 0'
};

const FinanceDecisionSupport = () => {
  // #State_API_Data_Ekhane_Backend_Theke_Asha_Data_Store_Hoy
  const [revenue, setRevenue] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [breakEven, setBreakEven] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // #State_BreakEven_Form_Ekhane_User_Input_Store_Hoy
  const [manualBreakEvenForm, setManualBreakEvenForm] = useState({
    fixedCost: '',
    sellingPricePerUnit: '',
    variableCostPerUnit: ''
  });

  // #State_BreakEven_Result_Ekhane_Calculation_Result_Store_Hoy
  const [manualBreakEvenResult, setManualBreakEvenResult] = useState(null);
  const [manualBreakEvenError, setManualBreakEvenError] = useState('');

  // #Helper_Taka_Format_Ekhane_Number_Ke_BDT_Format_Kora_Hoy
  const formatMoney = (value) => {
    const numberValue = Number(value || 0);
    return `BDT ${numberValue.toFixed(2)}`;
  };

  // #Helper_Date_Format_Ekhane_Database_Date_Clean_Kora_Hoy
  const formatDate = (value) => {
    if (!value) {
      return 'N/A';
    }

    return String(value).slice(0, 10);
  };

  // #Helper_Short_Money_Format_Ekhane_Graph_Er_Jonno_Choto_Value_Dekhay
  const formatShortMoney = (value) => {
    const numberValue = Number(value || 0);

    if (Math.abs(numberValue) >= 1000) {
      return `${(numberValue / 1000).toFixed(1)}k`;
    }

    return numberValue.toFixed(0);
  };

  // #Helper_Graph_Max_Ekhane_Graph_Er_Sobcheye_Boro_Value_Ber_Kora_Hoy
  const getGraphMaxValue = () => {
    if (!monthlySummary || monthlySummary.length === 0) {
      return 1;
    }

    const allValues = [];

    monthlySummary.forEach((row) => {
      allValues.push(Math.abs(Number(row.total_revenue || 0)));
      allValues.push(Math.abs(Number(row.total_expense || 0)));
      allValues.push(Math.abs(Number(row.net_profit || 0)));
    });

    return Math.max(...allValues, 1);
  };

  // #Helper_Graph_Bar_Height_Ekhane_Value_Theke_Bar_Height_Calculate_Hoy
  const getBarHeight = (value) => {
    const maxValue = getGraphMaxValue();
    const numberValue = Math.abs(Number(value || 0));
    const height = (numberValue / maxValue) * 160;

    return Math.max(height, 18);
  };

  // #Helper_Graph_Bar_Color_Ekhane_Revenue_Expense_Profit_Er_Color_Set_Hoy
  const getBarColor = (type, value) => {
    if (type === 'revenue') {
      return '#2563eb';
    }

    if (type === 'expense') {
      return '#f97316';
    }

    if (Number(value) < 0) {
      return '#dc2626';
    }

    return '#16a34a';
  };

  // #API_Load_Data_Ekhane_Component_Open_Hole_All_Finance_API_Call_Hoy
  useEffect(() => {
    Promise.all([
      fetch('/api/finance/revenue-summary').then(res => res.json()),
      fetch('/api/finance/top-expense-categories').then(res => res.json()),
      fetch('/api/finance/break-even').then(res => res.json()),
      fetch('/api/finance/monthly-summary').then(res => res.json()),
      fetch('/api/finance/audit-logs').then(res => res.json())
    ])
      .then(([revenueData, expenseData, breakEvenData, monthlyData, auditData]) => {
        // #API_Set_Revenue_Ekhane_Daily_Ar_Monthly_Revenue_Save_Hoy
        setRevenue(revenueData);

        // #API_Set_Expense_Ekhane_Highest_Expense_Category_Save_Hoy
        setExpenses(Array.isArray(expenseData) ? expenseData : []);

        // #API_Set_BreakEven_Ekhane_Database_Based_BreakEven_Save_Hoy
        setBreakEven(breakEvenData);

        // #API_Set_Monthly_Summary_Ekhane_Month_Wise_Performance_Save_Hoy
        setMonthlySummary(Array.isArray(monthlyData) ? monthlyData : []);

        // #API_Set_Audit_Log_Ekhane_Audit_Log_Data_Save_Hoy
        setAuditLogs(Array.isArray(auditData) ? auditData : []);

        // #API_Loading_False_Ekhane_Loading_Sesh_Hoy
        setLoading(false);
      })
      .catch(err => {
        // #API_Error_Handle_Ekhane_API_Error_Console_E_Dekhay
        console.error('Finance dashboard error:', err);
        setLoading(false);
      });
  }, []);

  // #Form_Input_Change_Ekhane_User_Type_Korle_State_Update_Hoy
  const handleManualBreakEvenChange = (event) => {
    const { name, value } = event.target;

    setManualBreakEvenForm({
      ...manualBreakEvenForm,
      [name]: value
    });
  };

  // #Form_Submit_Ekhane_User_Input_Backend_E_Pathano_Hoy
  const handleManualBreakEvenSubmit = (event) => {
    event.preventDefault();

    // #Form_Reset_Result_Ekhane_Purono_Result_Clear_Hoy
    setManualBreakEvenError('');
    setManualBreakEvenResult(null);

    fetch('/api/finance/break-even/manual', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fixedCost: Number(manualBreakEvenForm.fixedCost),
        sellingPricePerUnit: Number(manualBreakEvenForm.sellingPricePerUnit),
        variableCostPerUnit: Number(manualBreakEvenForm.variableCostPerUnit)
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // #Form_Error_Ekhane_Backend_Validation_Error_Dekhay
          setManualBreakEvenError(data.error);
          setManualBreakEvenResult(null);
        } else {
          // #Form_Result_Ekhane_Backend_Theke_Calculated_Result_Ase
          setManualBreakEvenResult(data);
          setManualBreakEvenError('');
        }
      })
      .catch(err => {
        // #Form_Request_Error_Ekhane_Network_Ba_Server_Error_Handle_Hoy
        console.error('Manual break-even error:', err);
        setManualBreakEvenError('Could not calculate break-even analysis.');
        setManualBreakEvenResult(null);
      });
  };

  // #Loading_UI_Ekhane_Data_Load_Howar_Age_Message_Dekhay
  if (loading) {
    return (
      <div style={cardStyle}>
        <h2>Finance Decision Support</h2>
        <p>Loading finance features...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      {/* #Main_Title_Ekhane_Finance_Module_Er_Title_Dekhay */}
      <h2 style={{ color: '#111827' }}>Finance Decision Support</h2>

      {/* #Revenue_Section_Ekhane_Daily_Ar_Monthly_Revenue_Dekhay */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Daily and Monthly Revenue</h3>

        {/* #Daily_Revenue_Table_Ekhane_Date_Wise_Revenue_Dekhay */}
        <h4>Daily Revenue</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {revenue && revenue.dailyRevenue && revenue.dailyRevenue.map((row, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{formatDate(row.sale_date)}</td>
                <td style={thTdStyle}>{formatMoney(row.total_revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* #Monthly_Revenue_Table_Ekhane_Month_Wise_Revenue_Dekhay */}
        <h4>Monthly Revenue</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Month</th>
              <th style={thTdStyle}>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {revenue && revenue.monthlyRevenue && revenue.monthlyRevenue.map((row, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{row.month}</td>
                <td style={thTdStyle}>{formatMoney(row.total_revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* #Expense_Section_Ekhane_Highest_Expense_Category_Dekhay */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Highest Expense Categories</h3>

        {/* #Expense_Table_Ekhane_Category_Wise_Total_Expense_Dekhay */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Category</th>
              <th style={thTdStyle}>Total Expense</th>
              <th style={thTdStyle}>Transactions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((row, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{row.category}</td>
                <td style={thTdStyle}>{formatMoney(row.total_expense)}</td>
                <td style={thTdStyle}>{row.total_transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* #BreakEven_Section_Ekhane_Manual_Ar_Database_Based_BreakEven_Ase */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Break-even Analysis</h3>

        {/* #Manual_BreakEven_Box_Ekhane_User_Input_Niye_Calculation_Kore */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            marginBottom: '20px'
          }}
        >
          <h4 style={{ marginTop: 0 }}>Manual Break-even Calculator</h4>

          {/* #Manual_BreakEven_Form_Ekhane_User_FixedCost_SellingPrice_VariableCost_Dey */}
          <form onSubmit={handleManualBreakEvenSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '15px'
              }}
            >
              {/* #Input_FixedCost_Ekhane_User_Fixed_Cost_Dey */}
              <div>
                <label>Fixed Cost</label>
                <input
                  type="number"
                  name="fixedCost"
                  value={manualBreakEvenForm.fixedCost}
                  onChange={handleManualBreakEvenChange}
                  placeholder="Example: 32000"
                  style={inputStyle}
                  required
                />
              </div>

              {/* #Input_SellingPrice_Ekhane_User_Unit_Selling_Price_Dey */}
              <div>
                <label>Selling Price Per Unit</label>
                <input
                  type="number"
                  name="sellingPricePerUnit"
                  value={manualBreakEvenForm.sellingPricePerUnit}
                  onChange={handleManualBreakEvenChange}
                  placeholder="Example: 5000"
                  style={inputStyle}
                  required
                />
              </div>

              {/* #Input_VariableCost_Ekhane_User_Unit_Variable_Cost_Dey */}
              <div>
                <label>Variable Cost Per Unit</label>
                <input
                  type="number"
                  name="variableCostPerUnit"
                  value={manualBreakEvenForm.variableCostPerUnit}
                  onChange={handleManualBreakEvenChange}
                  placeholder="Example: 3000"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* #Button_Calculate_Ekhane_Click_Korle_Backend_API_Call_Hoy */}
            <button type="submit" style={buttonStyle}>
              Calculate Break-even
            </button>
          </form>

          {/* #Manual_Error_Message_Ekhane_Wrong_Input_Hole_Error_Dekhay */}
          {manualBreakEvenError && (
            <p style={{ color: '#dc2626', fontWeight: 'bold' }}>
              {manualBreakEvenError}
            </p>
          )}

          {/* #Manual_Result_Box_Ekhane_Calculated_BreakEven_Result_Dekhay */}
          {manualBreakEvenResult && (
            <div
              style={{
                marginTop: '15px',
                backgroundColor: '#ecfdf5',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #bbf7d0'
              }}
            >
              <h4 style={{ marginTop: 0 }}>Manual Break-even Result</h4>
              <p><b>Fixed Cost:</b> {formatMoney(manualBreakEvenResult.fixedCost)}</p>
              <p><b>Selling Price Per Unit:</b> {formatMoney(manualBreakEvenResult.sellingPricePerUnit)}</p>
              <p><b>Variable Cost Per Unit:</b> {formatMoney(manualBreakEvenResult.variableCostPerUnit)}</p>
              <p><b>Contribution Margin Per Unit:</b> {formatMoney(manualBreakEvenResult.contributionMarginPerUnit)}</p>
              <p><b>Contribution Margin Ratio:</b> {(Number(manualBreakEvenResult.contributionMarginRatio || 0) * 100).toFixed(2)}%</p>
              <p><b>Break-even Units:</b> {Number(manualBreakEvenResult.breakEvenUnits).toFixed(2)}</p>
              <p><b>Rounded Break-even Units:</b> {manualBreakEvenResult.breakEvenUnitsRounded}</p>
              <p><b>Break-even Revenue:</b> {formatMoney(manualBreakEvenResult.breakEvenRevenue)}</p>
            </div>
          )}
        </div>

        {/* #Database_BreakEven_Ekhane_Sales_Ar_Expense_Table_Theke_Result_Dekhay */}
        <h4>Database-based Break-even Summary</h4>

        {breakEven ? (
          <div>
            <p><b>Fixed Cost:</b> {formatMoney(breakEven.fixedCost)}</p>
            <p><b>Total Revenue:</b> {formatMoney(breakEven.totalRevenue)}</p>
            <p><b>Total Variable Cost:</b> {formatMoney(breakEven.totalVariableCost)}</p>
            <p><b>Contribution:</b> {formatMoney(breakEven.contribution)}</p>
            <p><b>Average Contribution Per Sale:</b> {formatMoney(breakEven.averageContributionPerSale)}</p>
            <p><b>Contribution Margin Ratio:</b> {(Number(breakEven.contributionMarginRatio || 0) * 100).toFixed(2)}%</p>
            <p><b>Break-even Sales Count:</b> {breakEven.breakEvenSalesCount}</p>
            <p><b>Break-even Revenue:</b> {formatMoney(breakEven.breakEvenRevenue)}</p>
          </div>
        ) : (
          <p>No break-even data found.</p>
        )}
      </div>

      {/* #Monthly_Performance_Section_Ekhane_Month_Wise_Performance_Table_Ar_Graph_Ase */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Monthly Performance Summary</h3>

        {/* #Monthly_Table_Ekhane_Revenue_Cost_Expense_Profit_Dekhay */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Month</th>
              <th style={thTdStyle}>Revenue</th>
              <th style={thTdStyle}>Cost</th>
              <th style={thTdStyle}>Expense</th>
              <th style={thTdStyle}>Gross Profit</th>
              <th style={thTdStyle}>Net Profit</th>
            </tr>
          </thead>

          <tbody>
            {monthlySummary.map((row, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{row.month}</td>
                <td style={thTdStyle}>{formatMoney(row.total_revenue)}</td>
                <td style={thTdStyle}>{formatMoney(row.total_cost)}</td>
                <td style={thTdStyle}>{formatMoney(row.total_expense)}</td>
                <td style={thTdStyle}>{formatMoney(row.gross_profit)}</td>
                <td style={thTdStyle}>{formatMoney(row.net_profit)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* #Monthly_Graph_Ekhane_Revenue_Expense_NetProfit_Compare_Kora_Hoy */}
        <div style={graphBoxStyle}>
          <h4 style={{ marginTop: 0 }}>Monthly Revenue, Expense and Net Profit Comparison</h4>

          {/* #Graph_Legend_Ekhane_Color_Er_Meaning_Dekhay */}
          <div style={legendStyle}>
            <span style={legendItemStyle}>
              <span style={{ width: '14px', height: '14px', backgroundColor: '#2563eb', display: 'inline-block', borderRadius: '3px' }}></span>
              Revenue
            </span>

            <span style={legendItemStyle}>
              <span style={{ width: '14px', height: '14px', backgroundColor: '#f97316', display: 'inline-block', borderRadius: '3px' }}></span>
              Expense
            </span>

            <span style={legendItemStyle}>
              <span style={{ width: '14px', height: '14px', backgroundColor: '#16a34a', display: 'inline-block', borderRadius: '3px' }}></span>
              Positive Profit
            </span>

            <span style={legendItemStyle}>
              <span style={{ width: '14px', height: '14px', backgroundColor: '#dc2626', display: 'inline-block', borderRadius: '3px' }}></span>
              Loss
            </span>
          </div>

          {/* #Graph_Bar_Area_Ekhane_Proti_Month_Er_3_Ta_Bar_Dekhay */}
          <div style={graphRowStyle}>
            {monthlySummary.map((row, index) => (
              <div key={index} style={monthGroupStyle}>
                <div style={barGroupStyle}>
                  {/* #Graph_Revenue_Bar_Ekhane_Monthly_Revenue_Dekhay */}
                  <div
                    title={`Revenue: ${formatMoney(row.total_revenue)}`}
                    style={{
                      width: '34px',
                      height: `${getBarHeight(row.total_revenue)}px`,
                      backgroundColor: getBarColor('revenue', row.total_revenue),
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={graphValueStyle}>{formatShortMoney(row.total_revenue)}</span>
                  </div>

                  {/* #Graph_Expense_Bar_Ekhane_Monthly_Expense_Dekhay */}
                  <div
                    title={`Expense: ${formatMoney(row.total_expense)}`}
                    style={{
                      width: '34px',
                      height: `${getBarHeight(row.total_expense)}px`,
                      backgroundColor: getBarColor('expense', row.total_expense),
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={graphValueStyle}>{formatShortMoney(row.total_expense)}</span>
                  </div>

                  {/* #Graph_NetProfit_Bar_Ekhane_Monthly_Net_Profit_Ba_Loss_Dekhay */}
                  <div
                    title={`Net Profit: ${formatMoney(row.net_profit)}`}
                    style={{
                      width: '34px',
                      height: `${getBarHeight(row.net_profit)}px`,
                      backgroundColor: getBarColor('profit', row.net_profit),
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={graphValueStyle}>{formatShortMoney(row.net_profit)}</span>
                  </div>
                </div>

                {/* #Graph_Month_Label_Ekhane_Month_Name_Dekhay */}
                <div style={barLabelStyle}>{row.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* #Audit_Log_Section_Ekhane_Financial_Change_Log_Dekhay */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>Financial Audit Logs</h3>

        {/* #Audit_Table_Ekhane_Action_Table_Description_Date_Dekhay */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Action</th>
              <th style={thTdStyle}>Table</th>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td style={thTdStyle}>{log.action_type}</td>
                <td style={thTdStyle}>{log.table_name}</td>
                <td style={thTdStyle}>{log.description}</td>
                <td style={thTdStyle}>{new Date(log.action_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceDecisionSupport;