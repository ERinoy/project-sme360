// src/components/expenses/ExpenseList.jsx

import React from 'react';

const CATEGORY_COLORS = {
  'Rent':          { bg: 'rgba(99,102,241,0.12)',  text: '#818cf8' },
  'Utilities':     { bg: 'rgba(59,130,246,0.12)',  text: '#60a5fa' },
  'Salaries':      { bg: 'rgba(16,185,129,0.12)',  text: '#34d399' },
  'Marketing':     { bg: 'rgba(245,158,11,0.12)',  text: '#fbbf24' },
  'Logistics':     { bg: 'rgba(139,92,246,0.12)',  text: '#a78bfa' },
  'Miscellaneous': { bg: 'rgba(100,116,139,0.12)', text: '#94a3b8' }
};

export default function ExpenseList({ expenses, loading }) {
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem',
      color: 'var(--text-muted)' }}>Loading expenses...</div>
  );

  if (!expenses.length) return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '3rem', textAlign: 'center',
      color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>💸</div>
      <p style={{ fontWeight: 500 }}>No expenses recorded yet</p>
      <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Add your first expense above</p>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              {['#', 'Title', 'Category', 'Amount', 'Date'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left',
                  color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem',
                  textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, i) => {
              const clr = CATEGORY_COLORS[e.category_name] || CATEGORY_COLORS['Miscellaneous'];
              return (
                <tr key={e.expense_id}
                  style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}
                  onMouseEnter={el => el.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={el => el.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {e.title}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: clr.bg, color: clr.text,
                      padding: '3px 10px', borderRadius: '20px',
                      fontSize: '0.78rem', fontWeight: 500 }}>
                      {e.category_name}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--warning)', fontWeight: 600 }}>
                    ৳ {parseFloat(e.amount).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(e.expense_date).toLocaleDateString('en-BD')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}