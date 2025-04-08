
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import { adminStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, BookOpen, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard stats={adminStats} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Schools" 
            value={12} 
            description="2 new this month" 
            icon={<School className="h-4 w-4" />}
            trend={{ value: 20, isPositive: true }}
          />
          <StatCard 
            title="Teachers" 
            value={87} 
            description="14 pending approval" 
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Students" 
            value={2453} 
            description="↑ 12% from last month" 
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Books" 
            value={156} 
            description="23 added this month" 
            icon={<BookOpen className="h-4 w-4" />}
            trend={{ value: 17, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Analytics chart would go here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-border pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {i % 3 === 0 ? (
                        <BookOpen className="h-5 w-5" />
                      ) : i % 2 === 0 ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <School className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {i % 3 === 0
                          ? 'New content uploaded'
                          : i % 2 === 0
                          ? 'New teacher registered'
                          : 'School settings updated'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 60)} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
