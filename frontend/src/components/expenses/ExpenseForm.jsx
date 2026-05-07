// src/components/expenses/ExpenseForm.jsx

import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: 'var(--bg-primary)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
  fontSize: '0.9rem', outline: 'none', transition: 'var(--transition)'
};
const labelStyle = {
  display: 'block', fontSize: '0.82rem', fontWeight: 500,
  color: 'var(--text-secondary)', marginBottom: '6px'
};

export default function ExpenseForm({ onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [form,       setForm]       = useState({ title: '', amount: '', category_id: '', expense_date: '' });
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState('');
  const [categoriesError, setCategoriesError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/expenses/categories');
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error('Fetch expense categories error:', err);
        setCategoriesError(err.response?.data?.message || 'Unable to load expense categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim() || !form.amount || !form.category_id || !form.expense_date) {
      setError('Please fill in all expense fields before submitting.');
      return;
    }

    const amountValue = parseFloat(form.amount);
    const categoryValue = parseInt(form.category_id, 10);

    if (Number.isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (Number.isNaN(categoryValue)) {
      setError('Please select a valid expense category.');
      return;
    }

    setLoading(true);
    try {
      await API.post('/expenses', {
        title:        form.title,
        amount:       amountValue,
        category_id:  categoryValue,
        expense_date: form.expense_date
      });
      setSuccess('Expense recorded successfully!');
      setForm({ title: '', amount: '', category_id: '', expense_date: '' });
      setTimeout(() => { setSuccess(''); onSuccess(); }, 1200);
    } catch (err) {
      console.error('Create expense error:', err);
      setError(err.response?.data?.message || 'Failed to record expense.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.5rem' }}>
      <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
        marginBottom: '1.2rem', fontSize: '1rem' }}>New Expense</h3>

      {error   && <div style={{ background: 'rgba(255, 55, 55, 0.1)', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--danger)',
        fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
      {categoriesError && <div style={{ background: 'rgba(255, 55, 55, 0.1)', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--danger)',
        fontSize: '0.85rem', marginBottom: '1rem' }}>{categoriesError}</div>}
      {success && <div style={{ background: 'rgba(7, 77, 54, 0.1)', border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--success)',
        fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Description</label>
            <input type="text" value={form.title} required
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Office Rent - April" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={labelStyle}>Amount (৳)</label>
            <input type="number" min="0" step="0.01" value={form.amount} required
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              placeholder="e.g. 15000" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
              required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'}>
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" value={form.expense_date} required
              onChange={e => setForm(f => ({ ...f, expense_date: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          marginTop: '1.2rem', padding: '10px 24px',
          background: loading ? 'var(--bg-hover)' : 'var(--accent)',
          border: 'none', borderRadius: 'var(--radius-sm)', color: '#a14d4d',
          fontWeight: 600, fontSize: '0.9rem',
          cursor: loading ? 'not-allowed' : 'pointer', transition: 'var(--transition)'
        }}>
          {loading ? 'Saving...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}