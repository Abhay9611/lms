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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('date');
        return rawValue ? new Date(rawValue).toISOString() : null;
      },
      set(value) {
        this.setDataValue('date', value ? new Date(value) : null);
      }
    }
  }, {
    sequelize,
    modelName: 'MonthlyPlanner'
  });

  return MonthlyPlanner;
};

