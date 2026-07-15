import { Router } from 'express';
import { submitSignedTx } from '../stellar.js';
import { asyncHandler } from '../middleware.js';

const router = Router();

/**
 * GET /api/escrow/:dealId
 */
router.get('/:dealId', asyncHandler(async (req, res) => {
  const { dealId } = req.params;
  if (!/^\d+$/.test(dealId)) {
    return res.status(400).json({ error: 'Invalid deal id' });
  }
  // Placeholder: invoke escrow contract get_deal
  res.json({
    deal_id: dealId,
    buyer: '',
    farmer: '',
    amount: '0',
    status: 'Pending',
    deadline: 0,
  });
}));

/**
 * POST /api/escrow/create
 * Body: { signedXdr }
 */
router.post('/create', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

/**
 * POST /api/escrow/release
 * Body: { signedXdr }
 */
router.post('/release', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

/**
 * POST /api/escrow/refund
 * Body: { signedXdr }
 */
router.post('/refund', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

export default router;
