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
      type: {
        type: Sequelize.ENUM('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'),
        allowNull: false,
        defaultValue: 'MULTIPLE_CHOICE'
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

    await queryInterface.addIndex('QuizQuestions', ['quizId']);
    await queryInterface.addIndex('QuizQuestions', ['order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizQuestions');
  }
}; 