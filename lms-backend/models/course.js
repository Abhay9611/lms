const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      // Define associations here
      Course.belongsTo(models.User, { as: 'teacher', foreignKey: 'teacherId' });
      Course.belongsToMany(models.User, {
        through: 'Enrollments',
        as: 'students',
        foreignKey: 'courseId'
      });
      Course.hasMany(models.Lesson, { as: 'lessons', foreignKey: 'courseId' });
      Course.hasMany(models.Assignment, { as: 'assignments', foreignKey: 'courseId' });
    }
  }

  Course.init({
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
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
    indexes: [
      {
        fields: ['teacherId']
      },
      {
        fields: ['status']
      }
    ]
  });

  return Course;
}; 