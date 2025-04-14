
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

// Mock schools data
const schools = [
  {
    id: 1,
    name: "Little Learners Preschool",
    location: "123 Education Ave, Learning City",
    students: 85,
    teachers: 12,
    established: "2020"
  },
  {
    id: 2,
    name: "Tiny Tots Academy",
    location: "456 Knowledge St, Wisdom Town",
    students: 65,
    teachers: 8,
    established: "2018"
  },
  {
    id: 3,
    name: "FirstSteps Montessori",
    location: "789 Discovery Blvd, Growth Village",
    students: 120,
    teachers: 15,
    established: "2015"
  },
  {
    id: 4,
    name: "BrightStart Kindergarten",
    location: "101 Curiosity Lane, Progress City",
    students: 95,
    teachers: 10,
    established: "2019"
  }
];

const Schools = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <School className="mr-3 h-8 w-8" />
            Schools Management
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage all preschools in the BookWorm Academy network
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search schools..." 
              className="pl-10 rounded-xl border-2"
            />
          </div>
          
          <Button className="rounded-xl bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add School
          </Button>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">Preschools Network</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-muted">
                    <th className="px-4 py-3 text-left font-bubbly text-primary">School Name</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Location</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Students</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Teachers</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Established</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map(school => (
                    <tr key={school.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 font-medium">{school.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{school.location}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Users className="h-4 w-4 mr-2 text-lms-blue" />
                          {school.students}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <School className="h-4 w-4 mr-2 text-lms-green" />
                          {school.teachers}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">{school.established}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-blue">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-pink">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">School Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-blue/30 flex flex-col items-center">
                  <div className="bg-lms-blue/10 p-3 rounded-full mb-2">
                    <School className="h-6 w-6 text-lms-blue" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">{schools.length}</div>
                  <div className="text-sm text-muted-foreground">Total Schools</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-green/30 flex flex-col items-center">
                  <div className="bg-lms-green/10 p-3 rounded-full mb-2">
                    <Users className="h-6 w-6 text-lms-green" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">
                    {schools.reduce((sum, school) => sum + school.students, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden md:col-span-2">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { text: "New teacher added to Little Learners Preschool", time: "2 hours ago" },
                  { text: "FirstSteps Montessori updated their curriculum", time: "Yesterday" },
                  { text: "10 new students enrolled in Tiny Tots Academy", time: "2 days ago" },
                  { text: "BrightStart Kindergarten reported monthly progress", time: "1 week ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-dashed last:border-0 last:pb-0">
                    <div className="mt-0.5 p-2 rounded-full bg-lms-purple/20 text-lms-purple">
                      <School className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.text}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
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

export default Schools;
