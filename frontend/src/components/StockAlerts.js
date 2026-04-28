import React, { useEffect, useState } from 'react';

const StockAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetch('/api/products/alerts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAlerts(data);
                } else {
                    console.error("Stock alerts API error:", data);
                    setAlerts([]);
                }
            })
            .catch(err => {
                console.error("Stock Alert Error:", err);
                setAlerts([]);
            });
    }, []);

    if (alerts.length === 0) return null;

    return (
        <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeeba', 
            padding: '25px', 
            borderRadius: '15px',
            marginBottom: '35px',
            color: '#856404',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: '6px solid #ffc107'
        }}>
            <h3>⚠️ Critical Inventory Alerts</h3>

            {alerts.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{item.product_name || 'Unnamed Product'}</strong>
                    <div>
                        Stock: {item.stock_quantity ?? 0} | Threshold: {item.min_threshold ?? 0}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StockAlerts;