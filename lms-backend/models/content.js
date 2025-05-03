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


    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Content',
    indexes: [
      {
        fields: ['topicId']
      }
    ]
  });
  return Content;
};