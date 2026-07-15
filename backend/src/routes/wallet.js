import { Router } from 'express';
import { isValidAddress, submitSignedTx } from '../stellar.js';
import { asyncHandler } from '../middleware.js';

const router = Router();

/**
 * GET /api/wallet/:address
 * Returns wallet info for a farmer address
 */
router.get('/:address', asyncHandler(async (req, res) => {
  const { address } = req.params;
  if (!isValidAddress(address)) {
    return res.status(400).json({ error: 'Invalid Stellar address' });
  }
  // In production: invoke contract view function get_info
  // Placeholder response for scaffold
  res.json({
    owner: address,
    balance: '0',
    total_received: '0',
    total_sent: '0',
  });
}));

/**
 * POST /api/wallet/deposit
 * Body: { from, token, amount, signedXdr }
 */
router.post('/deposit', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

/**
 * POST /api/wallet/send
 * Body: { to, token, amount, signedXdr }
 */
router.post('/send', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

export default router;
