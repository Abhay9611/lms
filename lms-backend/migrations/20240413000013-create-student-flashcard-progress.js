'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentFlashcardProgress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      flashcardId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Flashcards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('NOT_STARTED', 'LEARNING', 'REVIEWING', 'MASTERED'),
        allowNull: false,
        defaultValue: 'NOT_STARTED'
      },
      confidenceLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5
        }
      },
      lastReviewedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      nextReviewDue: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.addIndex('StudentFlashcardProgress', ['studentId']);
    await queryInterface.addIndex('StudentFlashcardProgress', ['flashcardId']);
    await queryInterface.addIndex('StudentFlashcardProgress', ['studentId', 'flashcardId'], {
      unique: true
    });
    await queryInterface.addIndex('StudentFlashcardProgress', ['status']);
    await queryInterface.addIndex('StudentFlashcardProgress', ['nextReviewDue']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentFlashcardProgress');
  }
}; 