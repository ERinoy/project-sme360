import React, { useEffect, useState } from 'react';

const CustomerHistory = ({ customerId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    fetch(`/api/customers/${customerId}/history`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
          setErrorMessage('');
        } else {
          console.log('Customer history API returned:', data);
          setHistory([]);
          setErrorMessage('Customer history data is not available right now.');
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
        setHistory([]);
        setErrorMessage('Could not load customer purchase history.');
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return <p>Loading transaction history...</p>;
  }

  if (errorMessage) {
    return (
      <div
        style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid #ffeeba'
        }}
      >
        <strong>Customer History Notice:</strong> {errorMessage}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#eef2f7',
          color: '#495057',
          padding: '15px',
          borderRadius: '10px'
        }}
      >
        No purchase history found for this customer.
      </div>
    );
  }

  return (
    <div>
      <h3>Purchase History: {history[0]?.customer_name || 'Customer'}</h3>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Sale ID</th>
            <th style={cellStyle}>Amount (BDT)</th>
            <th style={cellStyle}>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td style={cellStyle}>{item.id}</td>
              <td style={cellStyle}>৳{Number(item.amount || 0).toFixed(2)}</td>
              <td style={cellStyle}>
                {item.sale_date ? new Date(item.sale_date).toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #e5e7eb',
  padding: '10px',
  textAlign: 'left'
};

export default CustomerHistory;