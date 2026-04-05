import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js';
import { getTransaction, postTransaction } from '../controller/transaction.controller.js';
const transactionRouter=express.Router()

transactionRouter.post('/transaction',authenticate,authorize('admin'),postTransaction)
transactionRouter.get('/transaction',authenticate,authorize('admin'),getTransaction)

export default transactionRouter;