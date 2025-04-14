'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quizzes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
      timeLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Time limit in minutes'
      },
      passingScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 70,
        validate: {
          min: 0,
          max: 100
        }
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
    await queryInterface.addIndex('Quizzes', ['topicId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Quizzes');
  }
}; 