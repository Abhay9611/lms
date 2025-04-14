const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Lesson extends Model {
    static associate(models) {
      // Define associations here
      Lesson.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' });
      Lesson.hasMany(models.Assignment, { as: 'assignments', foreignKey: 'lessonId' });
    }
  }

  Lesson.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft'
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Lesson',
    indexes: [
      {
        fields: ['courseId']
      },
      {
        fields: ['order']
      }
    ]
  });

  return Lesson;
}; 