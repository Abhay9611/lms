const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MonthlyPlanner extends Model {
    static associate(models) {
      MonthlyPlanner.belongsTo(models.Grade, { foreignKey: 'gradeId' });
    }
  }

  MonthlyPlanner.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    gradeId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },

    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MonthlyPlanner'
  });

  return MonthlyPlanner;
};

