
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Subjects from './pages/student/Subjects';
import SubjectDetails from './pages/student/SubjectDetails';
import Assignments from './pages/student/Assignments';
import StudentProgress from './pages/student/Progress';

// Admin pages
import Schools from './pages/admin/Schools';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Content from './pages/admin/Content';
import Settings from './pages/admin/Settings';

// Teacher pages
import Students from './pages/teacher/Students';

// Parent pages
import Children from './pages/parent/Children';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/subjects" element={<Subjects />} />
          <Route path="/student/subjects/:id" element={<SubjectDetails />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/progress" element={<StudentProgress />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/schools" element={<Schools />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/content" element={<Content />} />
          <Route path="/admin/settings" element={<Settings />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/students" element={<Students />} />
          
          {/* Parent Routes */}
          <Route path="/parent/children" element={<Children />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
