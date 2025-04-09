
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import LandingPage from './pages/LandingPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Subjects from './pages/student/Subjects';
import SubjectDetails from './pages/student/SubjectDetails';
import Assignments from './pages/student/Assignments';
import StudentProgress from './pages/student/Progress';
import StudentGames from './pages/student/Games';
import StudentSettings from './pages/student/Settings';
import StudentParentalControl from './pages/student/ParentalControl';

// Admin pages
import Schools from './pages/admin/Schools';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Content from './pages/admin/Content';
import ContentUpload from './pages/admin/ContentUpload';
import AdminCalendar from './pages/admin/Calendar';
import AdminPlanner from './pages/admin/Planner';
import Settings from './pages/admin/Settings';

// Teacher pages
import TeacherDashboard from './pages/TeacherDashboard';
import Students from './pages/teacher/Students';
import TeacherCalendar from './pages/teacher/Calendar';
import TeacherPlanner from './pages/teacher/Planner';
import TeacherResourceHub from './pages/teacher/ResourceHub';
import TeacherGradeSelection from './pages/teacher/GradeSelection';

// Parent pages
import ParentDashboard from './pages/ParentDashboard';
import Children from './pages/parent/Children';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/subjects" element={<Subjects />} />
          <Route path="/student/subjects/:id" element={<SubjectDetails />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/progress" element={<StudentProgress />} />
          <Route path="/student/games" element={<StudentGames />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/student/parental-control" element={<StudentParentalControl />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/schools" element={<Schools />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/content" element={<Content />} />
          <Route path="/admin/content/upload" element={<ContentUpload />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/planner" element={<AdminPlanner />} />
          <Route path="/admin/settings" element={<Settings />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/grade-selection" element={<TeacherGradeSelection />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/calendar" element={<TeacherCalendar />} />
          <Route path="/teacher/planner" element={<TeacherPlanner />} />
          <Route path="/teacher/resources" element={<TeacherResourceHub />} />
          
          {/* Parent Routes */}
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/parent/children" element={<Children />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
