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
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    topicId: {
      type: DataTypes.STRING(36),
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
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    option1_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    option1_iscorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    option1_explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option2_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    option2_iscorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    option2_explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option3_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    option3_iscorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    option3_explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option4_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    option4_iscorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    option4_explanation: {
      type: DataTypes.TEXT,
      allowNull: true
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