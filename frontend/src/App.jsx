import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Savings from './pages/Savings.jsx';
import Cooperative from './pages/Cooperative.jsx';
import Escrow from './pages/Escrow.jsx';
import Send from './pages/Send.jsx';

const NAV = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/savings', label: 'Savings', icon: '🌱' },
  { to: '/send', label: 'Send', icon: '💸' },
  { to: '/cooperative', label: 'Coop', icon: '🤝' },
  { to: '/escrow', label: 'Escrow', icon: '🔒' },
];

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/send" element={<Send />} />
        <Route path="/cooperative" element={<Cooperative />} />
        <Route path="/escrow" element={<Escrow />} />
      </Routes>

      <nav className="nav" aria-label="Main navigation">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
