'use strict';
const { Model, DataTypes } = require('sequelize');

class Quiz extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Define associations here
    Quiz.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      as: 'topic'
    });
    Quiz.hasMany(models.QuizQuestion, {
      foreignKey: 'quizId',
      as: 'questions'
    });
    Quiz.hasMany(models.StudentQuizAttempt, {
      foreignKey: 'quizId',
      as: 'attempts'
    });
  }
}

module.exports = (sequelize) => {
  Quiz.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    topicId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Topics',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Time limit in minutes'
    },
    passingScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 70,
      validate: {
        min: 0,
        max: 100
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Quiz',
    tableName: 'Quizzes',
    indexes: [
      {
        fields: ['topicId']
      }
    ]
  });

  return Quiz;
};