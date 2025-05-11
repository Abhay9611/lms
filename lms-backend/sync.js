const db = require('./models');

async function syncDatabase() {
  try {
    await db.sequelize.sync({ force: true }); // Use { alter: true } for production to avoid data loss
    console.log('✅ All models were synchronized successfully.');
    process.exit();
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();
