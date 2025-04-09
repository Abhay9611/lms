import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Home,
  BookOpen,
  ListTodo,
  Gamepad2,
  BarChart2,
  Settings,
  Shield,
  Menu,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const StudentLinks = [
  {
    title: 'Dashboard',
    href: '/student',
    icon: Home,
  },
  {
    title: 'Subjects',
    href: '/student/subjects',
    icon: BookOpen,
  },
  {
    title: 'Assignments',
    href: '/student/assignments',
    icon: ListTodo,
  },
  {
    title: 'Games',
    href: '/student/games',
    icon: Gamepad2,
  },
  {
    title: 'Progress',
    href: '/student/progress',
    icon: BarChart2,
  },
  {
    title: 'Settings',
    href: '/student/settings',
    icon: Settings,
  },
  {
    title: 'Parental Control',
    href: '/student/parental-control',
    icon: Shield,
  },
];

const TeacherLinks = [
  {
    title: 'Dashboard',
    href: '/teacher',
    icon: Home,
  },
  {
    title: 'Students',
    href: '/teacher/students',
    icon: User,
  },
  {
    title: 'Calendar',
    href: '/teacher/calendar',
    icon: BookOpen,
  },
  {
    title: 'Planner',
    href: '/teacher/planner',
    icon: ListTodo,
  },
  {
    title: 'Resources',
    href: '/teacher/resources',
    icon: Gamepad2,
  },
  {
    title: 'Settings',
    href: '/teacher/settings',
    icon: Settings,
  },
];

const AdminLinks = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Schools',
    href: '/admin/schools',
    icon: BookOpen,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: User,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: ListTodo,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: Gamepad2,
  },
  {
    title: 'Calendar',
    href: '/admin/calendar',
    icon: BookOpen,
  },
  {
    title: 'Planner',
    href: '/admin/planner',
    icon: ListTodo,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

const ParentLinks = [
  {
    title: 'Dashboard',
    href: '/parent',
    icon: Home,
  },
  {
    title: 'Children',
    href: '/parent/children',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/parent/settings',
    icon: Settings,
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentMenuItems = StudentLinks.map((link) => ({
    ...link,
    active: location.pathname === link.href,
  }));

  const teacherMenuItems = TeacherLinks.map((link) => ({
    ...link,
    active: location.pathname === link.href,
  }));

  const adminMenuItems = AdminLinks.map((link) => ({
    ...link,
    active: location.pathname === link.href,
  }));

  const parentMenuItems = ParentLinks.map((link) => ({
    ...link,
    active: location.pathname === link.href,
  }));

  let menuItems;
  switch (user?.role) {
    case 'admin':
      menuItems = adminMenuItems;
      break;
    case 'teacher':
      menuItems = teacherMenuItems;
      break;
    case 'parent':
      menuItems = parentMenuItems;
      break;
    default:
      menuItems = studentMenuItems;
      break;
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="pl-6 pb-4 pt-6">
            <SheetTitle className="font-bubbly text-2xl">
              LMS Dashboard
            </SheetTitle>
            <SheetDescription>
              Navigate through your learning journey.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex flex-col h-full">
            <div className="py-4 flex-1">
              {menuItems &&
                menuItems.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors hover:bg-secondary/5 font-medium",
                        isActive
                          ? "bg-secondary/5 text-secondary-foreground"
                          : "text-muted-foreground"
                      )
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
            </div>
            <Separator />
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start font-medium"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-secondary/5">
        <div className="flex items-center justify-center h-16 border-b">
          <Link to="/" className="font-bold text-xl font-bubbly">
            LMS Dashboard
          </Link>
        </div>
        <div className="flex flex-col h-full">
          <div className="py-4 flex-1">
            {menuItems &&
              menuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors hover:bg-secondary/5 font-medium",
                      isActive
                        ? "bg-secondary/5 text-secondary-foreground"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
          </div>
          <Separator />
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start font-medium"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold font-round">
                Welcome, {user?.name}!
              </h2>
              <p className="text-muted-foreground">
                {user?.email} ({user?.role})
              </p>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
