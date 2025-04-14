'use strict';
const { Model, DataTypes } = require('sequelize');

class QuizQuestion extends Model {
  static associate(models) {
    // Define associations here
    QuizQuestion.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'quiz'
    });
    QuizQuestion.hasMany(models.QuizOption, {
      foreignKey: 'questionId',
      as: 'options'
    });
  }
}

module.exports = (sequelize) => {
  QuizQuestion.init({
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
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'QuizQuestion',
    tableName: 'QuizQuestions',
    indexes: [
      {
        fields: ['quizId']
      },
      {
        fields: ['order']
      }
    ]
  });

  return QuizQuestion;
}; 