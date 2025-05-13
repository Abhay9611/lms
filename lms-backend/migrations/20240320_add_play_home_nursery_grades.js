'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, modify the column to VARCHAR
    await queryInterface.changeColumn('Grades', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    // Then add the CHECK constraint (MySQL doesn't support CHECK constraints directly)
    // We'll handle this in the application layer instead
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to original ENUM values
    await queryInterface.changeColumn('Grades', 'name', {
      type: Sequelize.ENUM('Pre-nursery', 'LKG', 'UKG'),
      allowNull: false
    });
  }
}; 