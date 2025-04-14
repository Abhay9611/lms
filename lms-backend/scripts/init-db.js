const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres' // Connect to default postgres database
  });

  try {
    await client.connect();
    
    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (result.rows.length === 0) {
      // Database does not exist, create it
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✅ Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`ℹ️ Database ${process.env.DB_NAME} already exists`);
    }
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
  } finally {
    await client.end();
  }
}

createDatabase(); 