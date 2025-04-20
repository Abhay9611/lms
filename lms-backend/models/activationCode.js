'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ActivationCode extends Model {}

  ActivationCode.init({
    category: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ActivationCode',
    tableName: 'activation_codes'
  });

  return ActivationCode;
};