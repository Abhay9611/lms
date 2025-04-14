'use strict';
const { Model, DataTypes } = require('sequelize');

class QuizOption extends Model {
  static associate(models) {
    // Define associations here
    QuizOption.belongsTo(models.QuizQuestion, {
      foreignKey: 'questionId',
      as: 'question'
    });
  }
}

module.exports = (sequelize) => {
  QuizOption.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'QuizQuestions',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    modelName: 'QuizOption',
    tableName: 'QuizOptions',
    indexes: [
      {
        fields: ['questionId']
      },
      {
        fields: ['order']
      }
    ]
  });

  return QuizOption;
}; 