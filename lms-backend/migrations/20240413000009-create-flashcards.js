'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Flashcards', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      front: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      back: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      difficulty: {
        type: Sequelize.ENUM('EASY', 'MEDIUM', 'HARD'),
        allowNull: false,
        defaultValue: 'MEDIUM'
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: []
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
    await queryInterface.addIndex('Flashcards', ['topicId']);
    await queryInterface.addIndex('Flashcards', ['topicId', 'order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Flashcards');
  }
}; 