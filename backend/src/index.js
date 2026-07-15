import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import walletRoutes from './routes/wallet.js';
import savingsRoutes from './routes/savings.js';
import cooperativeRoutes from './routes/cooperative.js';
import escrowRoutes from './routes/escrow.js';
import { notFoundHandler, errorHandler } from './middleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors(
  allowedOrigins.length > 0
    ? { origin: allowedOrigins }
    : undefined
));
app.use(express.json({ limit: '100kb' }));

app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/wallet', walletRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/cooperative', cooperativeRoutes);
app.use('/api/escrow', escrowRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Farmer Wallet API running on port ${PORT}`);
});
