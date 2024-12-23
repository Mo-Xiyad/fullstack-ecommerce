import { Router } from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { createPaymentIntent, getKeys, webhook } from './handlers.js';

const router = Router();

// Note: Guests can get the publishable key
router.get('/keys', getKeys);

router.post('/payment-intent', verifyToken, createPaymentIntent);

router.post('/webhook', webhook);

export default router;
