import React, { useEffect, useState } from 'react';

const CustomerHistory = ({ customerId }) => {
    const [history, setHistory] = useState([]);
    const [customerName, setCustomerName] = useState('Unknown Customer');

    useEffect(() => {
        if (!customerId) return;

        fetch(`/api/customers/${customerId}/history`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setHistory(data);

                    if (data.length > 0 && data[0]?.customer_name) {
                        setCustomerName(data[0].customer_name);
                    } else {
                        setCustomerName('No customer found');
                    }
                } else {
                    console.error("Customer history API error:", data);
                    setHistory([]);
                    setCustomerName('No customer found');
                }
            })
            .catch(err => {
                console.error("Customer History Error:", err);
                setHistory([]);
                setCustomerName('No customer found');
            });
    }, [customerId]);

    return (
        <div>
            <h3 style={{ color: '#1a1a2e' }}>
                Customer: {customerName}
            </h3>

            {history.length === 0 ? (
                <p style={{ color: '#666' }}>
                    No purchase history available for this customer.
                </p>
            ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                    {history.map((item, index) => (
                        <div 
                            key={item.id || index}
                            style={{
                                padding: '12px',
                                border: '1px solid #eee',
                                borderRadius: '10px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <strong>{item.product_name || 'Product'}</strong>
                            <div>Amount: ৳{item.total_amount || item.amount || 0}</div>
                            <div>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerHistory;