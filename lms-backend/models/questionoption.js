const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionOption extends Model {
    static associate(models) {
      QuestionOption.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question'
      });
      QuestionOption.hasMany(models.StudentAnswer, {
        foreignKey: 'selectedOptionId',
        as: 'studentAnswers'
      });
    }
  }
  QuestionOption.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    questionId: {
      type: DataTypes.UUID,
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
    modelName: 'QuestionOption',
    indexes: [
      {
        fields: ['questionId']
      },
      {
        fields: ['questionId', 'order']
      }
    ]
  });
  return QuestionOption;
}; 