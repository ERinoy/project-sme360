// src/components/transactions/TransactionList.jsx

import React from 'react';

export default function TransactionList({ transactions, loading }) {
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem',
      color: 'var(--text-muted)' }}>Loading transactions...</div>
  );

  if (!transactions.length) return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '3rem', textAlign: 'center',
      color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🧾</div>
      <p style={{ fontWeight: 500 }}>No transactions yet</p>
      <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Record your first sale above</p>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              {['#','Product','Category','Qty','Unit Price','Total','Date'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left',
                  color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem',
                  textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t.transaction_id}
                style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {t.product_name}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)',
                    border: '1px solid rgba(99,102,241,0.2)', padding: '2px 10px',
                    borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500 }}>
                    {t.category}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>{t.quantity}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  ৳ {parseFloat(t.unit_price).toLocaleString()}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--success)', fontWeight: 600 }}>
                  ৳ {parseFloat(t.total_amount).toLocaleString()}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem',
                  whiteSpace: 'nowrap' }}>
                  {new Date(t.transaction_date).toLocaleDateString('en-BD')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}