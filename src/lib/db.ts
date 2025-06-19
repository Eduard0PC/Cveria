import { Pool } from 'pg'

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario con la base de datos de Neon 
  },
})

export default db