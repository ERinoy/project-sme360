import React, { useState } from 'react';

import StockAlerts from './components/StockAlerts';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CustomerHistory from './components/CustomerHistory';
import SupplierList from './components/SupplierList';
import AuditLogs from './components/AuditLogs';
import RevenueSummary from './components/RevenueSummary';

function App() {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="App" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '60px' }}>
      <header style={{
        backgroundColor: '#1a1a2e',
        padding: '40px 20px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.8rem', letterSpacing: '1px' }}>
          SME360 COMMAND CENTER
        </h1>
        <p style={{ opacity: 0.7, marginTop: '10px', fontSize: '1.1rem' }}>
          Integrated Decision Support System | April 2026
        </p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <section style={{ marginBottom: '30px' }}>
          <StockAlerts />
        </section>

        <section style={{
          marginBottom: '40px',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
          <RevenueSummary />
        </section>

        <section style={{
          marginBottom: '40px',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
          <AnalyticsDashboard />
        </section>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          <section style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}>
            <SupplierList />
          </section>

          <section style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ color: '#1a1a2e', marginBottom: '20px', borderBottom: '2px solid #f0f2f5', paddingBottom: '10px' }}>
              Customer Intelligence
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>
                Enter Customer ID:
              </label>
              <input
                type="number"
                value={currentId}
                onChange={(e) => setCurrentId(e.target.value)}
                style={{
                  padding: '10px',
                  width: '70px',
                  borderRadius: '8px',
                  border: '2px solid #007bff',
                  textAlign: 'center',
                  fontSize: '1rem'
                }}
              />
            </div>

            <CustomerHistory customerId={currentId} />
          </section>
        </div>

        <section style={{ marginTop: '20px' }}>
          <AuditLogs />
        </section>
      </main>

      <footer style={{ textAlign: 'center', color: '#6c757d', padding: '40px 0' }}>
        <p style={{ fontWeight: 'bold' }}>
          SME360 | BRAC University CSE470 Semester Project
        </p>
      </footer>
    </div>
  );
}

export default App;