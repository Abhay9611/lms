const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

// Import models
const MonthlyPlanner = require('../models/monthlyPlanner')(sequelize);
const Grade = require('../models/grade')(sequelize);

// Define associations
MonthlyPlanner.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' });

async function printMonthlyPlanners() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    console.log('=== Monthly Planner Records ===\n');

    const planners = await MonthlyPlanner.findAll({
      include: [{
        model: Grade,
        as: 'grade',
        attributes: ['id', 'name']
      }],
      order: [['date', 'DESC']]
    });

    if (planners.length === 0) {
      console.log('No monthly planners found in the database.');
      return;
    }

    // Print table header
    console.log(
      'ID'.padEnd(36) + ' | ' +
      'Title'.padEnd(20) + ' | ' +
      'Grade'.padEnd(15) + ' | ' +
      'Date'.padEnd(12) + ' | ' +
      'Content'.padEnd(20) + ' | ' +
      'PDF URL'.padEnd(30) + ' | ' +
      'Created At'.padEnd(12) + ' | ' +
      'Updated At'
    );
    console.log('-'.repeat(180));

    // Print each record
    planners.forEach(planner => {
      const date = new Date(planner.date).toLocaleDateString();
      const content = planner.content ? planner.content.substring(0, 17) + '...' : '';
      const pdfUrl = planner.pdfUrl ? planner.pdfUrl.substring(0, 27) + '...' : '';
      
      console.log(
        planner.id.padEnd(36) + ' | ' +
        (planner.title || '').padEnd(20) + ' | ' +
        (planner.grade?.name || '').padEnd(15) + ' | ' +
        date.padEnd(12) + ' | ' +
        content.padEnd(20) + ' | ' +
        pdfUrl.padEnd(30) + ' | ' +
        new Date(planner.createdAt).toLocaleDateString().padEnd(12) + ' | ' +
        new Date(planner.updatedAt).toLocaleDateString()
      );
    });

    console.log('\nTotal Records:', planners.length);
    console.log('\n=== End of Records ===\n');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the database connection
    await sequelize.close();
    process.exit(0);
  }
}

// Run the script
printMonthlyPlanners();