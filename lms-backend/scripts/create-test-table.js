const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log
  }
);

async function createTestTable() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Create a test table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "test_table" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `);
    
    console.log('✅ Test table created successfully.');
    
    // Insert a test record
    await sequelize.query(`
      INSERT INTO "test_table" ("name", "createdAt", "updatedAt")
      VALUES ('Test Record', NOW(), NOW());
    `);
    
    console.log('✅ Test record inserted successfully.');
    
    // Check if the table exists
    const [results] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'test_table'"
    );
    
    console.log('\n📋 Tables in the database:');
    if (results.length === 0) {
      console.log('Test table not found in the database.');
    } else {
      console.log('- test_table');
      
      // Count records in the table
      const [countResult] = await sequelize.query(
        `SELECT COUNT(*) as count FROM "test_table"`
      );
      console.log(`  Records: ${countResult[0].count}`);
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createTestTable(); 