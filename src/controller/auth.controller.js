import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import pool from '../db/db.js'
import dotenv from 'dotenv'
dotenv.config()
export const register=async(req,res)=>{
    const {username,email,password,role}=req.body
    if(!username||!email||!password){
        return res.status(400).json({
        error:"username email and password are required"    
        })
    }
    try{
        const exist=await pool.query(
            `SELECT id FROM users WHERE email=$1`,[email]
        )
        if(exist.rows.length>0){
            return res.status(409).json({
                message:"user already exists"
            })
        }
        const hashed=await bcrypt.hash(password,10)
        const validRoles = ['admin', 'analyst', 'viewer'];
        const userRole=validRoles.includes(role)?role:'viewer'
        const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, email, hashed, userRole]
    );

    res.status(201).json({ message: 'User registered', userId: result.rows[0].id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
};

export const login=async(req,res)=>{
    const {username,password}=req.body
    if(!username||!password){
        return res.status(400).json({
            message:"username and password is required"
        })
    }
    try{
        const result=await pool.query(
            'SELECT * FROM users WHERE name= $1',[username]
        )
        console.log(result)
        const user=result.rows[0]
        console.log(user)
        if(!user){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }
        if(user.status=='inactive'){
            return res.status(403).json({
                message:"Account is inactive"
            })
        }
        console.log(password)
        console.log(user.password)
        const match=await bcrypt.compare(password,user.password)
        console.log(match)
        if(!match){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }
        const token=jwt.sign({
            id:user.id,
            role:user.role
        },process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSize:'strict',
            expiresIn:7*24*60*60*1000
        })
        res.status(200).json({
            message:"login successfull",
            user
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}