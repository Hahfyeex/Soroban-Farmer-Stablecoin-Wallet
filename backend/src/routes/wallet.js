import { Router } from 'express';
import { rpc, contracts } from '../stellar.js';

const router = Router();

/**
 * GET /api/wallet/:address
 * Returns wallet info for a farmer address
 */
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    // In production: invoke contract view function get_info
    // Placeholder response for scaffold
    res.json({
      owner: address,
      balance: '0',
      total_received: '0',
      total_sent: '0',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/wallet/deposit
 * Body: { from, token, amount, signedXdr }
 */
router.post('/deposit', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/wallet/send
 * Body: { to, token, amount, signedXdr }
 */
router.post('/send', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
