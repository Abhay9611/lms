import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  Calendar,
  BookText,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const StudentLinks = [
  {
    title: "Dashboard",
    href: "/student",
    icon: Home,
  },
  {
    title: "Subjects",
    href: "/student/subjects",
    icon: BookOpen,
  },
  {
    title: "Games",
    href: "/student/games",
    icon: Gamepad2,
  },
  {
    title: "Progress",
    href: "/student/progress",
    icon: BarChart2,
  },
];

const TeacherLinks = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: Home,
  },
  {
    title: "Calendar",
    href: "/teacher/calendar",
    icon: Calendar,
  },
  {
    title: "Planner",
    href: "/teacher/planner",
    icon: ListTodo,
  },
  {
    title: "Resources",
    href: "/teacher/resources",
    icon: BookText,
  },
];

const AdminLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Schools",
    href: "/admin/schools",
    icon: BookOpen,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: User,
  },
  {
    title: "Activation Codes",
    href: "/admin/codes",
    icon: BookOpen,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: Gamepad2,
  },
  {
    title: "Calendar",
    href: "/admin/calendar",
    icon: BookOpen,
  },
  {
    title: "Planner",
    href: "/admin/planner",
    icon: ListTodo,
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
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

  let menuItems;
  switch (user?.role) {
    case UserRole.ADMIN:
      menuItems = adminMenuItems;
      break;
    case UserRole.TEACHER:
      menuItems = teacherMenuItems;
      break;
    case UserRole.STUDENT:
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
          <SheetHeader className="pl-0 pb-4 pt-6">
            <img
              src="/logo.png"
              alt="Aspiring Gems Logo"
              className="h-24 w-64 md:h-24 md:w-64 object-contain"
            />
            <SheetDescription>
              Navigate through your learning journey.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full justify-start rounded-xl ${item.active ? "bg-primary/10 text-primary" : ""
                    }`}
                  onClick={() => {
                    navigate(item.href);
                    setIsSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-gradient-to-b from-primary/5 to-background">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Aspiring Gems Logo"
              className="h-24 w-64 md:h-24 md:w-64 object-contain"
            />
          </div>
        </div>
        <Separator />
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start rounded-xl ${item.active ? "bg-primary/10 text-primary" : ""
                }`}
              onClick={() => navigate(item.href)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.title}
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-background to-primary/5">
        <header className="h-16 border-b bg-white/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bubbly font-bold text-primary">
              {menuItems.find((item) => item.active)?.title || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 border-2 border-primary">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}`}
              />
              <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
