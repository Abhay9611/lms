'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Grade.belongsTo(models.School, { 
        as: 'school', 
        foreignKey: 'schoolId' 
      });
      Grade.hasMany(models.User, { 
        as: 'students', 
        foreignKey: 'gradeId' 
      });
      Grade.hasMany(models.Subject, { 
        as: 'subjects', 
        foreignKey: 'gradeId' 
      });
    }
  }

  Grade.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.ENUM('Pre-nursery', 'LKG', 'UKG'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Schools',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Grade',
    indexes: [
      {
        fields: ['schoolId']
      },
      {
        fields: ['name']
      }
    ]
  });

  return Grade;
};