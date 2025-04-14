'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentAnswers', {
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
      selectedOptionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Options',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'For MULTIPLE_CHOICE questions'
      },
      textAnswer: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'For SHORT_ANSWER questions'
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      pointsEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      feedback: {
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
    await queryInterface.addIndex('StudentAnswers', ['studentId']);
    await queryInterface.addIndex('StudentAnswers', ['questionId']);
    await queryInterface.addIndex('StudentAnswers', ['attemptId']);
    await queryInterface.addIndex('StudentAnswers', ['selectedOptionId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentAnswers');
  }
}; 