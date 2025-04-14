const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Submission extends Model {
    static associate(models) {
      // Define associations here
      Submission.belongsTo(models.Assignment, { as: 'assignment', foreignKey: 'assignmentId' });
      Submission.belongsTo(models.User, { as: 'student', foreignKey: 'studentId' });
    }
  }

  Submission.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    grade: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('submitted', 'graded', 'late', 'missing'),
      defaultValue: 'submitted'
    },
    assignmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Assignments',
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Submission',
    indexes: [
      {
        fields: ['assignmentId']
      },
      {
        fields: ['studentId']
      },
      {
        fields: ['submittedAt']
      }
    ]
  });

  return Submission;
}; 