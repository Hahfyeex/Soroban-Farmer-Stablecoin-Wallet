import { useState, useEffect } from 'react';

const API = '/api';

export function useWallet(address) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetch(`${API}/wallet/${address}`)
      .then((r) => r.json())
      .then(setWallet)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  return { wallet, loading, error };
}

export function useSavingsPlans() {
  // In production: fetch all plans for the connected wallet
  const [plans] = useState([
    { plan_id: 1, name: 'Seeds Fund', category: 'Seeds', target_amount: 500, current_amount: 120, is_complete: false },
    { plan_id: 2, name: 'Fertilizer Q3', category: 'Fertilizer', target_amount: 300, current_amount: 300, is_complete: true },
  ]);
  return { plans };
}

export function useCooperative() {
  const [info] = useState({ admin: 'GXXX...', total_pool: 4200, member_count: 12 });
  return { info };
}

export function useEscrows() {
  const [deals] = useState([
    { deal_id: 1, buyer: 'GABC...', farmer: 'GDEF...', amount: 800, status: 'Pending', deadline: 1748000000 },
    { deal_id: 2, buyer: 'GHIJ...', farmer: 'GKLM...', amount: 1200, status: 'Released', deadline: 1747000000 },
  ]);
  return { deals };
}
