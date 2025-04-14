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
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 100
        }
      },
      status: {
        type: Sequelize.ENUM('IN_PROGRESS', 'COMPLETED', 'TIMED_OUT'),
        allowNull: false,
        defaultValue: 'IN_PROGRESS'
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
    await queryInterface.addIndex('StudentQuizAttempts', ['studentId']);
    await queryInterface.addIndex('StudentQuizAttempts', ['quizId']);
    await queryInterface.addIndex('StudentQuizAttempts', ['studentId', 'quizId']);
    await queryInterface.addIndex('StudentQuizAttempts', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentQuizAttempts');
  }
}; 