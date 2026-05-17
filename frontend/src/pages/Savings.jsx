import React, { useState } from 'react';
import { useSavingsPlans } from '../hooks/useWallet.js';

const CATEGORIES = ['Seeds', 'Fertilizer', 'Equipment', 'Livestock', 'Seasonal', 'Other'];

export default function Savings() {
  const { plans } = useSavingsPlans();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Seeds', target: '', deadline: '' });

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: build + sign Soroban tx, POST to /api/savings/create
    alert('Savings plan creation requires wallet signing (connect Freighter wallet).');
    setShowForm(false);
  }

  return (
    <main className="page">
      <h1>Savings Plans</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.875rem' }}>
        Goal-based savings for your farm
      </p>

      <button className="btn btn-primary" style={{ marginBottom: 20 }} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ New Plan'}
      </button>

      {showForm && (
        <form className="card" onSubmit={handleSubmit}>
          <h3>Create Savings Plan</h3>
          <label>Plan Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Seeds for Season 2" required />
          <label>Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label>Target Amount (USDC)</label>
          <input type="number" min="1" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} placeholder="500" required />
          <label>Deadline</label>
          <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />
          <button className="btn btn-primary" type="submit">Create Plan</button>
        </form>
      )}

      {plans.map((plan) => {
        const pct = Math.min(100, Math.round((plan.current_amount / plan.target_amount) * 100));
        return (
          <div className="card" key={plan.plan_id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{plan.name}</h3>
              <span className={`tag ${plan.is_complete ? 'tag-released' : 'tag-pending'}`}>
                {plan.is_complete ? 'Complete' : 'Active'}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{plan.category}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>${plan.current_amount}</strong> / ${plan.target_amount} USDC ({pct}%)
            </p>
            {!plan.is_complete && (
              <button className="btn btn-outline" style={{ marginTop: 12 }}>
                + Contribute
              </button>
            )}
          </div>
        );
      })}
    </main>
  );
}
