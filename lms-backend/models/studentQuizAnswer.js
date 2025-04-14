'use strict';
const { Model, DataTypes } = require('sequelize');

class StudentQuizAnswer extends Model {
  static associate(models) {
    StudentQuizAnswer.belongsTo(models.StudentQuizAttempt, {
      foreignKey: 'attemptId',
      as: 'attempt'
    });
    StudentQuizAnswer.belongsTo(models.QuizQuestion, {
      foreignKey: 'questionId',
      as: 'question'
    });
    StudentQuizAnswer.belongsTo(models.QuizOption, {
      foreignKey: 'selectedOptionId',
      as: 'selectedOption'
    });
  }
}

module.exports = (sequelize) => {
  StudentQuizAnswer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    attemptId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'StudentQuizAttempts',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'QuizQuestions',
        key: 'id'
      }
    },
    selectedOptionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'QuizOptions',
        key: 'id'
      }
    },
    textAnswer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'StudentQuizAnswer',
    tableName: 'StudentQuizAnswers',
    indexes: [
      {
        fields: ['attemptId']
      },
      {
        fields: ['questionId']
      },
      {
        fields: ['selectedOptionId']
      }
    ]
  });

  return StudentQuizAnswer;
}; 