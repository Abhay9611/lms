'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Topic.belongsTo(models.Subject, { 
        as: 'subject', 
        foreignKey: 'subjectId' 
      });
      Topic.hasMany(models.ContentUpload, { 
        as: 'contentUploads', 
        foreignKey: 'topicId' 
      });
      Topic.hasMany(models.Flashcard, { 
        as: 'flashcards', 
        foreignKey: 'topicId' 
      });
      Topic.hasOne(models.Quiz, { 
        as: 'quiz', 
        foreignKey: 'topicId' 
      });
      Topic.hasOne(models.TeachingGuide, { 
        as: 'teachingGuide', 
        foreignKey: 'topicId' 
      });
      Topic.hasMany(models.StudentProgress, { 
        as: 'studentProgress', 
        foreignKey: 'topicId' 
      });
    }
  }

  Topic.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Subjects',
        key: 'id'
      }
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Topic',
    indexes: [
      {
        fields: ['subjectId']
      },

      {
        fields: ['order']
      }
    ]
  });

  return Topic;
};