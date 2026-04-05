import express from 'express'
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
import transactionRouter from './routes/transaction.router.js';
const app=express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/finance/',transactionRouter)
app.use('/api/auth',authRouter)
export default app;