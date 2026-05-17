import React, { useState } from 'react';

export default function Send() {
  const [form, setForm] = useState({ to: '', amount: '', memo: '' });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('pending');
    // TODO: build Soroban tx, sign with Freighter, POST signedXdr to /api/wallet/send
    setTimeout(() => setStatus('success'), 1500);
  }

  return (
    <main className="page">
      <h1>Send Payment</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.875rem' }}>
        Pay farmers, cooperatives, or suppliers instantly
      </p>

      <form className="card" onSubmit={handleSubmit}>
        <label>Recipient Address</label>
        <input
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          placeholder="G... Stellar address"
          required
        />
        <label>Amount (USDC)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="0.00"
          required
        />
        <label>Memo (optional)</label>
        <input
          value={form.memo}
          onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="e.g. Maize payment May 2026"
        />

        {status === 'success' && (
          <p style={{ color: 'var(--green)', marginBottom: 12, fontWeight: 600 }}>
            ✓ Payment sent successfully
          </p>
        )}

        <button className="btn btn-primary" type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? 'Sending...' : 'Send Payment'}
        </button>
      </form>

      <div className="card">
        <h3>Recent Recipients</h3>
        {RECENT_RECIPIENTS.map((r) => (
          <div
            key={r.address}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
            onClick={() => setForm({ ...form, to: r.address })}
          >
            <div>
              <p style={{ fontWeight: 600 }}>{r.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{r.address}</p>
            </div>
            <span style={{ color: 'var(--green)', fontSize: '0.875rem' }}>Select</span>
          </div>
        ))}
      </div>
    </main>
  );
}

const RECENT_RECIPIENTS = [
  { name: 'Amara Cooperative', address: 'GABC...1234' },
  { name: 'Kwame Distributors', address: 'GDEF...5678' },
  { name: 'Fatima Seeds Ltd', address: 'GHIJ...9012' },
];
