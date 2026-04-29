import React, { useEffect, useState } from 'react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api/audit')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setLogs(data);
                } else {
                    console.error("Audit logs API error:", data);
                    setLogs([]);
                }
            })
            .catch(err => {
                console.error("Audit Logs Error:", err);
                setLogs([]);
            });
    }, []);

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{ color: '#1a1a2e' }}>
                Feature 25: Audit Logs of Financial Changes
            </h2>

            {logs.length === 0 ? (
                <p style={{ color: '#666' }}>No audit logs available.</p>
            ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            style={{
                                padding: '14px',
                                border: '1px solid #eee',
                                borderRadius: '10px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <strong>{log.action_type}</strong>
                            <p style={{ margin: '6px 0' }}>
                                <strong>Module:</strong> {log.table_name}
                            </p>
                            <p style={{ margin: '6px 0' }}>
                                <strong>Description:</strong> {log.description}
                            </p>
                            <p style={{ margin: '6px 0', color: '#666' }}>
                                <strong>Date:</strong> {new Date(log.action_date).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuditLogs;