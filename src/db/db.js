import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config()
const pool=new Pool({
  connectionString:process.env.DB_URL,
  ssl:false
})

pool.connect()
  .then(() => console.log('Neon PostgreSQL connected'))
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });

export default pool;