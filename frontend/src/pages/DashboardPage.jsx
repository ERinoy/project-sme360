// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar           from '../components/layout/Navbar';
import KPICard          from '../components/dashboard/KPICard';
import RevenueChart     from '../components/dashboard/RevenueChart';
import ExpensePieChart  from '../components/dashboard/ExpensePieChart';
import TopProductsChart from '../components/dashboard/TopProductsChart';
import TrendAlert       from '../components/dashboard/TrendAlert';
import API              from '../api/axios';

const fmt = (n) => '৳ ' + (parseFloat(n) || 0).toLocaleString('en-BD', {
  minimumFractionDigits: 0, maximumFractionDigits: 0
});

export default function DashboardPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  const now   = new Date();
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await API.get('/dashboard/kpis');
        setData(res.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 'calc(100vh - 64px)', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          width: '40px', height: '40px', border: '3px solid var(--border)',
          borderTop: '3px solid var(--accent)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 'calc(100vh - 64px)' }}>
        <p style={{ color: 'var(--danger)' }}>{error}</p>
      </div>
    </div>
  );

  const kpis   = data?.kpis   || {};
  const trend  = data?.trend  || {};
  const charts = data?.charts || {};

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Business Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
            {MONTHS[now.getMonth()]} {now.getFullYear()} — Overview
          </p>
        </div>

        {/* Trend Alert */}
        <div style={{ marginBottom: '1.5rem' }}>
          <TrendAlert trend={trend} />
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <KPICard
            title="Total Revenue"
            value={fmt(kpis.total_revenue)}
            icon="💰"
            color="indigo"
            trend={trend.change_percent}
          />
          <KPICard
            title="Gross Profit"
            value={fmt(kpis.gross_profit)}
            subtitle={`COGS: ${fmt(kpis.total_cogs)}`}
            icon="📈"
            color="green"
          />
          <KPICard
            title="Total Expenses"
            value={fmt(kpis.total_expenses)}
            icon="💸"
            color="amber"
          />
          <KPICard
            title="Net Profit"
            value={fmt(kpis.net_profit)}
            icon={kpis.net_profit >= 0 ? '✅' : '🔴'}
            color={kpis.net_profit >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* Charts Row 1 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <RevenueChart    data={charts.revenue_trend} />
          <ExpensePieChart data={charts.expense_categories} />
        </div>

        {/* Charts Row 2 */}
        <div style={{ marginBottom: '1rem' }}>
          <TopProductsChart data={charts.top_products} />
        </div>

        {/* Month Comparison Table */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '1.4rem'
        }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: 600,
            fontSize: '1rem', marginBottom: '1.2rem' }}>
            Month-over-Month Comparison
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Metric', 'Previous Month', 'Current Month', 'Change'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left',
                      color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem',
                      textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Revenue',
                    prev: trend.previous_month?.revenue,
                    curr: trend.current_month?.revenue }
                ].map(row => {
                  const change = ((row.curr - row.prev) / (row.prev || 1)) * 100;
                  return (
                    <tr key={row.metric} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)',
                        fontWeight: 500 }}>{row.metric}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>
                        {fmt(row.prev)}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>
                        {fmt(row.curr)}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem',
                          fontWeight: 600,
                          background: change >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                          color:      change >= 0 ? 'var(--success)' : 'var(--danger)'
                        }}>
                          {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}