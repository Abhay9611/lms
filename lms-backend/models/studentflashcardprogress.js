const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentFlashcardProgress extends Model {
    static associate(models) {
      StudentFlashcardProgress.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });
      StudentFlashcardProgress.belongsTo(models.Flashcard, {
        foreignKey: 'flashcardId',
        as: 'flashcard'
      });
    }
  }
  StudentFlashcardProgress.init({
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
    flashcardId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Flashcards',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('NOT_STARTED', 'LEARNING', 'REVIEWING', 'MASTERED'),
      allowNull: false,
      defaultValue: 'NOT_STARTED'
    },
    confidenceLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    lastReviewedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nextReviewDue: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'StudentFlashcardProgress',
    indexes: [
      {
        fields: ['studentId']
      },
      {
        fields: ['flashcardId']
      },
      {
        fields: ['studentId', 'flashcardId'],
        unique: true
      },
      {
        fields: ['status']
      },
      {
        fields: ['nextReviewDue']
      }
    ]
  });
  return StudentFlashcardProgress;
}; 