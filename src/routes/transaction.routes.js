import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";

import { getUserBalance, topupUserBalance, createUserTransaction, getUserTransactionsHistory } from '../controllers/transaction.contoller.js';

const router = express.Router();

router.get('/balance', verifyToken, getUserBalance); 
router.post('/topup', verifyToken, topupUserBalance); 
router.post('/transaction', verifyToken, createUserTransaction); 
router.get('/transaction/history', verifyToken, getUserTransactionsHistory);

export default router;
