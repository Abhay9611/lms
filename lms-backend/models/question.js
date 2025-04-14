'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Quiz, {
        foreignKey: 'quizId',
        as: 'quiz'
      });
      Question.hasMany(models.QuestionOption, {
        foreignKey: 'questionId',
        as: 'options'
      });
      Question.hasMany(models.StudentAnswer, {
        foreignKey: 'questionId',
        as: 'studentAnswers'
      });
    }
  }
  Question.init({
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
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionType: {
      type: DataTypes.ENUM('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'),
      allowNull: false,
      defaultValue: 'MULTIPLE_CHOICE'
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0
      }
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'For TRUE_FALSE and SHORT_ANSWER questions'
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Question',
    indexes: [
      {
        fields: ['quizId']
      }
    ]
  });
  return Question;
};