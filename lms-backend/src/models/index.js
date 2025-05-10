const User = require('./User');
const School = require('./School');
const Grade = require('./Grade');

// Define associations
User.belongsTo(School, { foreignKey: 'schoolId', as: 'School' });
School.hasMany(User, { foreignKey: 'schoolId', as: 'users' });

User.belongsTo(Grade, { foreignKey: 'gradeId', as: 'Grade' });
Grade.hasMany(User, { foreignKey: 'gradeId', as: 'students' });

Grade.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });
School.hasMany(Grade, { foreignKey: 'schoolId', as: 'grades' });

module.exports = {
  User,
  School,
  Grade
}; 