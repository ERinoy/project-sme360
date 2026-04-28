import React, { useState } from 'react';

const BreakEvenAnalysis = () => {
    const [fixedCost, setFixedCost] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [variableCost, setVariableCost] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/breakeven', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fixedCost,
                    sellingPrice,
                    variableCost
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Calculation failed');
                return;
            }

            setResult(data);
        } catch (err) {
            console.error('Break-even error:', err);
            setError('Unable to calculate break-even analysis.');
        }
    };

    return (
        <div>
            <h2 style={{ color: '#1a1a2e' }}>Feature 15: Break-even Analysis</h2>

            <form onSubmit={handleCalculate} style={{ display: 'grid', gap: '15px' }}>
                <input
                    type="number"
                    placeholder="Fixed Cost"
                    value={fixedCost}
                    onChange={(e) => setFixedCost(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                />

                <input
                    type="number"
                    placeholder="Selling Price per Unit"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                />

                <input
                    type="number"
                    placeholder="Variable Cost per Unit"
                    value={variableCost}
                    onChange={(e) => setVariableCost(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                />

                <button
                    type="submit"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#1a1a2e',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Calculate Break-even
                </button>
            </form>

            {error && (
                <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>
            )}

            {result && (
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#fafafa',
                    borderRadius: '10px',
                    border: '1px solid #eee'
                }}>
                    <p><strong>Contribution Margin:</strong> ৳{result.contributionMargin}</p>
                    <p><strong>Break-even Units:</strong> {result.breakEvenUnits} units</p>
                    <p><strong>Break-even Revenue:</strong> ৳{result.breakEvenRevenue}</p>
                </div>
            )}
        </div>
    );
};

export default BreakEvenAnalysis;