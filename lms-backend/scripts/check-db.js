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

async function checkDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Get all tables using the correct query
    const [results] = await sequelize.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );
    
    console.log('\n📋 Tables in the database:');
    if (results.length === 0) {
      console.log('No tables found in the database.');
    } else {
      for (const row of results) {
        const tableName = row.tablename;
        if (tableName) {
          console.log(`- ${tableName}`);
          
          // Count records in each table
          try {
            const [countResult] = await sequelize.query(
              `SELECT COUNT(*) as count FROM "${tableName}"`
            );
            console.log(`  Records: ${countResult[0].count}`);
          } catch (err) {
            console.log(`  Error counting records: ${err.message}`);
          }
        }
      }
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error checking database:', error);
  }
}

checkDatabase(); 