const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Configuration
const API_URL = 'http://localhost:3000/api';
let authToken = '';
let teacherToken = '';
let adminToken = '';
let schoolId = '';
let gradeId = '';
let subjectId = '';
let topicId = '';
let teachingGuideId = '';
let quizId = '';
let flashcardId = '';
let contentId = '';

// Test data
const testSchool = {
  name: 'Test School ' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  code: 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  address: 'Test Address',
  city: 'Test City',
  state: 'Test State',
  country: 'Test Country',
  pincode: '123456',
  isActive: true
};

const testGrade = {
  name: 'LKG',
  description: 'Lower Kindergarten',
  isActive: true
};

const testSubject = {
  name: 'Math',
  code: `MATH${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  description: 'Mathematics',
  order: 1,
  isActive: true
};

const testTopic = {
  title: 'Test Topic',
  description: 'This is a test topic',
  month: 1,
  order: 1,
  isActive: true
};

const testTeachingGuide = {
  pdfUrl: 'https://example.com/test.pdf'
};

const testQuiz = {
  title: 'Test Quiz',
  description: 'This is a test quiz',
  timeLimit: 30,
  passingScore: 70,
  isActive: true
};

const testFlashcard = {
  title: 'Basic Math',
  front: 'What is 2+2?',
  back: '4',
  isActive: true
};

const testContent = {
  title: 'Test Content',
  description: 'This is a test content',
  type: 'VIDEO',
  url: 'https://example.com/test-video.mp4',
  isActive: true
};

// Helper function to make API requests
async function makeRequest(method, endpoint, data = null, token = null) {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
}

// Test functions
async function testAuth() {
  console.log('\n🔐 Testing Authentication...');
  
  try {
    // Register a new user
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Math.random().toString(36).substring(2, 8)}@example.com`,
      password: 'Password123!',
      role: 'student'
    };
    
    const registerResult = await makeRequest('post', '/auth/register', registerData);
    if (!registerResult || !registerResult.token) {
      throw new Error('Registration failed: No token received');
    }
    console.log('✅ User registered successfully');
    
    // Login
    const loginData = {
      email: registerData.email,
      password: registerData.password
    };
    
    const loginResult = await makeRequest('post', '/auth/login', loginData);
    if (!loginResult || !loginResult.token) {
      throw new Error('Login failed: No token received');
    }
    authToken = loginResult.token;
    console.log('✅ User logged in successfully');
    
    // Register a teacher
    const teacherData = {
      firstName: 'Test',
      lastName: 'Teacher',
      email: `teacher${Math.random().toString(36).substring(2, 8)}@example.com`,
      password: 'Password123!',
      role: 'teacher'
    };
    
    const teacherRegisterResult = await makeRequest('post', '/auth/register', teacherData);
    if (!teacherRegisterResult || !teacherRegisterResult.token) {
      throw new Error('Teacher registration failed: No token received');
    }
    console.log('✅ Teacher registered successfully');
    
    // Login as teacher
    const teacherLoginData = {
      email: teacherData.email,
      password: teacherData.password
    };
    
    const teacherLoginResult = await makeRequest('post', '/auth/login', teacherLoginData);
    if (!teacherLoginResult || !teacherLoginResult.token) {
      throw new Error('Teacher login failed: No token received');
    }
    teacherToken = teacherLoginResult.token;
    console.log('✅ Teacher logged in successfully');
    
    // Register an admin
    const adminData = {
      firstName: 'Test',
      lastName: 'Admin',
      email: `admin${Math.random().toString(36).substring(2, 8)}@example.com`,
      password: 'Password123!',
      role: 'admin'
    };
    
    const adminRegisterResult = await makeRequest('post', '/auth/register', adminData);
    if (!adminRegisterResult || !adminRegisterResult.token) {
      throw new Error('Admin registration failed: No token received');
    }
    console.log('✅ Admin registered successfully');
    
    // Login as admin
    const adminLoginData = {
      email: adminData.email,
      password: adminData.password
    };
    
    const adminLoginResult = await makeRequest('post', '/auth/login', adminLoginData);
    if (!adminLoginResult || !adminLoginResult.token) {
      throw new Error('Admin login failed: No token received');
    }
    adminToken = adminLoginResult.token;
    console.log('✅ Admin logged in successfully');
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
    throw error; // Re-throw to stop the test suite
  }
}

async function testSchools() {
  console.log('\n🏫 Testing Schools...');
  
  try {
    // Create a school
    const createResult = await makeRequest('post', '/schools', testSchool, adminToken);
    schoolId = createResult.school.id;
    console.log('✅ School created successfully');
    
    // Get all schools
    const getAllResult = await makeRequest('get', '/schools', null, authToken);
    console.log('✅ Schools retrieved successfully');
    
    // Get a single school
    const getOneResult = await makeRequest('get', `/schools/${schoolId}`, null, authToken);
    console.log('✅ School retrieved successfully');
    
    // Update a school
    const updateData = { ...testSchool, name: 'Updated Test School' };
    const updateResult = await makeRequest('put', `/schools/${schoolId}`, updateData, adminToken);
    console.log('✅ School updated successfully');
  } catch (error) {
    console.error('❌ Schools test failed:', error.message);
    throw error;
  }
}

async function testGrades() {
  console.log('\n📚 Testing Grades...');
  
  // Create a grade
  const createData = { ...testGrade, schoolId };
  const createResult = await makeRequest('post', '/grades', createData, teacherToken);
  gradeId = createResult.grade.id;
  console.log('✅ Grade created successfully');
  
  // Get all grades
  const getAllResult = await makeRequest('get', '/grades', null, authToken);
  console.log('✅ Grades retrieved successfully');
  
  // Get a single grade
  const getOneResult = await makeRequest('get', `/grades/${gradeId}`, null, authToken);
  console.log('✅ Grade retrieved successfully');
  
  // Update a grade
  const updateData = { ...testGrade, name: 'UKG' };
  const updateResult = await makeRequest('put', `/grades/${gradeId}`, updateData, teacherToken);
  console.log('✅ Grade updated successfully');
}

async function testSubjects() {
  console.log('\n📖 Testing Subjects...');
  
  // Create a subject
  const createData = { ...testSubject, gradeId };
  const createResult = await makeRequest('post', '/subjects', createData, teacherToken);
  subjectId = createResult.subject.id;
  console.log('✅ Subject created successfully');
  
  // Get all subjects
  const getAllResult = await makeRequest('get', '/subjects', null, authToken);
  console.log('✅ Subjects retrieved successfully');
  
  // Get a single subject
  const getOneResult = await makeRequest('get', `/subjects/${subjectId}`, null, authToken);
  console.log('✅ Subject retrieved successfully');
  
  // Update a subject
  const updateData = { ...testSubject, name: 'English' };
  const updateResult = await makeRequest('put', `/subjects/${subjectId}`, updateData, teacherToken);
  console.log('✅ Subject updated successfully');
}

async function testTopics() {
  console.log('\n📝 Testing Topics...');
  
  // Create a topic
  const createData = { ...testTopic, subjectId };
  const createResult = await makeRequest('post', '/topics', createData, teacherToken);
  topicId = createResult.topic.id;
  console.log('✅ Topic created successfully');
  
  // Get all topics
  const getAllResult = await makeRequest('get', '/topics', null, authToken);
  console.log('✅ Topics retrieved successfully');
  
  // Get a single topic
  const getOneResult = await makeRequest('get', `/topics/${topicId}`, null, authToken);
  console.log('✅ Topic retrieved successfully');
  
  // Update a topic
  const updateData = { ...testTopic, title: 'Updated Test Topic' };
  const updateResult = await makeRequest('put', `/topics/${topicId}`, updateData, teacherToken);
  console.log('✅ Topic updated successfully');
}

async function testTeachingGuides() {
  console.log('\n📋 Testing Teaching Guides...');
  
  // Create a teaching guide
  const createData = { ...testTeachingGuide, topicId };
  const createResult = await makeRequest('post', '/teaching-guides', createData, teacherToken);
  teachingGuideId = createResult.teachingGuide.id;
  console.log('✅ Teaching Guide created successfully');
  
  // Get all teaching guides
  const getAllResult = await makeRequest('get', '/teaching-guides', null, authToken);
  console.log('✅ Teaching Guides retrieved successfully');
  
  // Get a single teaching guide
  const getOneResult = await makeRequest('get', `/teaching-guides/${teachingGuideId}`, null, authToken);
  console.log('✅ Teaching Guide retrieved successfully');
  
  // Update a teaching guide
  const updateData = { ...testTeachingGuide, pdfUrl: 'https://example.com/updated-test.pdf' };
  const updateResult = await makeRequest('put', `/teaching-guides/${teachingGuideId}`, updateData, teacherToken);
  console.log('✅ Teaching Guide updated successfully');
}

async function testQuizzes() {
  console.log('\n❓ Testing Quizzes...');
  
  // Create a quiz
  const createData = { ...testQuiz, topicId };
  const createResult = await makeRequest('post', '/quizzes', createData, teacherToken);
  quizId = createResult.quiz.id;
  console.log('✅ Quiz created successfully');
  
  // Get all quizzes
  const getAllResult = await makeRequest('get', '/quizzes', null, authToken);
  console.log('✅ Quizzes retrieved successfully');
  
  // Get a single quiz
  const getOneResult = await makeRequest('get', `/quizzes/${quizId}`, null, authToken);
  console.log('✅ Quiz retrieved successfully');
  
  // Update a quiz
  const updateData = { ...testQuiz, title: 'Updated Test Quiz' };
  const updateResult = await makeRequest('put', `/quizzes/${quizId}`, updateData, teacherToken);
  console.log('✅ Quiz updated successfully');
}

async function testFlashcards() {
  console.log('\n🃏 Testing Flashcards...');
  
  // Create a flashcard
  const createData = { ...testFlashcard, topicId };
  const createResult = await makeRequest('post', '/flashcards', createData, teacherToken);
  flashcardId = createResult.flashcard.id;
  console.log('✅ Flashcard created successfully');
  
  // Get all flashcards
  const getAllResult = await makeRequest('get', '/flashcards', null, authToken);
  console.log('✅ Flashcards retrieved successfully');
  
  // Get a single flashcard
  const getOneResult = await makeRequest('get', `/flashcards/${flashcardId}`, null, authToken);
  console.log('✅ Flashcard retrieved successfully');
  
  // Update a flashcard
  const updateData = { ...testFlashcard, front: 'What is 3+3?' };
  const updateResult = await makeRequest('put', `/flashcards/${flashcardId}`, updateData, teacherToken);
  console.log('✅ Flashcard updated successfully');
}

async function testContents() {
  console.log('\n📺 Testing Contents...');
  
  // Create a content
  const createData = { ...testContent, topicId };
  const createResult = await makeRequest('post', '/contents', createData, teacherToken);
  contentId = createResult.content.id;
  console.log('✅ Content created successfully');
  
  // Get all contents
  const getAllResult = await makeRequest('get', '/contents', null, authToken);
  console.log('✅ Contents retrieved successfully');
  
  // Get a single content
  const getOneResult = await makeRequest('get', `/contents/${contentId}`, null, authToken);
  console.log('✅ Content retrieved successfully');
  
  // Update a content
  const updateData = { ...testContent, title: 'Updated Test Content' };
  const updateResult = await makeRequest('put', `/contents/${contentId}`, updateData, teacherToken);
  console.log('✅ Content updated successfully');
}

async function testCleanup() {
  console.log('\n🧹 Cleaning up test data...');
  
  try {
    // Delete content (admin only)
    await makeRequest('delete', `/contents/${contentId}`, null, adminToken);
    console.log('✅ Content deleted successfully');
    
    // Delete flashcard (admin only)
    await makeRequest('delete', `/flashcards/${flashcardId}`, null, adminToken);
    console.log('✅ Flashcard deleted successfully');
    
    // Delete quiz (admin only)
    await makeRequest('delete', `/quizzes/${quizId}`, null, adminToken);
    console.log('✅ Quiz deleted successfully');
    
    // Delete teaching guide (admin only)
    await makeRequest('delete', `/teaching-guides/${teachingGuideId}`, null, adminToken);
    console.log('✅ Teaching Guide deleted successfully');
    
    // Delete topic (admin only)
    await makeRequest('delete', `/topics/${topicId}`, null, adminToken);
    console.log('✅ Topic deleted successfully');
    
    // Delete subject (admin only)
    await makeRequest('delete', `/subjects/${subjectId}`, null, adminToken);
    console.log('✅ Subject deleted successfully');
    
    // Delete grade (admin only)
    await makeRequest('delete', `/grades/${gradeId}`, null, adminToken);
    console.log('✅ Grade deleted successfully');
    
    // Delete school (admin only)
    await makeRequest('delete', `/schools/${schoolId}`, null, adminToken);
    console.log('✅ School deleted successfully');
  } catch (error) {
    console.error('Error during cleanup:', error.message);
  }
}

// Main test function
async function runTests() {
  try {
    console.log('🚀 Starting API tests...');
    
    // Run tests in sequence
    await testAuth();
    await testSchools();
    await testGrades();
    await testSubjects();
    await testTopics();
    await testTeachingGuides();
    await testQuizzes();
    await testFlashcards();
    await testContents();
    
    // Clean up test data
    await testCleanup();
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

// Run the tests
runTests(); 