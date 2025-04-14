'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeachingGuide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeachingGuide.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        as: 'Topic'
      });
    }
  }
  TeachingGuide.init({
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
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TeachingGuide',
    timestamps: true
  });
  return TeachingGuide;
};