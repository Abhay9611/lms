'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizOptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

    await queryInterface.addIndex('QuizOptions', ['questionId']);
    await queryInterface.addIndex('QuizOptions', ['order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizOptions');
  }
}; 