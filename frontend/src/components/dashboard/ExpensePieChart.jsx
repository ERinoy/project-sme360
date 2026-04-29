// src/components/dashboard/ExpensePieChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '10px 14px'
    }}>
      <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{payload[0].name}</p>
      <p style={{ color: payload[0].payload.color || '#818cf8' }}>
        ৳ {Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
};

export default function ExpensePieChart({ data }) {
  const chartData = (data || []).map((d, i) => ({
    name:  d.category_name,
    value: parseFloat(d.total_amount) || 0,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.4rem'
    }}>
      <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
        fontSize: '1rem', marginBottom: '1.2rem' }}>
        Expenses by Category
      </h3>
      {chartData.length === 0 ? (
        <div style={{ height: '220px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--text-muted)' }}>
          No expense data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              paddingAngle={3} dataKey="value">
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="var(--bg-card)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(v) => (
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{v}</span>
            )} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}