'use strict';
const { Model, DataTypes } = require('sequelize');

class StudentQuizAttempt extends Model {
  static associate(models) {
    StudentQuizAttempt.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'quiz'
    });
    StudentQuizAttempt.belongsTo(models.User, {
      foreignKey: 'studentId',
      as: 'student'
    });
    StudentQuizAttempt.hasMany(models.StudentQuizAnswer, {
      foreignKey: 'attemptId',
      as: 'answers'
    });
  }
}

module.exports = (sequelize) => {
  StudentQuizAttempt.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    quizId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Quizzes',
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
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('IN_PROGRESS', 'COMPLETED', 'ABANDONED'),
      allowNull: false,
      defaultValue: 'IN_PROGRESS'
    }
  }, {
    sequelize,
    modelName: 'StudentQuizAttempt',
    tableName: 'StudentQuizAttempts',
    indexes: [
      {
        fields: ['quizId']
      },
      {
        fields: ['studentId']
      },
      {
        fields: ['status']
      }
    ]
  });

  return StudentQuizAttempt;
}; 