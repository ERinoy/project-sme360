import React, { useState, useEffect } from 'react';

// Core Components
import Login from './components/Login';
import StockAlerts from './components/StockAlerts';
import LowMarginAlerts from './components/LowMarginAlerts';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CustomerHistory from './components/CustomerHistory';
import SupplierList from './components/SupplierList';
import AuditLogs from './components/AuditLogs';
import FinanceDecisionSupport from './components/FinanceDecisionSupport';

function App() {
  // State for Authentication
  const [user, setUser] = useState(null);

  // State for Customer Intelligence Feature
  const [currentId, setCurrentId] = useState(1);
  const [maxId, setMaxId] = useState(1);

  // Fetch the valid ID range only when a user is logged in
  useEffect(() => {
    if (user) {
      fetch('/api/customers/meta/max-id')
        .then(res => res.json())
        .then(data => setMaxId(data.maxId || 1))
        .catch(err => console.error('Error fetching ID limits:', err));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setCurrentId(1);
  };

  // --- GATEKEEPER: AUTHENTICATION CHECK ---
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: '#f4f7f6',
        minHeight: '100vh',
        paddingBottom: '60px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      {/* GLOBAL HEADER */}
      <header
        style={{
          backgroundColor: '#1a1a2e',
          padding: '20px 40px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '1px' }}>
            SME360 COMMAND CENTER
          </h1>
          <p style={{ margin: 0, opacity: 0.7, fontSize: '0.8rem' }}>
            Integrated Decision Support System
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontWeight: '500' }}>
            👤 {(user.username || 'USER').toUpperCase()}
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 18px',
              backgroundColor: '#d9534f',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1300px', margin: '40px auto', padding: '0 20px' }}>
        {/* SECTION 1: PROACTIVE ALERTS */}
        <section style={{ marginBottom: '30px' }}>
          <StockAlerts />
          <LowMarginAlerts />
        </section>

        {/* SECTION 2: BUSINESS ANALYTICS */}
        <section
          style={{
            marginBottom: '40px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <h2
            style={{
              color: '#1a1a2e',
              marginTop: 0,
              borderBottom: '2px solid #f4f7f6',
              paddingBottom: '10px'
            }}
          >
            📊 Performance Analytics
          </h2>

          <AnalyticsDashboard />
        </section>

        {/* SECTION 3: SADAB FINANCE DECISION SUPPORT FEATURES */}
        <section
          style={{
            marginBottom: '40px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <FinanceDecisionSupport />
        </section>

        {/* SECTION 4: MANAGEMENT GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(550px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}
        >
          {/* Supplier Management */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <h2 style={{ color: '#1a1a2e', marginTop: 0 }}>🚚 Supplier Network</h2>
            <SupplierList />
          </section>

          {/* Customer Intelligence */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <h2 style={{ color: '#1a1a2e', marginTop: 0 }}>👥 Customer Intelligence</h2>

            <div
              style={{
                backgroundColor: '#eef2f7',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <label style={{ fontWeight: 'bold', color: '#495057' }}>
                  Select Customer ID:
                </label>

                <input
                  type="number"
                  min="1"
                  max={maxId}
                  value={currentId}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);

                    if (val >= 1 && val <= maxId) {
                      setCurrentId(val);
                    }
                  }}
                  style={{
                    marginLeft: '15px',
                    padding: '8px',
                    width: '80px',
                    borderRadius: '5px',
                    border: '2px solid #007bff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                />
              </div>

              <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                Valid Range: <strong>1 - {maxId}</strong>
              </span>
            </div>

            <CustomerHistory customerId={currentId} />
          </section>
        </div>

        {/* SECTION 5: SECURITY & AUDIT */}
        <section style={{ marginTop: '20px' }}>
          <AuditLogs />
        </section>
      </main>

      <footer
        style={{
          textAlign: 'center',
          color: '#adb5bd',
          padding: '40px 0',
          borderTop: '1px solid #dee2e6',
          margin: '0 40px'
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>SME360 | BRAC UNIVERSITY CSE470</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem' }}>
          Automated Decision Support System • Stable Build v1.0
        </p>
      </footer>
    </div>
  );
}

export default App;