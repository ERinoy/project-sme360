// src/components/dashboard/TrendAlert.jsx

import React from 'react';

export default function TrendAlert({ trend }) {
  if (!trend) return null;

  const isDecline  = trend.trend_direction === 'DECLINING';
  const isGrowing  = trend.trend_direction === 'GROWING';
  const changeAbs  = Math.abs(trend.change_percent || 0).toFixed(1);

  const config = isDecline
    ? { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)',
        icon: '⚠️', color: 'var(--danger)',
        title: `Sales Declining — ${changeAbs}% drop from last month`,
        msg: trend.alert?.message }
    : isGrowing
    ? { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)',
        icon: '📈', color: 'var(--success)',
        title: `Sales Growing — up ${changeAbs}% from last month`,
        msg: 'Great performance! Revenue is trending upward.' }
    : { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)',
        icon: '📊', color: 'var(--info)',
        title: 'Sales Stable',
        msg: 'No significant change compared to last month.' };

  return (
    <div style={{
      background:   config.bg,
      border:       `1px solid ${config.border}`,
      borderRadius: 'var(--radius)',
      padding:      '1rem 1.4rem',
      display:      'flex',
      alignItems:   'flex-start',
      gap:          '12px'
    }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{config.icon}</span>
      <div>
        <p style={{ color: config.color, fontWeight: 600, fontSize: '0.95rem' }}>
          {config.title}
        </p>
        {config.msg && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            {config.msg}
          </p>
        )}
      </div>
    </div>
  );
}