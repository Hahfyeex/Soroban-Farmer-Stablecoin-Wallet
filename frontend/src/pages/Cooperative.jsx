import React, { useState } from 'react';
import { useCooperative } from '../hooks/useWallet.js';

export default function Cooperative() {
  const { info } = useCooperative();
  const [amount, setAmount] = useState('');

  function handleContribute(e) {
    e.preventDefault();
    // TODO: build + sign Soroban tx, POST to /api/cooperative/contribute
    alert('Contribution requires wallet signing (connect Freighter wallet).');
  }

  return (
    <main className="page">
      <h1>Cooperative Wallet</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.875rem' }}>
        Pool savings and manage group funds transparently
      </p>

      <div className="card" style={{ background: 'var(--green)', color: '#fff' }}>
        <p style={{ opacity: 0.8 }}>Total Pool</p>
        <p className="balance-amount" style={{ color: '#fff' }}>${info.total_pool.toLocaleString()}</p>
        <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>{info.member_count} members</p>
      </div>

      <div className="card">
        <h3>My Contribution</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green)' }}>$350 USDC</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>8.3% of total pool</p>
      </div>

      <form className="card" onSubmit={handleContribute}>
        <h3>Contribute to Pool</h3>
        <label>Amount (USDC)</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          required
        />
        <button className="btn btn-primary" type="submit">Contribute</button>
      </form>

      <div className="card">
        <h3>Members</h3>
        {MEMBERS.map((m) => (
          <div key={m.address} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <p style={{ fontWeight: 600 }}>{m.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{m.address}</p>
            </div>
            <p style={{ fontWeight: 600 }}>${m.contribution}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const MEMBERS = [
  { name: 'Amara Diallo', address: 'GABC...1234', contribution: 350 },
  { name: 'Kwame Asante', address: 'GDEF...5678', contribution: 500 },
  { name: 'Fatima Nkosi', address: 'GHIJ...9012', contribution: 200 },
  { name: 'Ibrahim Touré', address: 'GKLM...3456', contribution: 450 },
];
