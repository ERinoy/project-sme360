// src/pages/ExpensesPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar       from '../components/layout/Navbar';
import ExpenseForm  from '../components/expenses/ExpenseForm';
import ExpenseList  from '../components/expenses/ExpenseList';
import API          from '../api/axios';

export default function ExpensesPage() {
  const [expenses,  setExpenses]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [monthly,   setMonthly]   = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expRes, totalRes] = await Promise.all([
        API.get('/expenses'),
        API.get('/expenses/monthly-total')
      ]);
      setExpenses(expRes.data.expenses || []);
      setMonthly(totalRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Expenses
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
              Track and manage operational costs
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {monthly && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '8px 16px', textAlign: 'right' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>This Month</p>
                <p style={{ color: 'var(--warning)', fontWeight: 700, fontSize: '1rem' }}>
                  ৳ {parseFloat(monthly.total_expenses || 0).toLocaleString()}
                </p>
              </div>
            )}
            <button
              onClick={() => setShowForm(f => !f)}
              style={{
                background:   showForm ? 'var(--bg-hover)' : 'var(--accent)',
                border:       'none', borderRadius: 'var(--radius-sm)',
                color:        '#d41a1a', padding: '10px 20px', fontWeight: 600,
                cursor:       'pointer', fontSize: '0.9rem', transition: 'var(--transition)',
                boxShadow:    showForm ? 'none' : '0 0 16px rgba(99,102,241,0.3)'
              }}>
              {showForm ? '✕ Cancel' : '+ Add Expense'}
            </button>
          </div>
        </div>

        {showForm && (
          <div style={{ marginBottom: '1.5rem' }}>
            <ExpenseForm onSuccess={() => { setShowForm(false); fetchData(); }} />
          </div>
        )}

        <ExpenseList expenses={expenses} loading={loading} />
      </main>
    </div>
  );
}