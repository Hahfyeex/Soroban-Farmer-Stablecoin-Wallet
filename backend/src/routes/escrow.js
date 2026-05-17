import { Router } from 'express';
import { rpc } from '../stellar.js';

const router = Router();

/**
 * GET /api/escrow/:dealId
 */
router.get('/:dealId', async (req, res) => {
  try {
    const { dealId } = req.params;
    // Placeholder: invoke escrow contract get_deal
    res.json({
      deal_id: dealId,
      buyer: '',
      farmer: '',
      amount: '0',
      status: 'Pending',
      deadline: 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/escrow/create
 * Body: { signedXdr }
 */
router.post('/create', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/escrow/release
 * Body: { signedXdr }
 */
router.post('/release', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/escrow/refund
 * Body: { signedXdr }
 */
router.post('/refund', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
