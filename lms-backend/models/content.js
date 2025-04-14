'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        as: 'topic'
      });
      Content.hasMany(models.StudentContentProgress, {
        foreignKey: 'contentId',
        as: 'studentProgress'
      });
    }
  }
  Content.init({
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
    type: {
      type: DataTypes.ENUM('VIDEO', 'DOCUMENT', 'LINK', 'INTERACTIVE'),
      allowNull: false,
      defaultValue: 'VIDEO'
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    contentUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in minutes'
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Content',
    indexes: [
      {
        fields: ['topicId']
      },
      {
        fields: ['topicId', 'order']
      },
      {
        fields: ['type']
      }
    ]
  });
  return Content;
};