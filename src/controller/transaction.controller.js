
import pool from "../db/db.js"

export const postTransaction=async(req,res)=>{
    const {amount,type,category,date,notes=null}=req.body
    try{
        const transaction=await pool.query(
            `INSERT INTO transactions 
   (user_id, amount, type, category, date, notes) 
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  [req.user.id, amount, type, category, date, notes]
        )
        console.log(transaction)
        res.status(201).json({
            message:"transaction created successfully",
            transaction:transaction.rows[0]
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
export const getTransaction=async(req,res)=>{
    const {type,category,start_date,end_date}=req.query
    console.log(req.query)
    let query=`SELECT * FROM transactions WHERE 1=1`
    const params=[]
    if(type){
        params.push(type)
        query+=` AND type=$${params.length}`
    }
    if(category){
        params.push(category)
        query+=` AND category=$${params.length}`
    }
    if(start_date){
        params.push(start_date)
        query+=` AND start_date=$${params.length}`
    }
    if(end_date){
        params.push(end_date)
        query+=` AND end_date=$${params.length}`
    }
    query += ' ORDER BY id '
    try{
        const result=await pool.query(
           query,params
        )
        console.log(result)
        res.status(200).json({
            message:"transaction fetched successfully",
            transaction:result.rows
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            err
        })
    }
}
export const getTransactionId=async(req,res)=>{
    const {id}=req.params
    try{
        const result=await pool.query(
            `SELECT * FROM transactions WHERE id=$1`,[id]
        )
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Transaction not found' })
           }
        res.status(200).json({
            message:"transaction from id fetched successfully",
            result:result.rows[0]
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:err
        })
    }
}