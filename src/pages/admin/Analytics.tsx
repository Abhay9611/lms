
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, School, BookOpen, LineChart, PieChart } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <BarChart3 className="mr-3 h-8 w-8" />
            Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Monitor performance metrics across the BookWorm Academy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Users className="h-5 w-5 mr-2 text-lms-pink" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bubbly font-bold">2,549</p>
                </div>
                <div className="flex items-center text-lms-green">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">User growth chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <School className="h-5 w-5 mr-2 text-lms-green" />
                School Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Completion</p>
                  <p className="text-3xl font-bubbly font-bold">78%</p>
                </div>
                <div className="flex items-center text-lms-green">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+5.2%</span>
                </div>
              </div>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">School performance chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-lms-blue" />
                Content Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Engagement Score</p>
                  <p className="text-3xl font-bubbly font-bold">92%</p>
                </div>
                <div className="flex items-center text-lms-green">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+3.7%</span>
                </div>
              </div>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Engagement chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-purple/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-lms-purple" />
                Learning Progress Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Learning progress trends chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-yellow/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-yellow/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-lms-yellow" />
                Subject Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Subject distribution chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">Detailed Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { title: "Total Schools", value: "12", icon: <School className="h-4 w-4" />, color: "bg-lms-blue/10 text-lms-blue" },
                  { title: "Active Teachers", value: "87", icon: <Users className="h-4 w-4" />, color: "bg-lms-green/10 text-lms-green" },
                  { title: "Students Enrolled", value: "2,453", icon: <Users className="h-4 w-4" />, color: "bg-lms-pink/10 text-lms-pink" },
                  { title: "Total Content Items", value: "156", icon: <BookOpen className="h-4 w-4" />, color: "bg-lms-purple/10 text-lms-purple" }
                ].map((stat, index) => (
                  <div key={index} className="p-4 rounded-xl border-2 border-dashed">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bubbly font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Detailed analytics dashboard would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
