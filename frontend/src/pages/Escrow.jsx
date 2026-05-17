import React, { useState } from 'react';
import { useEscrows } from '../hooks/useWallet.js';

export default function Escrow() {
  const { deals } = useEscrows();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ farmer: '', amount: '', deadline: '' });

  function handleCreate(e) {
    e.preventDefault();
    // TODO: build + sign Soroban tx, POST to /api/escrow/create
    alert('Escrow creation requires wallet signing (connect Freighter wallet).');
    setShowForm(false);
  }

  function handleRelease(dealId) {
    // TODO: build + sign Soroban tx, POST to /api/escrow/release
    alert(`Release escrow #${dealId} requires wallet signing.`);
  }

  return (
    <main className="page">
      <h1>Produce Escrow</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.875rem' }}>
        Secure payments released on delivery confirmation
      </p>

      <button className="btn btn-primary" style={{ marginBottom: 20 }} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ New Escrow'}
      </button>

      {showForm && (
        <form className="card" onSubmit={handleCreate}>
          <h3>Create Escrow Deal</h3>
          <label>Farmer Address</label>
          <input value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })} placeholder="G... Stellar address" required />
          <label>Amount (USDC)</label>
          <input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="500" required />
          <label>Delivery Deadline</label>
          <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />
          <button className="btn btn-primary" type="submit">Lock Funds</button>
        </form>
      )}

      {deals.map((deal) => (
        <div className="card" key={deal.deal_id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3>Deal #{deal.deal_id}</h3>
            <span className={`tag tag-${deal.status.toLowerCase()}`}>{deal.status}</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Farmer: {deal.farmer}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Buyer: {deal.buyer}</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--green)', margin: '8px 0' }}>
            ${deal.amount} USDC
          </p>
          {deal.status === 'Pending' && (
            <button className="btn btn-secondary" onClick={() => handleRelease(deal.deal_id)}>
              ✓ Confirm Delivery & Release
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
