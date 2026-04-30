import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceReport = () => {
    const [stats, setStats] = useState({ revenue: 0, expenses: 0, netProfit: 0 });

    useEffect(() => {
        // This calls the "Finance Controller" logic you wrote in the backend
        axios.get('http://localhost:5000/api/finance/dashboard/stats')
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h2>Financial Overview (Rashedeen's Module)</h2>
            <p>Total Revenue: ${stats.revenue}</p>
            <p>Total Expenses: ${stats.expenses}</p>
            <h3 style={{ color: stats.netProfit > 0 ? 'green' : 'red' }}>
                Net Profit: ${stats.netProfit}
            </h3>
        </div>
    );
};

export default FinanceReport;
