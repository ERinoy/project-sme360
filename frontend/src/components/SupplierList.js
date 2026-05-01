import React, { useEffect, useState } from 'react';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/suppliers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSuppliers(data);
          setErrorMessage('');
        } else {
          console.log('Supplier API returned:', data);
          setSuppliers([]);
          setErrorMessage('Supplier data is not available right now.');
        }
      })
      .catch(err => {
        console.error('Supplier List Error:', err);
        setSuppliers([]);
        setErrorMessage('Could not load supplier data.');
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
          border: '1px solid #ffeeba'
        }}
      >
        <strong>Supplier Notice:</strong> {errorMessage}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#eef2f7',
          color: '#495057',
          padding: '15px',
          borderRadius: '10px'
        }}
      >
        No supplier records found.
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Primary Suppliers</h3>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Company</th>
            <th style={cellStyle}>Contact Person</th>
            <th style={cellStyle}>Phone</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td style={cellStyle}>{supplier.supplier_name || 'N/A'}</td>
              <td style={cellStyle}>{supplier.contact_person || 'N/A'}</td>
              <td style={cellStyle}>{supplier.phone || 'N/A'}</td>
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

export default SupplierList;