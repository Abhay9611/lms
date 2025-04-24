const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MonthlyPlanner extends Model {
    static associate(models) {
      MonthlyPlanner.belongsTo(models.Grade, { foreignKey: 'gradeId' });
    }
  }

  MonthlyPlanner.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    gradeId: {
      type: DataTypes.UUID,
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

