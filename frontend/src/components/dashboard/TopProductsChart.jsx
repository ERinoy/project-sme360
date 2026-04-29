// src/components/dashboard/TopProductsChart.jsx

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#6366f1','#8b5cf6','#3b82f6','#10b981','#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '10px 14px'
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</p>
      <p style={{ color: '#818cf8', fontWeight: 600 }}>৳ {Number(payload[0].value).toLocaleString()}</p>
    </div>
  );
};

export default function TopProductsChart({ data }) {
  const chartData = (data || []).map(d => ({
    name:    d.product_name.length > 12 ? d.product_name.slice(0, 12) + '…' : d.product_name,
    revenue: parseFloat(d.total_revenue) || 0
  }));

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.4rem'
    }}>
      <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
        fontSize: '1rem', marginBottom: '1.2rem' }}>
        Top Products by Revenue
      </h3>
      {chartData.length === 0 ? (
        <div style={{ height: '220px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--text-muted)' }}>
          No sales data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false}
              tickLine={false} tickFormatter={v => `৳${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
            <Bar dataKey="revenue" radius={[6,6,0,0]}>
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}