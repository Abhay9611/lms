'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Option.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question'
      });
      Option.hasMany(models.StudentAnswer, {
        foreignKey: 'selectedOptionId',
        as: 'studentAnswers'
      });
    }
  }
  Option.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    questionId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    optionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Explanation why this option is correct/incorrect'
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
    modelName: 'Option',
    indexes: [
      {
        fields: ['questionId']
      },
      {
        fields: ['questionId', 'order']
      }
    ]
  });
  return Option;
};