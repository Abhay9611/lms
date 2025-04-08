import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Home,
  BookText,
  Users,
  School,
  Calendar,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Star,
  FilePen,
  UserCircle,
  Gear,
  FileText,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (!user) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItems = () => {
    const adminItems = [
      { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/admin' },
      { name: 'Schools', icon: <School className="h-5 w-5" />, path: '/admin/schools' },
      { name: 'Users', icon: <Users className="h-5 w-5" />, path: '/admin/users' },
      { name: 'Content', icon: <BookText className="h-5 w-5" />, path: '/admin/content' },
      { name: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, path: '/admin/analytics' },
      { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings' },
    ];

    const teacherItems = [
      { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/teacher' },
      { name: 'Calendar', icon: <Calendar className="h-5 w-5" />, path: '/teacher/calendar' },
      { name: 'Students', icon: <Users className="h-5 w-5" />, path: '/teacher/students' },
      { name: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/teacher/assignments' },
      { name: 'Content', icon: <BookText className="h-5 w-5" />, path: '/teacher/content' },
      { name: 'Progress Reports', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher/progress' },
      { name: 'Notifications', icon: <Bell className="h-5 w-5" />, path: '/teacher/notifications' },
      { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/teacher/settings' },
    ];

    const studentItems = [
      { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/student' },
      { name: 'Subjects', icon: <BookOpen className="h-5 w-5" />, path: '/student/subjects' },
      { name: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/student/assignments' },
      { name: 'Progress', icon: <BarChart3 className="h-5 w-5" />, path: '/student/progress' },
      { name: 'Story Books', icon: <BookText className="h-5 w-5" />, path: '/student/stories' },
      { name: 'Games', icon: <Star className="h-5 w-5" />, path: '/student/games' },
    ];

    const parentItems = [
      { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/parent' },
      { name: 'Children', icon: <Users className="h-5 w-5" />, path: '/parent/children' },
      { name: 'Progress', icon: <BarChart3 className="h-5 w-5" />, path: '/parent/progress' },
      { name: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/parent/assignments' },
      { name: 'Messages', icon: <FileText className="h-5 w-5" />, path: '/parent/messages' },
      { name: 'Calendar', icon: <Calendar className="h-5 w-5" />, path: '/parent/calendar' },
      { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/parent/settings' },
    ];

    let navItems;
    switch (user.role) {
      case UserRole.ADMIN:
        navItems = adminItems;
        break;
      case UserRole.TEACHER:
        navItems = teacherItems;
        break;
      case UserRole.STUDENT:
        navItems = studentItems;
        break;
      case UserRole.PARENT:
        navItems = parentItems;
        break;
      default:
        navItems = studentItems;
    }

    // Enhanced student menu with child submenu for subjects
    const isStudent = user.role === UserRole.STUDENT;
    const isSubjectsPath = location.pathname.includes('/student/subjects') && !location.pathname.includes('/student/subjects/');
    
    return (
      <div className="flex flex-col flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (location.pathname.includes(item.path) && item.path !== '/student' && item.path !== '/admin' && 
                          item.path !== '/teacher' && item.path !== '/parent');
          
          return (
            <div key={item.name}>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "my-1 rounded-md",
                  isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "",
                  sidebarOpen ? "px-4" : "px-2 justify-center"
                )}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {sidebarOpen && <span className="ml-2">{item.name}</span>}
              </Button>
              
              {/* For student, add subject submenu */}
              {isStudent && item.name === 'Subjects' && sidebarOpen && (
                <div className="ml-8 pl-2 border-l-2 border-sidebar-border">
                  {[
                    { name: 'English Rhymes', path: '/student/subjects/1', icon: <Star className="h-4 w-4" /> },
                    { name: 'EVS', path: '/student/subjects/2', icon: <Star className="h-4 w-4" /> },
                    { name: 'Maths', path: '/student/subjects/3', icon: <Star className="h-4 w-4" /> },
                    { name: 'Story Time', path: '/student/subjects/4', icon: <Star className="h-4 w-4" /> },
                  ].map((subItem) => {
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <Button
                        key={subItem.name}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          "my-1 rounded-md text-xs",
                          isSubActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "",
                          "px-3 w-full"
                        )}
                        onClick={() => navigate(subItem.path)}
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.name}</span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-primary text-primary-foreground rounded-full p-2"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-sidebar h-full flex flex-col text-sidebar-foreground transition-all duration-300 ease-in-out",
          isMobile
            ? sidebarOpen
              ? "fixed inset-y-0 left-0 z-40 w-64 shadow-lg"
              : "fixed inset-y-0 -left-64 z-40 w-64"
            : sidebarOpen
            ? "w-64"
            : "w-16"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center p-4",
          sidebarOpen ? "justify-start" : "justify-center"
        )}>
          <BookOpen className="h-8 w-8 text-sidebar-primary" />
          {sidebarOpen && (
            <span className="ml-2 font-bold text-lg font-bubbly text-sidebar-foreground">
              BookWorm LMS
            </span>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto p-2">
          <NavItems />
        </div>

        <Separator className="bg-sidebar-border" />

        {/* User info */}
        <div className={cn(
          "p-4 flex items-center",
          sidebarOpen ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs opacity-70 capitalize">{user.role}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
