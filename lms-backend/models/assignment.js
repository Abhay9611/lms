const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Assignment extends Model {
    static associate(models) {
      // Define associations here
      Assignment.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' });
      Assignment.belongsTo(models.Lesson, { as: 'lesson', foreignKey: 'lessonId' });
      Assignment.hasMany(models.Submission, { as: 'submissions', foreignKey: 'assignmentId' });
    }
  }

  Assignment.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    type: {
      type: DataTypes.ENUM('quiz', 'homework', 'project', 'exam'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft'
    },
    courseId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id'
      }
    },
    lessonId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'Lessons',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Assignment',
    indexes: [
      {
        fields: ['courseId']
      },
      {
        fields: ['lessonId']
      },
      {
        fields: ['dueDate']
      }
    ]
  });

  return Assignment;
}; 