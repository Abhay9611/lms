'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Options', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      optionText: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Explanation why this option is correct/incorrect'
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add indexes
    await queryInterface.addIndex('Options', ['questionId']);
    await queryInterface.addIndex('Options', ['questionId', 'order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Options');
  }
}; 