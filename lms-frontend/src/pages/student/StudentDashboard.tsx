import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Gamepad2, BarChart2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bubbly font-bold text-primary">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Your learning journey continues here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-lms-blue" />
                My Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bubbly font-bold">4</p>
              <p className="text-sm text-muted-foreground">Active subjects</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Users className="h-5 w-5 mr-2 text-lms-green" />
                My Teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bubbly font-bold">3</p>
              <p className="text-sm text-muted-foreground">Active teachers</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Gamepad2 className="h-5 w-5 mr-2 text-lms-pink" />
                Learning Games
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bubbly font-bold">12</p>
              <p className="text-sm text-muted-foreground">Available games</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-purple/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-lms-purple" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bubbly font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Overall progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 