import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { assignments } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '09:00 AM', title: 'Algebra Class', location: 'Room 101' },
                  { time: '11:30 AM', title: 'Office Hours', location: 'Room 204' },
                  { time: '01:15 PM', title: 'Geometry Class', location: 'Room 101' },
                  { time: '03:00 PM', title: 'Department Meeting', location: 'Conference Room' },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-border pb-3">
                    <div className="w-16 text-sm font-medium text-muted-foreground">
                      {event.time}
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start gap-4 border-b border-border pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{assignment.title}</p>
                        <Badge variant="outline" className="ml-2">
                          Due {new Date(assignment.dueDate).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assignment.description}
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

export default TeacherDashboard;
