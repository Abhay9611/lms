const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  'Learnify', // database name
  'postgres', // username (default for pgAdmin)
  process.env.DB_PASSWORD || 'postgres', // password
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
  }
};

testConnection();

module.exports = sequelize; 