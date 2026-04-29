import React, { useEffect, useState } from 'react';

const HighestExpenseCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/expenses/highest-categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Expense categories API error:', data);
                    setCategories([]);
                }
            })
            .catch(err => {
                console.error('Highest Expense Categories Error:', err);
                setCategories([]);
            });
    }, []);

    return (
        <div>
            <h2 style={{ color: '#1a1a2e' }}>Feature 10: Highest Expense Categories</h2>

            {categories.length === 0 ? (
                <p style={{ color: '#666' }}>No expense category data available.</p>
            ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '14px',
                                border: '1px solid #eee',
                                borderRadius: '10px',
                                backgroundColor: '#fafafa',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <strong>{index + 1}. {item.category}</strong>
                            <span>৳{item.total_expense}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HighestExpenseCategories;