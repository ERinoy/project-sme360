// src/components/transactions/TransactionForm.jsx

import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

const inputStyle = {
  width:        '100%',
  padding:      '10px 14px',
  background:   'var(--bg-primary)',
  border:       '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color:        'var(--text-primary)',
  fontSize:     '0.9rem',
  outline:      'none',
  transition:   'var(--transition)'
};

const labelStyle = {
  display:      'block',
  fontSize:     '0.82rem',
  fontWeight:   500,
  color:        'var(--text-secondary)',
  marginBottom: '6px'
};

export default function TransactionForm({ onSuccess }) {
  const [products,  setProducts]  = useState([]);
  const [form,      setForm]      = useState({ product_id: '', quantity: '', unit_price: '' });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState('');

  useEffect(() => {
    API.get('/transactions').then(() => {}).catch(() => {});
    // Fetch products for dropdown
    API.get('/products').catch(() => {}).then(res => {
      if (res?.data?.products) setProducts(res.data.products);
    });
  }, []);

  const handleProductChange = (e) => {
    const pid = e.target.value;
    const prod = products.find(p => p.product_id === parseInt(pid));
    setForm(f => ({ ...f, product_id: pid, unit_price: prod ? prod.selling_price : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await API.post('/transactions', {
        product_id: parseInt(form.product_id),
        quantity:   parseInt(form.quantity),
        unit_price: parseFloat(form.unit_price)
      });
      setSuccess('Transaction recorded successfully!');
      setForm({ product_id: '', quantity: '', unit_price: '' });
      setTimeout(() => { setSuccess(''); onSuccess(); }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.5rem'
    }}>
      <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
        marginBottom: '1.2rem', fontSize: '1rem' }}>New Sale</h3>

      {error   && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--danger)',
        fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--success)',
        fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Product</label>
            <select value={form.product_id} onChange={handleProductChange} required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'}>
              <option value="">Select product</option>
              {products.length > 0
                ? products.map(p => (
                    <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
                  ))
                : <option disabled>No products found</option>
              }
            </select>
          </div>

          <div>
            <label style={labelStyle}>Quantity</label>
            <input type="number" min="1" value={form.quantity} required
              onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
              placeholder="e.g. 5" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>

          <div>
            <label style={labelStyle}>Unit Price (৳)</label>
            <input type="number" min="0" step="0.01" value={form.unit_price} required
              onChange={e => setForm(f => ({ ...f, unit_price: e.target.value }))}
              placeholder="e.g. 500" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          marginTop:    '1.2rem',
          padding:      '10px 24px',
          background:   loading ? 'var(--bg-hover)' : 'var(--accent)',
          border:       'none',
          borderRadius: 'var(--radius-sm)',
          color:        '#fff',
          fontWeight:   600,
          fontSize:     '0.9rem',
          cursor:       loading ? 'not-allowed' : 'pointer',
          transition:   'var(--transition)'
        }}>
          {loading ? 'Saving...' : 'Record Sale'}
        </button>
      </form>
    </div>
  );
}