// src/components/dashboard/KPICard.jsx

import React from 'react';

export default function KPICard({ title, value, subtitle, icon, color, trend }) {
  const colorMap = {
    indigo:  { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.25)',  text: '#818cf8' },
    green:   { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)',  text: '#34d399' },
    red:     { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.25)',   text: '#f87171' },
    amber:   { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)',  text: '#fbbf24' },
    blue:    { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  text: '#60a5fa' }
  };
  const c = colorMap[color] || colorMap.indigo;

  return (
    <div style={{
      background:    'var(--bg-card)',
      border:        `1px solid ${c.border}`,
      borderRadius:  'var(--radius)',
      padding:       '1.4rem',
      position:      'relative',
      overflow:      'hidden',
      transition:    'var(--transition)',
      cursor:        'default'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Background glow */}
      <div style={{
        position:   'absolute', top: 0, right: 0,
        width: '80px', height: '80px',
        background: `radial-gradient(circle, ${c.bg} 0%, transparent 70%)`,
        borderRadius: '0 var(--radius) 0 0'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            {title}
          </p>
          <p style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-primary)',
            lineHeight: 1.2 }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>
              {subtitle}
            </p>
          )}
          {trend !== undefined && (
            <div style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '4px',
              marginTop:    '8px',
              padding:      '3px 8px',
              borderRadius: '20px',
              fontSize:     '0.78rem',
              fontWeight:   600,
              background:   trend >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              color:        trend >= 0 ? 'var(--success)' : 'var(--danger)'
            }}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
        <div style={{
          width:        '44px', height: '44px',
          borderRadius: '10px',
          background:   c.bg,
          border:       `1px solid ${c.border}`,
          display:      'flex', alignItems: 'center', justifyContent: 'center',
          fontSize:     '1.3rem', flexShrink: 0
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}