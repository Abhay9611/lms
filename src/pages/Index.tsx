
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import ParentDashboard from './ParentDashboard';
import { UserRole } from '@/types';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  // Render the appropriate dashboard based on user role
  switch (user?.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.TEACHER:
      return <TeacherDashboard />;
    case UserRole.STUDENT:
      return <StudentDashboard />;
    case UserRole.PARENT:
      return <ParentDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Index;
