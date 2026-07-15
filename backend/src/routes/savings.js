import { Router } from 'express';
import { submitSignedTx } from '../stellar.js';
import { asyncHandler } from '../middleware.js';

const router = Router();

/**
 * GET /api/savings/:planId
 */
router.get('/:planId', asyncHandler(async (req, res) => {
  const { planId } = req.params;
  if (!/^\d+$/.test(planId)) {
    return res.status(400).json({ error: 'Invalid plan id' });
  }
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
}));

/**
 * POST /api/savings/create
 * Body: { signedXdr }
 */
router.post('/create', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

/**
 * POST /api/savings/contribute
 * Body: { signedXdr }
 */
router.post('/contribute', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

export default router;
