'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if columns already exist
    const tableInfo = await queryInterface.describeTable('MonthlyPlanners');
    
    if (!tableInfo.title) {
      // Add title column
      await queryInterface.addColumn('MonthlyPlanners', 'title', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Untitled Planner'
      });
    }

    if (!tableInfo.date) {
      // Add date column
      await queryInterface.addColumn('MonthlyPlanners', 'date', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    // Remove default values after adding columns
    if (tableInfo.title && tableInfo.title.defaultValue) {
      await queryInterface.changeColumn('MonthlyPlanners', 'title', {
        type: Sequelize.STRING,
        allowNull: false
      });
    }

    if (tableInfo.date && tableInfo.date.defaultValue) {
      await queryInterface.changeColumn('MonthlyPlanners', 'date', {
        type: Sequelize.DATE,
        allowNull: false
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the columns if they exist
    const tableInfo = await queryInterface.describeTable('MonthlyPlanners');
    
    if (tableInfo.date) {
      await queryInterface.removeColumn('MonthlyPlanners', 'date');
    }
    
    if (tableInfo.title) {
      await queryInterface.removeColumn('MonthlyPlanners', 'title');
    }
  }
}; 