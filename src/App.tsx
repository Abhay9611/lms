
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/StudentDashboard';
import Subjects from './pages/student/Subjects';
import SubjectDetails from './pages/student/SubjectDetails';
import Assignments from './pages/student/Assignments';
import Progress from './pages/student/Progress';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/subjects" element={<Subjects />} />
          <Route path="/student/subjects/:id" element={<SubjectDetails />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
