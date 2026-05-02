// #Import_React_Ekhane_React_Library_Import_Kora_Hoy
import React, { useEffect, useState } from 'react';

// #Style_Card_Ekhane_Prottek_Box_Er_Common_Design_Ase
const cardStyle = {
  // #Card_Background_Ekhane_Box_Er_Background_White_Kora_Hoy
  backgroundColor: '#ffffff',

  // #Card_Border_Radius_Ekhane_Box_Er_Corner_Round_Kora_Hoy
  borderRadius: '12px',

  // #Card_Padding_Ekhane_Box_Er_Vitore_Space_Dewa_Hoy
  padding: '20px',

  // #Card_Margin_Ekhane_One_Box_Theke_Another_Box_Er_Distance_Dewa_Hoy
  marginBottom: '20px',

  // #Card_Shadow_Ekhane_Box_E_Halka_Shadow_Dewa_Hoy
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',

  // #Card_Border_Ekhane_Box_E_Light_Border_Dewa_Hoy
  border: '1px solid #e5e7eb'
};

// #Style_Title_Ekhane_Section_Title_Er_Design_Ase
const titleStyle = {
  // #Title_Margin_Ekhane_Title_Er_Niche_Space_Dewa_Hoy
  marginBottom: '12px',

  // #Title_Color_Ekhane_Title_Er_Text_Color_Set_Kora_Hoy
  color: '#1f2937'
};

// #Style_Table_Ekhane_Table_Er_Layout_Design_Ase
const tableStyle = {
  // #Table_Width_Ekhane_Table_Full_Width_Kora_Hoy
  width: '100%',

  // #Table_Border_Collapse_Ekhane_Table_Border_Clean_Kora_Hoy
  borderCollapse: 'collapse',

  // #Table_Margin_Ekhane_Table_Er_Upore_Space_Dewa_Hoy
  marginTop: '10px'
};

// #Style_Table_Cell_Ekhane_Table_Header_Ar_Cell_Er_Design_Ase
const thTdStyle = {
  // #Cell_Border_Ekhane_Cell_E_Border_Dewa_Hoy
  border: '1px solid #e5e7eb',

  // #Cell_Padding_Ekhane_Cell_E_Vitore_Space_Dewa_Hoy
  padding: '10px',

  // #Cell_Text_Align_Ekhane_Text_Left_Side_E_Rakha_Hoy
  textAlign: 'left'
};

// #Style_Input_Ekhane_Form_Input_Field_Er_Design_Ase
const inputStyle = {
  // #Input_Padding_Ekhane_Input_E_Vitore_Space_Dewa_Hoy
  padding: '10px',

  // #Input_Radius_Ekhane_Input_Field_Er_Corner_Round_Kora_Hoy
  borderRadius: '6px',

  // #Input_Border_Ekhane_Input_Field_E_Border_Dewa_Hoy
  border: '1px solid #cbd5e1',

  // #Input_Width_Ekhane_Input_Field_Full_Width_Kora_Hoy
  width: '100%',

  // #Input_Margin_Ekhane_Label_Theke_Input_Er_Distance_Dewa_Hoy
  marginTop: '5px'
};

// #Style_Button_Ekhane_Calculate_Button_Er_Design_Ase
const buttonStyle = {
  // #Button_Padding_Ekhane_Button_E_Vitore_Space_Dewa_Hoy
  padding: '10px 18px',

  // #Button_Background_Ekhane_Button_E_Blue_Color_Dewa_Hoy
  backgroundColor: '#2563eb',

  // #Button_Text_Color_Ekhane_Button_Text_White_Kora_Hoy
  color: 'white',

  // #Button_Border_Ekhane_Default_Border_Remove_Kora_Hoy
  border: 'none',

  // #Button_Radius_Ekhane_Button_Corner_Round_Kora_Hoy
  borderRadius: '6px',

  // #Button_Font_Ekhane_Button_Text_Bold_Kora_Hoy
  fontWeight: 'bold',

  // #Button_Cursor_Ekhane_Mouse_Gele_Pointer_Dekhay
  cursor: 'pointer',

  // #Button_Margin_Ekhane_Button_Er_Upore_Space_Dewa_Hoy
  marginTop: '15px'
};

// #Style_Graph_Box_Ekhane_Graph_Er_Outer_Box_Design_Ase
const graphBoxStyle = {
  // #Graph_Background_Ekhane_Graph_Box_E_Light_Background_Dewa_Hoy
  backgroundColor: '#f8fafc',

  // #Graph_Border_Ekhane_Graph_Box_E_Border_Dewa_Hoy
  border: '1px solid #e2e8f0',

  // #Graph_Radius_Ekhane_Graph_Box_Er_Corner_Round_Kora_Hoy
  borderRadius: '12px',

  // #Graph_Padding_Ekhane_Graph_Box_E_Vitore_Space_Dewa_Hoy
  padding: '20px',

  // #Graph_Margin_Ekhane_Table_Theke_Graph_Er_Distance_Dewa_Hoy
  marginTop: '20px',

  // #Graph_Overflow_Ekhane_Screen_Choto_Hole_Horizontal_Scroll_Enable_Hoy
  overflowX: 'auto'
};

// #Style_Graph_Row_Ekhane_Graph_Er_Bar_Gula_Row_Akare_Sajano_Hoy
const graphRowStyle = {
  // #Graph_Row_Display_Ekhane_Bar_Gula_Side_By_Side_Dekhay
  display: 'flex',

  // #Graph_Row_Align_Ekhane_Bar_Gula_Nicher_Line_Theke_Start_Hoy
  alignItems: 'flex-end',

  // #Graph_Row_Gap_Ekhane_Month_Group_Gular_Majhe_Gap_Dewa_Hoy
  gap: '20px',

  // #Graph_Row_Height_Ekhane_Graph_Er_Minimum_Height_Set_Kora_Hoy
  minHeight: '260px',

  // #Graph_Row_Padding_Ekhane_Upore_Space_Dewa_Hoy
  paddingTop: '20px'
};

// #Style_Legend_Ekhane_Graph_Color_Er_Meaning_Dekhanor_Design_Ase
const legendStyle = {
  // #Legend_Display_Ekhane_Legend_Items_Line_E_Show_Hoy
  display: 'flex',

  // #Legend_Gap_Ekhane_Legend_Items_Er_Majhe_Gap_Dewa_Hoy
  gap: '18px',

  // #Legend_Wrap_Ekhane_Space_Kom_Hole_Next_Line_E_Jay
  flexWrap: 'wrap',

  // #Legend_Margin_Ekhane_Graph_Theke_Legend_Er_Distance_Dewa_Hoy
  marginBottom: '15px',

  // #Legend_Font_Ekhane_Legend_Text_Size_Set_Kora_Hoy
  fontSize: '14px',

  // #Legend_Color_Ekhane_Legend_Text_Color_Set_Kora_Hoy
  color: '#374151'
};

// #Style_Legend_Item_Ekhane_One_Legend_Item_Er_Design_Ase
const legendItemStyle = {
  // #Legend_Item_Display_Ekhane_Color_Box_Ar_Text_Side_By_Side_Dekhay
  display: 'flex',

  // #Legend_Item_Align_Ekhane_Color_Box_Ar_Text_Center_Align_Hoy
  alignItems: 'center',

  // #Legend_Item_Gap_Ekhane_Color_Box_Ar_Text_Er_Majhe_Gap_Dewa_Hoy
  gap: '6px'
};

// #Style_Month_Group_Ekhane_Proti_Month_Er_Group_Design_Ase
const monthGroupStyle = {
  // #Month_Group_Width_Ekhane_Proti_Month_Er_Minimum_Width_Dewa_Hoy
  minWidth: '150px',

  // #Month_Group_Text_Ekhane_Month_Label_Center_E_Rakha_Hoy
  textAlign: 'center'
};

// #Style_Bar_Group_Ekhane_Proti_Month_Er_3_Ta_Bar_Sajano_Hoy
const barGroupStyle = {
  // #Bar_Group_Display_Ekhane_3_Ta_Bar_Side_By_Side_Dekhay
  display: 'flex',

  // #Bar_Group_Align_Ekhane_Bar_Gula_Bottom_Theke_Start_Hoy
  alignItems: 'flex-end',

  // #Bar_Group_Justify_Ekhane_Bar_Gula_Center_E_Rakha_Hoy
  justifyContent: 'center',

  // #Bar_Group_Gap_Ekhane_3_Ta_Bar_Er_Majhe_Gap_Dewa_Hoy
  gap: '8px',

  // #Bar_Group_Height_Ekhane_Graph_Bar_Area_Er_Height_Set_Kora_Hoy
  height: '190px',

  // #Bar_Group_Bottom_Line_Ekhane_X_Axis_Er_Moto_Line_Dewa_Hoy
  borderBottom: '2px solid #cbd5e1'
};

// #Style_Bar_Label_Ekhane_Month_Label_Er_Design_Ase
const barLabelStyle = {
  // #Bar_Label_Font_Ekhane_Month_Label_Text_Size_Set_Kora_Hoy
  fontSize: '12px',

  // #Bar_Label_Margin_Ekhane_Bar_Theke_Label_Er_Distance_Dewa_Hoy
  marginTop: '8px',

  // #Bar_Label_Color_Ekhane_Label_Text_Color_Set_Kora_Hoy
  color: '#475569',

  // #Bar_Label_Bold_Ekhane_Label_Text_Bold_Kora_Hoy
  fontWeight: 'bold'
};

// #Style_Graph_Value_Ekhane_Bar_Er_Vitore_Value_Dekhanor_Design_Ase
const graphValueStyle = {
  // #Graph_Value_Font_Ekhane_Value_Text_Size_Choto_Kora_Hoy
  fontSize: '10px',

  // #Graph_Value_Color_Ekhane_Value_Text_White_Kora_Hoy
  color: 'white',

  // #Graph_Value_Writing_Mode_Ekhane_Value_Vertical_Vabe_Dekhay
  writingMode: 'vertical-rl',

  // #Graph_Value_Rotate_Ekhane_Value_Readable_Korar_Jonno_Rotate_Kora_Hoy
  transform: 'rotate(180deg)',

  // #Graph_Value_Padding_Ekhane_Value_E_Space_Dewa_Hoy
  padding: '4px 0'
};

// #Component_Start_Ekhane_FinanceDecisionSupport_Component_Start_Hoy
const FinanceDecisionSupport = () => {
  // #State_Revenue_Ekhane_Daily_Ar_Monthly_Revenue_Data_Store_Hoy
  const [revenue, setRevenue] = useState(null);

  // #State_Expenses_Ekhane_Highest_Expense_Category_Data_Store_Hoy
  const [expenses, setExpenses] = useState([]);

  // #State_BreakEven_Ekhane_Database_Based_BreakEven_Data_Store_Hoy
  const [breakEven, setBreakEven] = useState(null);

  // #State_MonthlySummary_Ekhane_Month_Wise_Performance_Data_Store_Hoy
  const [monthlySummary, setMonthlySummary] = useState([]);

  // #State_AuditLogs_Ekhane_Financial_Audit_Log_Data_Store_Hoy
  const [auditLogs, setAuditLogs] = useState([]);

  // #State_Loading_Ekhane_Data_Load_Hocche_Kina_Track_Kora_Hoy
  const [loading, setLoading] = useState(true);

  // #State_ManualBreakEvenForm_Ekhane_User_Input_Store_Hoy
  const [manualBreakEvenForm, setManualBreakEvenForm] = useState({
    // #Form_FixedCost_Ekhane_User_Er_Fixed_Cost_Store_Hoy
    fixedCost: '',

    // #Form_SellingPrice_Ekhane_User_Er_Unit_Selling_Price_Store_Hoy
    sellingPricePerUnit: '',

    // #Form_VariableCost_Ekhane_User_Er_Unit_Variable_Cost_Store_Hoy
    variableCostPerUnit: ''
  });

  // #State_ManualBreakEvenResult_Ekhane_Calculated_Result_Store_Hoy
  const [manualBreakEvenResult, setManualBreakEvenResult] = useState(null);

  // #State_ManualBreakEvenError_Ekhane_Input_Error_Message_Store_Hoy
  const [manualBreakEvenError, setManualBreakEvenError] = useState('');

  // #Function_FormatMoney_Ekhane_Number_Ke_BDT_Format_E_Convert_Kora_Hoy
  const formatMoney = (value) => {
    // #Format_Number_Ekhane_Value_Null_Hole_0_Dhora_Hoy
    const numberValue = Number(value || 0);

    // #Format_Return_Ekhane_2_Decimal_Shoho_BDT_Text_Return_Kora_Hoy
    return `BDT ${numberValue.toFixed(2)}`;
  };

  // #Function_FormatDate_Ekhane_Database_Date_Ke_Clean_Date_E_Convert_Kora_Hoy
  const formatDate = (value) => {
    // #Date_Check_Ekhane_Value_Na_Thakle_NA_Return_Kora_Hoy
    if (!value) {
      return 'N/A';
    }

    // #Date_Return_Ekhane_Timestamp_Theke_Only_Date_Part_Newa_Hoy
    return String(value).slice(0, 10);
  };

  // #Function_FormatShortMoney_Ekhane_Graph_Er_Jonno_Choto_Number_Show_Kora_Hoy
  const formatShortMoney = (value) => {
    // #ShortMoney_Number_Ekhane_Input_Value_Number_E_Convert_Hoy
    const numberValue = Number(value || 0);

    // #ShortMoney_Thousand_Check_Ekhane_1000_Er_Beshi_Hole_K_Format_Hoy
    if (Math.abs(numberValue) >= 1000) {
      return `${(numberValue / 1000).toFixed(1)}k`;
    }

    // #ShortMoney_Return_Ekhane_Choto_Value_Normal_Format_E_Return_Hoy
    return numberValue.toFixed(0);
  };

  // #Function_GetGraphMaxValue_Ekhane_Graph_Scale_Er_Jonno_Max_Value_Ber_Kora_Hoy
  const getGraphMaxValue = () => {
    // #GraphMax_Empty_Check_Ekhane_Data_Na_Thakle_1_Return_Kora_Hoy
    if (!monthlySummary || monthlySummary.length === 0) {
      return 1;
    }

    // #GraphMax_Array_Ekhane_Revenue_Expense_Profit_Value_Rakha_Hoy
    const allValues = [];

    // #GraphMax_Loop_Ekhane_Proti_Month_Er_Value_Array_Te_Add_Kora_Hoy
    monthlySummary.forEach((row) => {
      // #GraphMax_Revenue_Ekhane_Total_Revenue_Add_Kora_Hoy
      allValues.push(Math.abs(Number(row.total_revenue || 0)));

      // #GraphMax_Expense_Ekhane_Total_Expense_Add_Kora_Hoy
      allValues.push(Math.abs(Number(row.total_expense || 0)));

      // #GraphMax_Profit_Ekhane_Net_Profit_Or_Loss_Add_Kora_Hoy
      allValues.push(Math.abs(Number(row.net_profit || 0)));
    });

    // #GraphMax_Return_Ekhane_Sobcheye_Boro_Value_Return_Kora_Hoy
    return Math.max(...allValues, 1);
  };

  // #Function_GetBarHeight_Ekhane_Graph_Bar_Er_Height_Calculate_Kora_Hoy
  const getBarHeight = (value) => {
    // #BarHeight_Max_Ekhane_Max_Value_Newa_Hoy
    const maxValue = getGraphMaxValue();

    // #BarHeight_Number_Ekhane_Current_Value_Positive_Number_Kora_Hoy
    const numberValue = Math.abs(Number(value || 0));

    // #BarHeight_Calculate_Ekhane_Current_Value_Onujayi_Height_Ber_Hoy
    const height = (numberValue / maxValue) * 160;

    // #BarHeight_Return_Ekhane_Minimum_18px_Height_Ensure_Kora_Hoy
    return Math.max(height, 18);
  };

  // #Function_GetBarColor_Ekhane_Graph_Bar_Er_Color_Select_Kora_Hoy
  const getBarColor = (type, value) => {
    // #BarColor_Revenue_Ekhane_Revenue_Bar_Blue_Kora_Hoy
    if (type === 'revenue') {
      return '#2563eb';
    }

    // #BarColor_Expense_Ekhane_Expense_Bar_Orange_Kora_Hoy
    if (type === 'expense') {
      return '#f97316';
    }

    // #BarColor_Loss_Ekhane_Negative_Profit_Hole_Red_Color_Dewa_Hoy
    if (Number(value) < 0) {
      return '#dc2626';
    }

    // #BarColor_Profit_Ekhane_Positive_Profit_Hole_Green_Color_Dewa_Hoy
    return '#16a34a';
  };

  // #UseEffect_LoadFinanceData_Ekhane_Component_Load_Hole_API_Call_Hoy
  useEffect(() => {
    // #PromiseAll_Ekhane_Sob_Finance_API_Ekshathe_Call_Kora_Hoy
    Promise.all([
      // #API_RevenueSummary_Ekhane_Daily_Ar_Monthly_Revenue_Ana_Hoy
      fetch('/api/finance/revenue-summary').then(res => res.json()),

      // #API_TopExpense_Ekhane_Highest_Expense_Category_Ana_Hoy
      fetch('/api/finance/top-expense-categories').then(res => res.json()),

      // #API_BreakEven_Ekhane_Database_Based_BreakEven_Ana_Hoy
      fetch('/api/finance/break-even').then(res => res.json()),

      // #API_MonthlySummary_Ekhane_Month_Wise_Performance_Ana_Hoy
      fetch('/api/finance/monthly-summary').then(res => res.json()),

      // #API_AuditLogs_Ekhane_Financial_Audit_Logs_Ana_Hoy
      fetch('/api/finance/audit-logs').then(res => res.json())
    ])
      // #API_Response_Ekhane_Sob_API_Er_Response_Receive_Kora_Hoy
      .then(([revenueData, expenseData, breakEvenData, monthlyData, auditData]) => {
        // #Set_Revenue_Ekhane_Revenue_State_Update_Kora_Hoy
        setRevenue(revenueData);

        // #Set_Expenses_Ekhane_Expense_Data_Array_Hole_State_E_Save_Kora_Hoy
        setExpenses(Array.isArray(expenseData) ? expenseData : []);

        // #Set_BreakEven_Ekhane_BreakEven_Data_State_E_Save_Kora_Hoy
        setBreakEven(breakEvenData);

        // #Set_MonthlySummary_Ekhane_Monthly_Data_Array_Hole_State_E_Save_Kora_Hoy
        setMonthlySummary(Array.isArray(monthlyData) ? monthlyData : []);

        // #Set_AuditLogs_Ekhane_Audit_Data_Array_Hole_State_E_Save_Kora_Hoy
        setAuditLogs(Array.isArray(auditData) ? auditData : []);

        // #Set_LoadingFalse_Ekhane_Loading_Sesh_Bojhano_Hoy
        setLoading(false);
      })
      // #API_Error_Ekhane_API_Fail_Hole_Error_Handle_Kora_Hoy
      .catch(err => {
        // #Error_Log_Ekhane_Console_E_Error_Dekha_Hoy
        console.error('Finance dashboard error:', err);

        // #Loading_Stop_Ekhane_Error_Holeo_Loading_Stop_Kora_Hoy
        setLoading(false);
      });
  }, []);

  // #Function_HandleInputChange_Ekhane_BreakEven_Form_Input_Update_Hoy
  const handleManualBreakEvenChange = (event) => {
    // #Input_Name_Value_Ekhane_Input_Field_Er_Name_Ar_Value_Newa_Hoy
    const { name, value } = event.target;

    // #Update_Form_State_Ekhane_Selected_Input_Field_Update_Kora_Hoy
    setManualBreakEvenForm({
      // #Keep_Old_Form_Ekhane_Ager_Form_Value_Gula_Thakbe
      ...manualBreakEvenForm,

      // #Update_Current_Field_Ekhane_Je_Input_Change_Hoy_Sheta_Update_Hoy
      [name]: value
    });
  };

  // #Function_SubmitManualBreakEven_Ekhane_User_Input_Backend_E_Send_Kora_Hoy
  const handleManualBreakEvenSubmit = (event) => {
    // #Prevent_Default_Ekhane_Form_Page_Reload_Off_Kora_Hoy
    event.preventDefault();

    // #Clear_Error_Ekhane_Ager_Error_Message_Clear_Kora_Hoy
    setManualBreakEvenError('');

    // #Clear_Result_Ekhane_Ager_Result_Clear_Kora_Hoy
    setManualBreakEvenResult(null);

    // #Fetch_ManualBreakEven_Ekhane_Backend_POST_API_Call_Kora_Hoy
    fetch('/api/finance/break-even/manual', {
      // #Fetch_Method_Ekhane_POST_Use_Kora_Hoy_Karon_User_Input_Pathano_Hoy
      method: 'POST',

      // #Fetch_Header_Ekhane_JSON_Data_Pathano_Hocche_Bola_Hoy
      headers: {
        'Content-Type': 'application/json'
      },

      // #Fetch_Body_Ekhane_User_Input_JSON_Format_E_Send_Kora_Hoy
      body: JSON.stringify({
        // #Body_FixedCost_Ekhane_Fixed_Cost_Number_E_Convert_Kora_Hoy
        fixedCost: Number(manualBreakEvenForm.fixedCost),

        // #Body_SellingPrice_Ekhane_Selling_Price_Number_E_Convert_Kora_Hoy
        sellingPricePerUnit: Number(manualBreakEvenForm.sellingPricePerUnit),

        // #Body_VariableCost_Ekhane_Variable_Cost_Number_E_Convert_Kora_Hoy
        variableCostPerUnit: Number(manualBreakEvenForm.variableCostPerUnit)
      })
    })
      // #Response_JSON_Ekhane_Backend_Response_JSON_E_Convert_Kora_Hoy
      .then(res => res.json())

      // #ManualBreakEven_Response_Ekhane_Result_Or_Error_Handle_Hoy
      .then(data => {
        // #Manual_Error_Check_Ekhane_Backend_Error_Pathale_Message_Dekhay
        if (data.error) {
          setManualBreakEvenError(data.error);
          setManualBreakEvenResult(null);
        } else {
          // #Manual_Result_Set_Ekhane_Calculated_Result_State_E_Save_Hoy
          setManualBreakEvenResult(data);

          // #Manual_Error_Clear_Ekhane_Error_Message_Clear_Kora_Hoy
          setManualBreakEvenError('');
        }
      })
      // #Manual_Request_Error_Ekhane_API_Call_Fail_Hole_Error_Handle_Hoy
      .catch(err => {
        // #Manual_Error_Log_Ekhane_Console_E_Error_Dekha_Hoy
        console.error('Manual break-even error:', err);

        // #Manual_Error_Message_Ekhane_User_Ke_Error_Message_Dekhay
        setManualBreakEvenError('Could not calculate break-even analysis.');

        // #Manual_Result_Clear_Ekhane_Result_Null_Kora_Hoy
        setManualBreakEvenResult(null);
      });
  };

  // #Loading_Check_Ekhane_Data_Load_Hote_Thakle_Loading_UI_Dekhay
  if (loading) {
    return (
      <div style={cardStyle}>
        <h2>Finance Decision Support</h2>
        <p>Loading finance features...</p>
      </div>
    );
  }

  // #Return_UI_Ekhane_Finance_Dashboard_Render_Kora_Hoy
  return (
    <div style={{ marginTop: '30px' }}>
      {/* #Main_Title_Ekhane_Finance_Module_Er_Title_Dekhay */}
      <h2 style={{ color: '#111827' }}>Finance Decision Support</h2>

      {/* #Revenue_Section_Ekhane_Daily_Ar_Monthly_Revenue_Dekhay */}
      <div style={cardStyle}>
        {/* #Revenue_Title_Ekhane_Revenue_Section_Title_Dekhay */}
        <h3 style={titleStyle}>Daily and Monthly Revenue</h3>

        {/* #Daily_Revenue_Title_Ekhane_Daily_Revenue_Subtitle_Dekhay */}
        <h4>Daily Revenue</h4>

        {/* #Daily_Revenue_Table_Ekhane_Daily_Revenue_Table_Start_Hoy */}
        <table style={tableStyle}>
          {/* #Daily_Table_Head_Ekhane_Table_Header_Dekhay */}
          <thead>
            <tr>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Revenue</th>
            </tr>
          </thead>

          {/* #Daily_Table_Body_Ekhane_Daily_Revenue_Data_Map_Kora_Hoy */}
          <tbody>
            {revenue && revenue.dailyRevenue && revenue.dailyRevenue.map((row, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{formatDate(row.sale_date)}</td>
                <td style={thTdStyle}>{formatMoney(row.total_revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* #Monthly_Revenue_Title_Ekhane_Monthly_Revenue_Subtitle_Dekhay */}
        <h4>Monthly Revenue</h4>

        {/* #Monthly_Revenue_Table_Ekhane_Monthly_Revenue_Table_Start_Hoy */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Month</th>
              <th style={thTdStyle}>Revenue</th>
            </tr>
          </thead>

          {/* #Monthly_Table_Body_Ekhane_Monthly_Revenue_Data_Map_Kora_Hoy */}
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
        {/* #Expense_Title_Ekhane_Expense_Section_Title_Dekhay */}
        <h3 style={titleStyle}>Highest Expense Categories</h3>

        {/* #Expense_Table_Ekhane_Category_Wise_Expense_Table_Start_Hoy */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Category</th>
              <th style={thTdStyle}>Total Expense</th>
              <th style={thTdStyle}>Transactions</th>
            </tr>
          </thead>

          {/* #Expense_Table_Body_Ekhane_Expense_Category_Data_Map_Kora_Hoy */}
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
        {/* #BreakEven_Title_Ekhane_BreakEven_Section_Title_Dekhay */}
        <h3 style={titleStyle}>Break-even Analysis</h3>

        {/* #Manual_BreakEven_Box_Ekhane_User_Input_Niye_BreakEven_Calculate_Kora_Hoy */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            marginBottom: '20px'
          }}
        >
          {/* #Manual_BreakEven_Title_Ekhane_Form_Title_Dekhay */}
          <h4 style={{ marginTop: 0 }}>Manual Break-even Calculator</h4>

          {/* #Manual_Form_Ekhane_User_Input_Form_Start_Hoy */}
          <form onSubmit={handleManualBreakEvenSubmit}>
            {/* #Manual_Form_Grid_Ekhane_Input_Gula_Grid_E_Sajano_Hoy */}
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

              {/* #Input_SellingPrice_Ekhane_User_Selling_Price_Dey */}
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

              {/* #Input_VariableCost_Ekhane_User_Variable_Cost_Dey */}
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

            {/* #Calculate_Button_Ekhane_Click_Korle_Manual_BreakEven_API_Call_Hoy */}
            <button type="submit" style={buttonStyle}>
              Calculate Break-even
            </button>
          </form>

          {/* #Manual_Error_UI_Ekhane_Input_Error_Hole_Message_Dekhay */}
          {manualBreakEvenError && (
            <p style={{ color: '#dc2626', fontWeight: 'bold' }}>
              {manualBreakEvenError}
            </p>
          )}

          {/* #Manual_Result_UI_Ekhane_BreakEven_Calculation_Result_Dekhay */}
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

        {/* #Database_BreakEven_Title_Ekhane_Database_Based_Summary_Title_Dekhay */}
        <h4>Database-based Break-even Summary</h4>

        {/* #Database_BreakEven_UI_Ekhane_Sales_Ar_Expense_Data_Theke_Result_Dekhay */}
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

      {/* #Monthly_Performance_Section_Ekhane_Table_Ar_Graph_Dekhay */}
      <div style={cardStyle}>
        {/* #Monthly_Title_Ekhane_Monthly_Performance_Title_Dekhay */}
        <h3 style={titleStyle}>Monthly Performance Summary</h3>

        {/* #Monthly_Table_Ekhane_Month_Wise_Revenue_Cost_Expense_Profit_Dekhay */}
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

          {/* #Monthly_Table_Body_Ekhane_Monthly_Summary_Data_Map_Kora_Hoy */}
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

        {/* #Monthly_Graph_Box_Ekhane_Revenue_Expense_Profit_Graph_Dekhay */}
        <div style={graphBoxStyle}>
          {/* #Graph_Title_Ekhane_Graph_Er_Title_Dekhay */}
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

          {/* #Graph_Row_Ekhane_Proti_Month_Er_Bar_Group_Show_Kora_Hoy */}
          <div style={graphRowStyle}>
            {monthlySummary.map((row, index) => (
              <div key={index} style={monthGroupStyle}>
                {/* #Bar_Group_Ekhane_Ekta_Month_Er_Revenue_Expense_Profit_Bar_Ase */}
                <div style={barGroupStyle}>
                  {/* #Revenue_Bar_Ekhane_Monthly_Revenue_Bar_Dekhay */}
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

                  {/* #Expense_Bar_Ekhane_Monthly_Expense_Bar_Dekhay */}
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

                  {/* #NetProfit_Bar_Ekhane_Monthly_Net_Profit_Ba_Loss_Bar_Dekhay */}
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

                {/* #Month_Label_Ekhane_Graph_Er_Niche_Month_Name_Dekhay */}
                <div style={barLabelStyle}>{row.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* #Audit_Log_Section_Ekhane_Financial_Change_Log_Dekhay */}
      <div style={cardStyle}>
        {/* #Audit_Title_Ekhane_Audit_Log_Title_Dekhay */}
        <h3 style={titleStyle}>Financial Audit Logs</h3>

        {/* #Audit_Table_Ekhane_Audit_Log_Table_Start_Hoy */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Action</th>
              <th style={thTdStyle}>Table</th>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>Date</th>
            </tr>
          </thead>

          {/* #Audit_Table_Body_Ekhane_Audit_Log_Data_Map_Kora_Hoy */}
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

// #Export_Component_Ekhane_Component_App_JS_E_Use_Korar_Jonno_Export_Kora_Hoy
export default FinanceDecisionSupport;