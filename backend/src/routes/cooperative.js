import { Router } from 'express';
import { rpc } from '../stellar.js';

const router = Router();

/**
 * GET /api/cooperative/info
 */
router.get('/info', async (_req, res) => {
  try {
    // Placeholder: invoke cooperative contract get_info
    res.json({ admin: '', total_pool: '0', member_count: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/cooperative/contribution/:address
 */
router.get('/contribution/:address', async (req, res) => {
  try {
    const { address } = req.params;
    // Placeholder: invoke get_contribution
    res.json({ member: address, contribution: '0' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/cooperative/contribute
 * Body: { signedXdr }
 */
router.post('/contribute', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/cooperative/distribute
 * Body: { signedXdr }
 */
router.post('/distribute', async (req, res) => {
  try {
    const { signedXdr } = req.body;
    const result = await rpc.sendTransaction(signedXdr);
    res.json({ hash: result.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
