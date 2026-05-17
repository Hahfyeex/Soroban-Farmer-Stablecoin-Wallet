import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import walletRoutes from './routes/wallet.js';
import savingsRoutes from './routes/savings.js';
import cooperativeRoutes from './routes/cooperative.js';
import escrowRoutes from './routes/escrow.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/wallet', walletRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/cooperative', cooperativeRoutes);
app.use('/api/escrow', escrowRoutes);

app.listen(PORT, () => {
  console.log(`Farmer Wallet API running on port ${PORT}`);
});
