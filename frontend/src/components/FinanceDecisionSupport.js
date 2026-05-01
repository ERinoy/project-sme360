import React, { useEffect, useState } from 'react';

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  border: '1px solid #e5e7eb'
};

const titleStyle = {
  marginBottom: '12px',
  color: '#1f2937'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px'
};

const thTdStyle = {
  border: '1px solid #e5e7eb',
  padding: '10px',
  textAlign: 'left'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  width: '100%',
  marginTop: '5px'
};

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

const FinanceDecisionSupport = () => {
  const [revenue, setRevenue] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [breakEven, setBreakEven] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [manualBreakEvenForm, setManualBreakEvenForm] = useState({
    fixedCost: '',
    sellingPricePerUnit: '',
    variableCostPerUnit: ''
  });

  const [manualBreakEvenResult, setManualBreakEvenResult] = useState(null);
  const [manualBreakEvenError, setManualBreakEvenError] = useState('');

  const formatMoney = (value) => {
    const numberValue = Number(value || 0);
    return `BDT ${numberValue.toFixed(2)}`;
  };

  const formatDate = (value) => {
    if (!value) {
      return 'N/A';
    }

    return String(value).slice(0, 10);
  };

  useEffect(() => {
    Promise.all([
      fetch('/api/finance/revenue-summary').then(res => res.json()),
      fetch('/api/finance/top-expense-categories').then(res => res.json()),
      fetch('/api/finance/break-even').then(res => res.json()),
      fetch('/api/finance/monthly-summary').then(res => res.json()),
      fetch('/api/finance/audit-logs').then(res => res.json())
    ])
      .then(([revenueData, expenseData, breakEvenData, monthlyData, auditData]) => {
        setRevenue(revenueData);
        setExpenses(Array.isArray(expenseData) ? expenseData : []);
        setBreakEven(breakEvenData);
        setMonthlySummary(Array.isArray(monthlyData) ? monthlyData : []);
        setAuditLogs(Array.isArray(auditData) ? auditData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Finance dashboard error:', err);
        setLoading(false);
      });
  }, []);

  const handleManualBreakEvenChange = (event) => {
    const { name, value } = event.target;

    setManualBreakEvenForm({
      ...manualBreakEvenForm,
      [name]: value
    });
  };

  const handleManualBreakEvenSubmit = (event) => {
    event.preventDefault();

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
          setManualBreakEvenError(data.error);
          setManualBreakEvenResult(null);
        } else {
          setManualBreakEvenResult(data);
          setManualBreakEvenError('');
        }
      })
      .catch(err => {
        console.error('Manual break-even error:', err);
        setManualBreakEvenError('Could not calculate break-even analysis.');
        setManualBreakEvenResult(null);
      });
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <h2>Finance Decision Support</h2>
        <p>Loading Sadab finance features...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ color: '#111827' }}>Sadab Finance Decision Support Features</h2>

      <div style={cardStyle}>
        <h3 style={titleStyle}>FR-5: Daily and Monthly Revenue</h3>

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

      <div style={cardStyle}>
        <h3 style={titleStyle}>FR-10: Highest Expense Categories</h3>
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

      <div style={cardStyle}>
        <h3 style={titleStyle}>FR-15: Break-even Analysis</h3>

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

          <form onSubmit={handleManualBreakEvenSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '15px'
              }}
            >
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

            <button type="submit" style={buttonStyle}>
              Calculate Break-even
            </button>
          </form>

          {manualBreakEvenError && (
            <p style={{ color: '#dc2626', fontWeight: 'bold' }}>
              {manualBreakEvenError}
            </p>
          )}

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

      <div style={cardStyle}>
        <h3 style={titleStyle}>FR-20: Monthly Performance Summary</h3>
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
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>FR-25: Financial Audit Logs</h3>
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