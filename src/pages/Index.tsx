
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import ParentDashboard from './ParentDashboard';
import { UserRole } from '@/types';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Determine which animated theme to use based on user role
  const getAnimatedTheme = () => {
    if (!user) return 'minimal';
    
    switch (user.role) {
      case UserRole.STUDENT:
        return 'school';
      case UserRole.PARENT:
        return 'forest';
      case UserRole.TEACHER:
        return 'minimal';
      case UserRole.ADMIN:
        return 'space';
      default:
        return 'minimal';
    }
  };
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  // Render the appropriate dashboard based on user role
  switch (user?.role) {
    case UserRole.ADMIN:
      return (
        <>
          <AnimatedCharacters variant={getAnimatedTheme()} density="low" />
          <AdminDashboard />
        </>
      );
    case UserRole.TEACHER:
      return (
        <>
          <AnimatedCharacters variant={getAnimatedTheme()} density="low" />
          <TeacherDashboard />
        </>
      );
    case UserRole.STUDENT:
      return <StudentDashboard />;
    case UserRole.PARENT:
      return (
        <>
          <AnimatedCharacters variant={getAnimatedTheme()} density="low" />
          <ParentDashboard />
        </>
      );
    default:
      return <StudentDashboard />;
  }
};

export default Index;
