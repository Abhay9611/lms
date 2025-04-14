'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      quizId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Quizzes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      questionText: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      questionType: {
        type: Sequelize.ENUM('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'),
        allowNull: false,
        defaultValue: 'MULTIPLE_CHOICE'
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 0
        }
      },
      correctAnswer: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'For TRUE_FALSE and SHORT_ANSWER questions'
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.addIndex('Questions', ['quizId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  }
}; 