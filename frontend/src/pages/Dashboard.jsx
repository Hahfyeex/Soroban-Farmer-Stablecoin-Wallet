import React from 'react';
import { Link } from 'react-router-dom';

// Demo address — replace with wallet connection logic
const DEMO_ADDRESS = 'GFARMER...XYZ';
const DEMO_BALANCE = '1,240.50';

export default function Dashboard() {
  return (
    <main className="page">
      <h1>Farmer Wallet</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.875rem' }}>
        {DEMO_ADDRESS}
      </p>

      {/* Balance card */}
      <div className="card" style={{ background: 'var(--green)', color: '#fff' }}>
        <p style={{ opacity: 0.8, marginBottom: 4 }}>Available Balance</p>
        <p className="balance-amount" style={{ color: '#fff' }}>${DEMO_BALANCE}</p>
        <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>USDC · Stellar Network</p>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Link to="/send">
          <button className="btn btn-primary">💸 Send</button>
        </Link>
        <Link to="/savings">
          <button className="btn btn-secondary">🌱 Save</button>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="card">
        <h3>Recent Activity</h3>
        {RECENT.map((tx) => (
          <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <p style={{ fontWeight: 600 }}>{tx.label}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{tx.date}</p>
            </div>
            <p style={{ fontWeight: 700, color: tx.amount > 0 ? 'var(--green)' : '#ef4444' }}>
              {tx.amount > 0 ? '+' : ''}{tx.amount} USDC
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

const RECENT = [
  { id: 1, label: 'Produce Payment', date: 'May 16, 2026', amount: 320 },
  { id: 2, label: 'Seeds Savings', date: 'May 15, 2026', amount: -50 },
  { id: 3, label: 'Cooperative Contribution', date: 'May 14, 2026', amount: -100 },
  { id: 4, label: 'Escrow Released', date: 'May 12, 2026', amount: 800 },
];
