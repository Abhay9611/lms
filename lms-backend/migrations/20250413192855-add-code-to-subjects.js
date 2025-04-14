'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Subjects', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'DEFAULT_CODE' // Temporary default value
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Subjects', 'code');
  }
};
