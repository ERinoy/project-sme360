import React, { useEffect, useState } from 'react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api/audit-logs')
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
            <h2 style={{ color: '#1a1a2e' }}>Audit Logs</h2>

            {logs.length === 0 ? (
                <p style={{ color: '#666' }}>No audit logs available.</p>
            ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                    {logs.map((log, index) => (
                        <div
                            key={log.id || index}
                            style={{
                                padding: '12px',
                                border: '1px solid #eee',
                                borderRadius: '10px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <strong>{log.action || 'Action'}</strong>
                            <div>User: {log.user_name || log.user || 'N/A'}</div>
                            <div>Details: {log.details || log.description || 'N/A'}</div>
                            <div>
                                Date: {log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuditLogs;