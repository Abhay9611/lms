'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Subject.belongsTo(models.Grade, { 
        as: 'grade', 
        foreignKey: 'gradeId' 
      });
      Subject.hasMany(models.Topic, { 
        as: 'topics', 
        foreignKey: 'subjectId' 
      });
    }
  }

  Subject.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    gradeId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Grades',
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
    modelName: 'Subject',
    indexes: [
      {
        fields: ['gradeId']
      },
      {
        fields: ['name']
      },
      {
        fields: ['order']
      }
    ]
  });

  return Subject;
};