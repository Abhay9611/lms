'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentQuizAnswers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      attemptId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'StudentQuizAttempts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'QuizQuestions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      selectedOptionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'QuizOptions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      pointsEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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

    await queryInterface.addIndex('StudentQuizAnswers', ['attemptId']);
    await queryInterface.addIndex('StudentQuizAnswers', ['questionId']);
    await queryInterface.addIndex('StudentQuizAnswers', ['selectedOptionId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentQuizAnswers');
  }
}; 