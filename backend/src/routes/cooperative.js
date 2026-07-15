import { Router } from 'express';
import { isValidAddress, submitSignedTx } from '../stellar.js';
import { asyncHandler } from '../middleware.js';

const router = Router();

/**
 * GET /api/cooperative/info
 */
router.get('/info', asyncHandler(async (_req, res) => {
  // Placeholder: invoke cooperative contract get_info
  res.json({ admin: '', total_pool: '0', member_count: 0 });
}));

/**
 * GET /api/cooperative/contribution/:address
 */
router.get('/contribution/:address', asyncHandler(async (req, res) => {
  const { address } = req.params;
  if (!isValidAddress(address)) {
    return res.status(400).json({ error: 'Invalid Stellar address' });
  }
  // Placeholder: invoke get_contribution
  res.json({ member: address, contribution: '0' });
}));

/**
 * POST /api/cooperative/contribute
 * Body: { signedXdr }
 */
router.post('/contribute', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

/**
 * POST /api/cooperative/distribute
 * Body: { signedXdr }
 */
router.post('/distribute', asyncHandler(async (req, res) => {
  const { signedXdr } = req.body;
  const result = await submitSignedTx(signedXdr);
  res.json({ hash: result.hash });
}));

export default router;
