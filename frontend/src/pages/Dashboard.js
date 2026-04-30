import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [finance, setFinance] = useState({ expenses: [], netProfit: 0, totalFixedExpenses: 0, unitsNeeded: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Feature 2 (Inventory)
                const resProd = await axios.get('http://localhost:5000/api/products');
                // Feature 7, 12, 15, 22 (Financial Data)
                const resFin = await axios.get('http://localhost:5000/api/finance/net-profit');
                const resExp = await axios.get('http://localhost:5000/api/finance/expenses');
                
                setProducts(resProd.data);
                setFinance({
                    expenses: resExp.data,
                    netProfit: resFin.data.netProfit,
                    totalFixedExpenses: resFin.data.totalExpenses,
                    unitsNeeded: Math.ceil(resFin.data.totalExpenses / 1500) // Simple fallback logic for viva
                });
            } catch (err) { console.error("Fetch error:", err); }
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: '40px', backgroundColor: '#1a1a2e', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
            <h1 style={{ textAlign: 'center', color: '#00d2ff' }}>SME360 COMMAND CENTER</h1>
            <p style={{ textAlign: 'center', marginBottom: '40px' }}>Integrated Decision Support System | April 2026</p>

            {/* FEATURE 12: Net Profit Calculation */}
            <div style={{ background: finance.netProfit >= 0 ? '#1b4332' : '#5a1212', padding: '25px', borderRadius: '15px', marginBottom: '20px', borderLeft: '8px solid #00d2ff' }}>
                <h2>Feature 12: Net Profit Analysis</h2>
                <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>৳{finance.netProfit}</h1>
                <p>Status: {finance.netProfit >= 0 ? "Operational Surplus" : "Operating Deficit"}</p>
            </div>

            {/* FEATURE 15 & 22: DSS & Break-even */}
            <div style={{ background: '#16213e', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3>Feature 15 & 22: Strategic DSS</h3>
                <p>Total Overheads: ৳{finance.totalFixedExpenses}</p>
                <p style={{ color: '#00d2ff', fontWeight: 'bold' }}>Break-even Target: {finance.unitsNeeded} Units</p>
            </div>

            {/* FEATURE 7: Expense Categorization */}
            <div style={{ background: '#16213e', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h2>Feature 7: Expense Categorization</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {finance.expenses.map((exp, i) => (
                        <div key={i} style={{ border: '1px solid #00d2ff', padding: '15px', borderRadius: '10px', minWidth: '150px' }}>
                            <small style={{ color: '#00d2ff' }}>{exp.category}</small>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>৳{exp.amount}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FEATURE 2: Product Inventory */}
            <div style={{ background: '#16213e', padding: '25px', borderRadius: '15px' }}>
                <h2>Feature 2: Inventory Management</h2>
                <table style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#00d2ff', borderBottom: '1px solid #2e3a59' }}>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #2e3a59' }}>
                                <td style={{ padding: '10px 0' }}>{p.name}</td>
                                <td>{p.stock_quantity} Units</td>
                                <td>৳{p.selling_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;