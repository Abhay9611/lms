const { sequelize } = require('../models');

async function forceSync() {
  try {
    console.log('🔄 Forcing sync of all models...');
    
    // Force sync all models (this will drop and recreate all tables)
    await sequelize.sync({ force: true });
    
    console.log('✅ All models were synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing models:', error);
    process.exit(1);
  }
}

forceSync(); 