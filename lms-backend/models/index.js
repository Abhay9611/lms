'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const db = {};

// Sequelize initialization
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

// Model definitions - Order matters for foreign key constraints
const School = require('./school')(sequelize, Sequelize.DataTypes);
const Grade = require('./grade')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes);
const UserProfile = require('./userProfile')(sequelize, Sequelize.DataTypes);
const Subject = require('./subject')(sequelize, Sequelize.DataTypes);
const Topic = require('./topic')(sequelize, Sequelize.DataTypes);
const Quiz = require('./quiz')(sequelize, Sequelize.DataTypes);
const QuizQuestion = require('./quizQuestion')(sequelize, Sequelize.DataTypes);
const QuizOption = require('./quizOption')(sequelize, Sequelize.DataTypes);
const StudentQuizAttempt = require('./studentQuizAttempt')(sequelize, Sequelize.DataTypes);
const StudentQuizAnswer = require('./studentQuizAnswer')(sequelize, Sequelize.DataTypes);
const Content = require('./content')(sequelize, Sequelize.DataTypes);
const TeachingGuide = require('./teachingGuide')(sequelize, Sequelize.DataTypes);
const StudentProgress = require('./studentProgress')(sequelize, Sequelize.DataTypes);
const ContentUpload = require('./contentUpload')(sequelize, Sequelize.DataTypes);
const ActivationCode = require('./activationCode')(sequelize, Sequelize.DataTypes);
const MonthlyPlanner = require('./monthlyPlanner')(sequelize, Sequelize.DataTypes);
// Add models to db object
db.School = School;
db.Grade = Grade;
db.User = User;
db.ActivationCode = ActivationCode;
db.UserProfile = UserProfile;
db.Subject = Subject;
db.Topic = Topic;
db.Quiz = Quiz;
db.QuizQuestion = QuizQuestion;
db.QuizOption = QuizOption;
db.StudentQuizAttempt = StudentQuizAttempt;
db.StudentQuizAnswer = StudentQuizAnswer;
db.Content = Content;
db.TeachingGuide = TeachingGuide;
db.StudentProgress = StudentProgress;
db.ContentUpload = ContentUpload;
db.MonthlyPlanner = MonthlyPlanner;
// Define associations in order of dependency

// School & Grade
School.hasMany(Grade, { foreignKey: 'schoolId' });
Grade.belongsTo(School, { foreignKey: 'schoolId' });

// School & User
School.hasMany(User, { foreignKey: 'schoolId' });
User.belongsTo(School, { foreignKey: 'schoolId' });

// Grade & User (students only)
Grade.hasMany(User, { foreignKey: 'gradeId' });
User.belongsTo(Grade, { foreignKey: 'gradeId' });

// Grade & Subject
Grade.hasMany(Subject, { foreignKey: 'gradeId' });
Subject.belongsTo(Grade, { foreignKey: 'gradeId' });

// Subject & Topic
Subject.hasMany(Topic, { foreignKey: 'subjectId' });
Topic.belongsTo(Subject, { foreignKey: 'subjectId' });

// Topic & Quiz
Topic.hasMany(Quiz, { 
  foreignKey: 'topicId',
  as: 'quizzes'
});
Quiz.belongsTo(Topic, { 
  foreignKey: 'topicId',
  as: 'topic'
});

// Quiz & QuizQuestion
Quiz.hasMany(QuizQuestion, { 
  foreignKey: 'quizId',
  as: 'questions'
});
QuizQuestion.belongsTo(Quiz, { 
  foreignKey: 'quizId',
  as: 'quiz'
});

// QuizQuestion & QuizOption
QuizQuestion.hasMany(QuizOption, { 
  foreignKey: 'questionId',
  as: 'options'
});
QuizOption.belongsTo(QuizQuestion, { 
  foreignKey: 'questionId',
  as: 'question'
});

// Quiz & StudentQuizAttempt
Quiz.hasMany(StudentQuizAttempt, { foreignKey: 'quizId' });
StudentQuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId' });

// User & StudentQuizAttempt
User.hasMany(StudentQuizAttempt, { foreignKey: 'studentId' });
StudentQuizAttempt.belongsTo(User, { foreignKey: 'studentId' });

// StudentQuizAttempt & StudentQuizAnswer
StudentQuizAttempt.hasMany(StudentQuizAnswer, { foreignKey: 'attemptId' });
StudentQuizAnswer.belongsTo(StudentQuizAttempt, { foreignKey: 'attemptId' });

// QuizQuestion & StudentQuizAnswer
QuizQuestion.hasMany(StudentQuizAnswer, { foreignKey: 'questionId' });
StudentQuizAnswer.belongsTo(QuizQuestion, { foreignKey: 'questionId' });

// QuizOption & StudentQuizAnswer
QuizOption.hasMany(StudentQuizAnswer, { foreignKey: 'selectedOptionId' });
StudentQuizAnswer.belongsTo(QuizOption, { foreignKey: 'selectedOptionId' });

// Topic & Content
Topic.hasMany(Content, { foreignKey: 'topicId' });
Content.belongsTo(Topic, { foreignKey: 'topicId' });

// Topic & TeachingGuide
Topic.hasMany(TeachingGuide, { foreignKey: 'topicId' });
TeachingGuide.belongsTo(Topic, { foreignKey: 'topicId' });

// Topic & ContentUpload
Topic.hasMany(ContentUpload, { foreignKey: 'topicId' });
ContentUpload.belongsTo(Topic, { foreignKey: 'topicId' });

// User & ContentUpload
User.hasMany(ContentUpload, { foreignKey: 'uploadedById' });
ContentUpload.belongsTo(User, { foreignKey: 'uploadedById' });

// StudentProgress (user-topic mapping)
User.hasMany(StudentProgress, { foreignKey: 'userId' });
StudentProgress.belongsTo(User, { foreignKey: 'userId' });


User.hasOne(UserProfile, { as: 'profile', foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

Topic.hasMany(StudentProgress, { foreignKey: 'topicId' });
StudentProgress.belongsTo(Topic, { foreignKey: 'topicId' });

// Add association between MonthlyPlanner and Grade
MonthlyPlanner.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' });
Grade.hasMany(MonthlyPlanner, { foreignKey: 'gradeId', as: 'monthlyPlanners' });

// Export sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
