require('dotenv').config();
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('✅ DB Connected Successfully!'))
  .catch((err) => console.error('❌ Failed to connect to DB:', err));
