
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import { parentStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, Clock, Bell } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ParentDashboard = () => {
  // Mock children data
  const children = [
    { id: 1, name: 'Sophie Johnson', grade: '9th Grade', avatar: '/placeholder.svg' },
    { id: 2, name: 'Alex Johnson', grade: '6th Grade', avatar: '/placeholder.svg' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard stats={parentStats} />
        
        <Tabs defaultValue={children[0].id.toString()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Children</h2>
            <TabsList>
              {children.map(child => (
                <TabsTrigger key={child.id} value={child.id.toString()}>
                  {child.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {children.map(child => (
            <TabsContent key={child.id} value={child.id.toString()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Subjects" 
                  value={6} 
                  description={`${child.grade}`} 
                  icon={<Users className="h-4 w-4" />}
                />
                <StatCard 
                  title="Weekly Activity" 
                  value="12.5 hrs" 
                  description="↑ 2.3 hrs from last week" 
                  icon={<Clock className="h-4 w-4" />}
                  trend={{ value: 18, isPositive: true }}
                />
                <StatCard 
                  title="Overall Progress" 
                  value="78%" 
                  description="On track for term completion" 
                  icon={<BarChart3 className="h-4 w-4" />}
                  trend={{ value: 5, isPositive: true }}
                />
                <StatCard 
                  title="Upcoming Tests" 
                  value={3} 
                  description="Next test: Mathematics (Apr 15)" 
                  icon={<Bell className="h-4 w-4" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {['Mathematics', 'Science', 'Literature', 'History'].map((subject, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{subject}</h3>
                            <div className="flex items-center">
                              <Badge variant={i === 0 ? "default" : i === 1 ? "secondary" : "outline"}>
                                {i === 0 ? 'A' : i === 1 ? 'B+' : i === 2 ? 'A-' : 'B'}
                              </Badge>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {75 + Math.floor(Math.random() * 25)}%
                              </span>
                            </div>
                          </div>
                          <Progress value={75 + Math.floor(Math.random() * 25)} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { activity: 'Completed Quiz', subject: 'Algebra', result: '90%', time: '3 hours ago' },
                        { activity: 'Watched Video', subject: 'Physics', result: null, time: '5 hours ago' },
                        { activity: 'Read Chapter', subject: 'Literature', result: null, time: 'Yesterday' },
                        { activity: 'Submitted Assignment', subject: 'History', result: 'Pending', time: 'Yesterday' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start gap-4 border-b border-border pb-3 last:border-0">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={children[0].avatar} />
                            <AvatarFallback>{children[0].name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{activity.activity}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.subject} {activity.result && `- ${activity.result}`}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Time Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Subject time distribution chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
