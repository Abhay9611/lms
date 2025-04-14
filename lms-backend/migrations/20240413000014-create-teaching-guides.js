'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeachingGuides', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      topicId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Topics',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pdfUrl: {
        type: Sequelize.STRING,
        allowNull: false
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

    // Add index
    await queryInterface.addIndex('TeachingGuides', ['topicId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeachingGuides');
  }
}; 