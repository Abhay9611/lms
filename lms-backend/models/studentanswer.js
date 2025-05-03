const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentAnswer extends Model {
    static associate(models) {
      StudentAnswer.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });
      StudentAnswer.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question'
      });
      StudentAnswer.belongsTo(models.QuestionOption, {
        foreignKey: 'selectedOptionId',
        as: 'selectedOption'
      });
      StudentAnswer.belongsTo(models.StudentQuizAttempt, {
        foreignKey: 'attemptId',
        as: 'attempt'
      });
    }
  }
  StudentAnswer.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    attemptId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'StudentQuizAttempts',
        key: 'id'
      }
    },
    selectedOptionId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'QuestionOptions',
        key: 'id'
      },
      comment: 'For MULTIPLE_CHOICE questions'
    },
    textAnswer: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'For SHORT_ANSWER questions'
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
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'StudentAnswer',
    indexes: [
      {
        fields: ['studentId']
      },
      {
        fields: ['questionId']
      },
      {
        fields: ['attemptId']
      },
      {
        fields: ['selectedOptionId']
      }
    ]
  });
  return StudentAnswer;
}; 