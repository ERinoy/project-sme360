// src/pages/TransactionsPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar          from '../components/layout/Navbar';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import API             from '../api/axios';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [showForm,     setShowForm]     = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await API.get('/transactions');
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Sales Transactions
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
              Record and manage all sales
            </p>
          </div>
          <button
            onClick={() => setShowForm(f => !f)}
            style={{
              background:   showForm ? 'var(--bg-hover)' : 'var(--accent)',
              border:       'none',
              borderRadius: 'var(--radius-sm)',
              color:        '#fff',
              padding:      '10px 20px',
              fontWeight:   600,
              cursor:       'pointer',
              fontSize:     '0.9rem',
              transition:   'var(--transition)',
              boxShadow:    showForm ? 'none' : '0 0 16px rgba(99,102,241,0.3)'
            }}
          >
            {showForm ? '✕ Cancel' : '+ New Transaction'}
          </button>
        </div>

        {showForm && (
          <div style={{ marginBottom: '1.5rem' }}>
            <TransactionForm onSuccess={() => { setShowForm(false); fetchTransactions(); }} />
          </div>
        )}

        <TransactionList transactions={transactions} loading={loading} />
      </main>
    </div>
  );
}