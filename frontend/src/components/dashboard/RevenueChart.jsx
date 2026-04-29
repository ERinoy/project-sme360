// src/components/dashboard/RevenueChart.jsx

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '10px 14px'
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</p>
      <p style={{ color: '#818cf8', fontWeight: 600 }}>
        ৳ {Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
};

export default function RevenueChart({ data }) {
  const chartData = (data || []).map(d => ({
    name:    MONTH_NAMES[(d.month || 1) - 1],
    revenue: parseFloat(d.revenue) || 0
  }));

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.4rem'
    }}>
      <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
        fontSize: '1rem', marginBottom: '1.2rem' }}>
        Revenue Trend — Last 6 Months
      </h3>
      {chartData.length === 0 ? (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--text-muted)' }}>
          No data available yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `৳${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2}
              fill="url(#revGradient)" dot={{ fill: '#6366f1', r: 4 }}
              activeDot={{ r: 6, fill: '#818cf8' }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}