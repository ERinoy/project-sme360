import React, { useEffect, useState } from 'react';

const MonthlyPerformanceSummary = () => {
    const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        fetch('/api/performance/monthly-summary')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSummaries(data);
                } else {
                    console.error('Monthly performance API error:', data);
                    setSummaries([]);
                }
            })
            .catch(err => {
                console.error('Monthly Performance Summary Error:', err);
                setSummaries([]);
            });
    }, []);

    return (
        <div>
            <h2 style={{ color: '#1a1a2e' }}>Feature 20: Monthly Performance Summary</h2>

            {summaries.length === 0 ? (
                <p style={{ color: '#666' }}>No monthly performance data available.</p>
            ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                    {summaries.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '16px',
                                border: '1px solid #eee',
                                borderRadius: '12px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <h3 style={{ marginTop: 0 }}>{item.month}</h3>
                            <p><strong>Total Revenue:</strong> ৳{item.total_revenue}</p>
                            <p><strong>Total Expenses:</strong> ৳{item.total_expenses}</p>
                            <p><strong>Net Profit:</strong> ৳{item.net_profit}</p>
                            <p><strong>Total Sales:</strong> {item.total_sales}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MonthlyPerformanceSummary;