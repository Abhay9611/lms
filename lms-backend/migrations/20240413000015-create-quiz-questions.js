'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizQuestions', {
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
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      questionType: {
        type: Sequelize.ENUM('multiple_choice', 'true_false', 'short_answer'),
        allowNull: false,
        defaultValue: 'multiple_choice'
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      order: {
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

    await queryInterface.addIndex('QuizQuestions', ['quizId']);
    await queryInterface.addIndex('QuizQuestions', ['order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizQuestions');
  }
}; 