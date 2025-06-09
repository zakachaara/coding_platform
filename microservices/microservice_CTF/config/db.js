
const { Sequelize } = require('sequelize');

// PostgreSQL Database configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || '10.0.0.30',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'usermanagement',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  logging: console.log,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
