'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentQuizAttempts', {
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
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      completedAt: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex('StudentQuizAttempts', ['studentId']);
    await queryInterface.addIndex('StudentQuizAttempts', ['quizId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentQuizAttempts');
  }
}; 