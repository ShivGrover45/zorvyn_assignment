import app from "./src/app.js";
import dotenv from 'dotenv'
import pool from "./src/db/db.js";
dotenv.config()
const port=process.env.PORT
app.listen(port,()=>{
    console.log("server running on port:",port)
})