'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flashcard.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        as: 'topic'
      });
      Flashcard.hasMany(models.StudentFlashcardProgress, {
        foreignKey: 'flashcardId',
        as: 'studentProgress'
      });
    }
  }
  Flashcard.init({
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
    front: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    back: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    difficulty: {
      type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD'),
      allowNull: false,
      defaultValue: 'MEDIUM'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Flashcard',
    indexes: [
      {
        fields: ['topicId']
      },
      {
        fields: ['topicId', 'order']
      }
    ]
  });
  return Flashcard;
};