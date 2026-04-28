import React, { useEffect, useState } from 'react';

const RevenueSummary = () => {
    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    useEffect(() => {
        fetch('/api/customers/revenue/daily')
            .then(res => res.json())
            .then(data => setDailyRevenue(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error('Daily revenue error:', err);
                setDailyRevenue([]);
            });

        fetch('/api/customers/revenue/monthly')
            .then(res => res.json())
            .then(data => setMonthlyRevenue(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error('Monthly revenue error:', err);
                setMonthlyRevenue([]);
            });
    }, []);

    return (
        <div>
            <h2>Feature 5: Daily & Monthly Revenue</h2>

            <h3>Daily Revenue</h3>
            {dailyRevenue.map((item, index) => (
                <p key={index}>
                    {new Date(item.date).toLocaleDateString()} — ৳{item.total_revenue}
                </p>
            ))}

            <h3>Monthly Revenue</h3>
            {monthlyRevenue.map((item, index) => (
                <p key={index}>
                    {item.month} — ৳{item.total_revenue}
                </p>
            ))}
        </div>
    );
};

export default RevenueSummary;