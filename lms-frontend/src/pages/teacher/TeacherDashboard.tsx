import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Calendar',
      description: 'View and manage your class schedule',
      icon: <Calendar className="h-6 w-6" />,
      path: '/teacher/calendar',
    },
    {
      title: 'Lesson Planner',
      description: 'Create and manage your lesson plans',
      icon: <BookOpen className="h-6 w-6" />,
      path: '/teacher/planner',
    },
    {
      title: 'Students',
      description: 'View and manage your students',
      icon: <Users className="h-6 w-6" />,
      path: '/teacher/students',
    },
    {
      title: 'Assignments',
      description: 'Create and grade assignments',
      icon: <FileText className="h-6 w-6" />,
      path: '/teacher/assignments',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your teaching dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <Card key={item.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(item.path)}
              >
                View {item.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 