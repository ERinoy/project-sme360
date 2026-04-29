// src/components/layout/Navbar.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const styles = {
  nav: {
    background:     'var(--bg-secondary)',
    borderBottom:   '1px solid var(--border)',
    padding:        '0 2rem',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    height:         '64px',
    position:       'sticky',
    top:            0,
    zIndex:         100,
    backdropFilter: 'blur(12px)'
  },
  brand: {
    display:    'flex',
    alignItems: 'center',
    gap:        '10px',
    fontSize:   '1.1rem',
    fontWeight: 700,
    color:      'var(--text-primary)',
    textDecoration: 'none'
  },
  brandDot: {
    width:        '10px',
    height:       '10px',
    borderRadius: '50%',
    background:   'var(--accent)',
    boxShadow:    '0 0 8px var(--accent)'
  },
  links: {
    display:    'flex',
    alignItems: 'center',
    gap:        '0.5rem'
  },
  userInfo: {
    display:    'flex',
    alignItems: 'center',
    gap:        '1rem'
  },
  badge: {
    background:   'var(--accent-glow)',
    border:       '1px solid var(--accent)',
    color:        'var(--accent-light)',
    padding:      '3px 10px',
    borderRadius: '20px',
    fontSize:     '0.75rem',
    fontWeight:   600,
    textTransform:'uppercase'
  },
  logoutBtn: {
    background:   'transparent',
    border:       '1px solid var(--border)',
    color:        'var(--text-secondary)',
    padding:      '6px 14px',
    borderRadius: 'var(--radius-sm)',
    cursor:       'pointer',
    fontSize:     '0.85rem',
    transition:   'var(--transition)'
  }
};

const navLinkStyle = ({ isActive }) => ({
  textDecoration: 'none',
  padding:        '6px 14px',
  borderRadius:   'var(--radius-sm)',
  fontSize:       '0.9rem',
  fontWeight:     500,
  color:          isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
  background:     isActive ? 'var(--accent-glow)'  : 'transparent',
  border:         isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
  transition:     'var(--transition)'
});

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.brand}>
        <div style={styles.brandDot} />
        SME Analytics
      </NavLink>

      <div style={styles.links}>
        <NavLink to="/"             style={navLinkStyle} end>Dashboard</NavLink>
        <NavLink to="/transactions" style={navLinkStyle}>Transactions</NavLink>
        <NavLink to="/expenses"     style={navLinkStyle}>Expenses</NavLink>
      </div>

      <div style={styles.userInfo}>
        <span style={styles.badge}>{user?.role}</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {user?.username}
        </span>
        <button
          style={{ ...styles.logoutBtn,
            ...(hoverLogout ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : {})
          }}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}