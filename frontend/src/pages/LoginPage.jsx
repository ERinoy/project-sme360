// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import { useAuth }         from '../context/AuthContext';
import API                 from '../api/axios';
import logo                from '../logo_sme360.svg';

export default function LoginPage() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      background:      'var(--bg-primary)',
      padding:         '1rem'
    }}>
      {/* Background glow */}
      <div style={{
        position:     'fixed',
        top:          '20%',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        '600px',
        height:       '300px',
        background:   'radial-gradient(ellipse, rgba(156, 158, 245, 0.12) 0%, transparent 70%)',
        pointerEvents:'none'
      }} />

      <div style={{
        background:   'var(--bg-secondary)',
        border:       '1px solid var(--border)',
        borderRadius: '16px',
        padding:      '2.5rem',
        width:        '100%',
        maxWidth:     '420px',
        boxShadow:    'var(--shadow)',
        position:     'relative'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width:        '52px',
            height:       '52px',
            borderRadius: '14px',
            overflow:     'hidden',
            display:      'flex',
            alignItems:   'center',
            justifyContent:'center',
            margin:       '0 auto 1rem',
            boxShadow:    '0 0 20px rgba(99,102,241,0.4)'
          }}>
            <img src={logo} alt="SME 360 logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 550, fontFamily: '"Trebuchet MS", sans-serif', color: '#0c22e7e7' }}>
            SME 360
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0rem',color: '#77687de7' , marginTop: '4px' }}>
            Enterprise Business Solution
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background:   'rgba(239,68,68,0.1)',
              border:       '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-sm)',
              padding:      '10px 14px',
              color:        'var(--danger)',
              fontSize:     '0.85rem',
              marginBottom: '1.2rem'
            }}>{error}</div>
          )}

          {[
            { label: 'Email', name: 'email', type: 'email',    placeholder: 'you@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
          ].map(field => (
            <div key={field.name} style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display:      'block',
                fontSize:     '0.85rem',
                fontWeight:   500,
                color:        'var(--text-secondary)',
                marginBottom: '6px'
              }}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  width:        '100%',
                  padding:      '10px 14px',
                  background:   'var(--bg-primary)',
                  border:       '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  color:        'var(--text-primary)',
                  fontSize:     '0.95rem',
                  outline:      'none',
                  transition:   'var(--transition)'
                }}
                onFocus={e  => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e   => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width:        '100%',
              padding:      '11px',
              background:   loading ? 'var(--bg-hover)' : 'var(--accent)',
              border:       'none',
              borderRadius: 'var(--radius-sm)',
              color:        '#257f4f',
              fontWeight:   600,
              fontSize:     '0.95rem',
              cursor:       loading ? 'not-allowed' : 'pointer',
              transition:   'var(--transition)',
              boxShadow:    loading ? 'none' : '0 0 16px rgba(99,102,241,0.35)'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}