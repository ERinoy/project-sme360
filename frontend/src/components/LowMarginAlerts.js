import React, { useEffect, useState } from 'react';

const LowMarginAlerts = () => {
  const [lowMargins, setLowMargins] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/customers/alerts/low-margins')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLowMargins(data);
          setErrorMessage('');
        } else {
          console.log('Low margin API returned:', data);
          setLowMargins([]);
          setErrorMessage('Low margin data is not available right now.');
        }
      })
      .catch(err => {
        console.error('Margin Alert Error:', err);
        setLowMargins([]);
        setErrorMessage('Could not load low margin alerts.');
      });
  }, []);

  if (errorMessage) {
    return (
      <div
        style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '15px',
          borderRadius: '10px',
          marginBottom: '15px',
          border: '1px solid #ffeeba'
        }}
      >
        <strong>Low Margin Alert:</strong> {errorMessage}
      </div>
    );
  }

  if (lowMargins.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#fff5f5',
        color: '#721c24',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '15px',
        border: '1px solid #f5c6cb'
      }}
    >
      <h3 style={{ marginTop: 0 }}>Low Margin Sales Detected</h3>
      <p>The following transactions are below the 15% profit margin threshold:</p>

      <ul>
        {lowMargins.map((sale) => (
          <li key={sale.id}>
            Sale #{sale.id} - {sale.customer_name} Margin:{' '}
            {Number(sale.margin_percentage || 0).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowMarginAlerts;