import React, { useEffect, useState } from 'react';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch('/api/suppliers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSuppliers(data);
                } else {
                    console.error("Suppliers API error:", data);
                    setSuppliers([]);
                }
            })
            .catch(err => {
                console.error("Supplier List Error:", err);
                setSuppliers([]);
            });
    }, []);

    return (
        <div>
            <h2 style={{ color: '#1a1a2e' }}>Primary Suppliers</h2>

            {suppliers.length === 0 ? (
                <p style={{ color: '#666' }}>No supplier data available.</p>
            ) : (
                suppliers.map((s, index) => (
                    <div key={s.id || index} style={{ marginBottom: '12px' }}>
                        <strong>{s.supplier_name || 'N/A'}</strong>
                        <div>Contact: {s.contact_person || 'N/A'}</div>
                        <div>Phone: {s.phone || 'N/A'}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SupplierList;