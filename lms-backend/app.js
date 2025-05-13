const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const topicRoutes = require('./routes/topicRoutes');
const quizRoutes = require('./routes/quizRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const teachingGuideRoutes = require('./routes/teachingGuideRoutes');
const progressRoutes = require('./routes/progressRoutes');
const monthlyPlannerRoutes = require('./routes/monthlyPlannerRoutes');
const activationCodeRoutes = require('./routes/activationCodeRoutes');
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/teaching-guides', teachingGuideRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/monthly-planner', monthlyPlannerRoutes);
app.use('/api/activation-codes', activationCodeRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to Learnify API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection
const db = require('./models');

// Sync database without altering existing tables to prevent data loss
// In development, you can use migrations to handle schema changes
db.sequelize.sync()
  .then(() => {
    console.log('✅ Database synced successfully');
  })
  .catch((err) => {
    console.error('❌ Error syncing DB:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
