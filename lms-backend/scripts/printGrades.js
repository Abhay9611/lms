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

// Import Grade model
const Grade = require('../models/grade')(sequelize);

async function printGrades() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    console.log('=== Grades Records ===\n');

    const grades = await Grade.findAll({
      order: [['name', 'ASC']]
    });

    if (grades.length === 0) {
      console.log('No grades found in the database.');
      return;
    }

    // Print table header
    console.log(
      'ID'.padEnd(36) + ' | ' +
      'Name'.padEnd(20) + ' | ' +
      'Created At'.padEnd(20) + ' | ' +
      'Updated At'
    );
    console.log('-'.repeat(100));

    // Print each record
    grades.forEach(grade => {
      console.log(
        grade.id.padEnd(36) + ' | ' +
        (grade.name || '').padEnd(20) + ' | ' +
        new Date(grade.createdAt).toLocaleString().padEnd(20) + ' | ' +
        new Date(grade.updatedAt).toLocaleString()
      );
    });

    console.log('\nTotal Records:', grades.length);
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
printGrades(); 