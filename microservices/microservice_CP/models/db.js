// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // // or use individual config keys:
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database successfully'))
  .catch((err) => console.error('❌ Failed to connect to PostgreSQL database:', err));

module.exports = pool;