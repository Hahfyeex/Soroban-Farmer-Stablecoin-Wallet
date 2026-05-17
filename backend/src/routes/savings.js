import { Router } from 'express';
import { rpc } from '../stellar.js';

const router = Router();

/**
 * GET /api/savings/:planId
 */
router.get('/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    // Placeholder: invoke savings_plan contract get_plan
    res.json({
      plan_id: planId,
      name: '',
      category: '',
      target_amount: '0',
      current_amount: '0',
      deadline: 0,
      is_complete: false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/savings/create
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
 * POST /api/savings/contribute
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

export default router;
