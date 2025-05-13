const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MonthlyPlanner = sequelize.define('MonthlyPlanner', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gradeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Grades',
        key: 'id'
      }
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'MonthlyPlanners'
  });

  return MonthlyPlanner;
}; 