import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js';
import { getTransaction, getTransactionId, postTransaction, updateTransaction } from '../controller/transaction.controller.js';
const transactionRouter=express.Router()

transactionRouter.post('/transaction',authenticate,authorize('admin'),postTransaction)
transactionRouter.get('/transaction',authenticate,authorize('admin'),getTransaction)
transactionRouter.get('/transaction:id',authenticate,authorize('admin'),getTransactionId)
transactionRouter.patch('/transaction/:id',authenticate,authorize('admin'),updateTransaction)

export default transactionRouter;