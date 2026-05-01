import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState([]);
    const [trends, setTrends] = useState([]);
    const [strategy, setStrategy] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const resAn = await axios.get('http://localhost:5000/api/finance/analytics');
                const resTr = await axios.get('http://localhost:5000/api/finance/trends');
                const resSt = await axios.get('http://localhost:5000/api/finance/strategy');
                setAnalytics(resAn.data);
                setTrends(resTr.data);
                setStrategy(resSt.data);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }
        };
        loadData();
    }, []);

    return (
        <div style={{ padding: '30px', background: '#0b0e14', color: '#ecf0f1', minHeight: '100vh' }}>
            <h1 style={{ color: '#00d2ff' }}>Scentorium Strategic Command Center</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: '#1c1f26', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #00d2ff' }}>
                    <h3>Feature 17: 15% Growth Forecast</h3>
                    <h2>৳{strategy.forecast15 ? Math.round(strategy.forecast15) : 0}</h2>
                </div>
                <div style={{ background: '#1c1f26', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #e74c3c' }}>
                    <h3>Feature 22: 30% Strategic Goal</h3>
                    <h2>৳{strategy.strategicGoal ? Math.round(strategy.strategicGoal) : 0}</h2>
                </div>
            </div>

            <div style={{ background: '#1c1f26', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                <h3>Feature 11: Revenue vs Expense Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50"/>
                        <XAxis dataKey="month" stroke="#bdc3c7"/>
                        <YAxis stroke="#bdc3c7"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="revenue" stroke="#00d2ff" strokeWidth={3}/>
                        <Line type="monotone" dataKey="expenses" stroke="#e74c3c" strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ background: '#1c1f26', padding: '20px', borderRadius: '10px' }}>
                <h3>Feature 13: Per-Product Profit Margin</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics}>
                        <XAxis dataKey="name" stroke="#bdc3c7"/>
                        <YAxis stroke="#bdc3c7"/>
                        <Tooltip/>
                        <Bar dataKey="profit_margin" fill="#00d2ff" radius={[5, 5, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
