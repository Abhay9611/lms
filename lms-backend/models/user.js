'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.hasOne(models.UserProfile, {
        foreignKey: 'userId',
        as: 'profile'
      });
      User.hasMany(models.Course, { as: 'courses', foreignKey: 'teacherId' });
      User.belongsToMany(models.Course, { 
        through: 'Enrollments',
        as: 'enrolledCourses',
        foreignKey: 'studentId'
      });
      User.belongsTo(models.School, {
        foreignKey: 'schoolId',
        as: 'school'
      });
      User.belongsTo(models.Grade, {
        foreignKey: 'gradeId',
        as: 'grade'
      });
    }

    // Instance method to check password
    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'teacher', 'admin'),
      defaultValue: 'student'
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    schoolId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'Schools',
        key: 'id'
      }
    },
    gradeId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'Grades',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  return User;
}; 