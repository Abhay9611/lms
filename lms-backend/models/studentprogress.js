'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class StudentProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      StudentProgress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      StudentProgress.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        as: 'topic'
      });
    }
  }
  StudentProgress.init({
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    topicId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Topics',
        key: 'id'
      }
    },
    videoCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    quizCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'StudentProgress',
  });
  return StudentProgress;
};