const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

// Import models
const User = require('./user.model')(sequelize);
const School = require('./school.model')(sequelize);
const Grade = require('./grade.model')(sequelize);
const MonthlyPlanner = require('./monthly-planner.model')(sequelize);

// Define associations
User.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });
User.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' });

School.hasMany(User, { foreignKey: 'schoolId', as: 'users' });
School.hasMany(Grade, { foreignKey: 'schoolId', as: 'grades' });

Grade.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });
Grade.hasMany(User, { foreignKey: 'gradeId', as: 'students' });
Grade.hasMany(MonthlyPlanner, { foreignKey: 'gradeId', as: 'planners' });

MonthlyPlanner.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' });
MonthlyPlanner.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = {
  sequelize,
  User,
  School,
  Grade,
  MonthlyPlanner
}; 