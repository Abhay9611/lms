
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, BookOpen, BarChart3, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Badge } from '@/components/ui/badge';

// Mock students data
const students = [
  {
    id: 1,
    name: "Emma Thompson",
    age: 5,
    avatar: "/avatars/child1.jpg",
    attendance: 95,
    progress: 78,
    topSubject: "English Rhymes",
    needsAttention: false
  },
  {
    id: 2,
    name: "Noah Johnson",
    age: 4,
    avatar: "/avatars/child2.jpg",
    attendance: 88,
    progress: 65,
    topSubject: "Story Time",
    needsAttention: false
  },
  {
    id: 3,
    name: "Sophia Williams",
    age: 5,
    avatar: "/avatars/child3.jpg",
    attendance: 92,
    progress: 82,
    topSubject: "EVS",
    needsAttention: false
  },
  {
    id: 4,
    name: "William Brown",
    age: 4,
    avatar: "/avatars/child4.jpg",
    attendance: 75,
    progress: 60,
    topSubject: "Maths",
    needsAttention: true
  },
  {
    id: 5,
    name: "Olivia Garcia",
    age: 5,
    avatar: "/avatars/child5.jpg",
    attendance: 90,
    progress: 75,
    topSubject: "English Rhymes",
    needsAttention: false
  }
];

const StudentsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Users className="mr-3 h-8 w-8" />
            My Students
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Monitor your students' progress and manage their learning journey
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
              className="pl-10 rounded-xl border-2"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-2">
              <BookOpen className="h-4 w-4 mr-2" />
              View Assignments
            </Button>
            
            <Button className="rounded-xl bg-primary">
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map(student => (
            <Card key={student.id} className={`border-4 ${student.needsAttention ? 'border-lms-yellow/50' : 'border-lms-blue/30'} rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
              <CardHeader className={`${student.needsAttention ? 'bg-lms-yellow/10' : 'bg-lms-blue/10'} pb-2`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-white mr-3">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-lms-purple/20 text-lms-purple">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg font-bubbly">
                      {student.name}
                      <div className="text-sm font-normal text-muted-foreground">
                        Age: {student.age}
                      </div>
                    </CardTitle>
                  </div>
                  {student.needsAttention && (
                    <Badge className="bg-lms-yellow">Needs Attention</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-dashed">
                    <div className="text-sm text-muted-foreground mb-1">Progress</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-lms-green/10 text-lms-green">
                            {student.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-lms-green/10 mt-1">
                        <div style={{ width: `${student.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lms-green"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-dashed">
                    <div className="text-sm text-muted-foreground mb-1">Attendance</div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-lms-blue/10 text-lms-blue">
                            {student.attendance}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-lms-blue/10 mt-1">
                        <div style={{ width: `${student.attendance}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lms-blue"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 py-2 border-t border-dashed">
                  <Star className="h-5 w-5 text-lms-yellow fill-lms-yellow" />
                  <div>
                    <div className="text-xs text-muted-foreground">Top Subject</div>
                    <div className="text-sm font-medium">{student.topSubject}</div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg">
                    <Award className="h-3.5 w-3.5 mr-1" />
                    Achievements
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg">
                    <BarChart3 className="h-3.5 w-3.5 mr-1" />
                    Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-purple/10">
            <CardTitle className="text-xl font-bubbly">Class Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-blue/30 flex flex-col items-center">
                <div className="bg-lms-blue/10 p-3 rounded-full mb-2">
                  <Users className="h-6 w-6 text-lms-blue" />
                </div>
                <div className="text-3xl font-bubbly font-bold">{students.length}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-green/30 flex flex-col items-center">
                <div className="bg-lms-green/10 p-3 rounded-full mb-2">
                  <BarChart3 className="h-6 w-6 text-lms-green" />
                </div>
                <div className="text-3xl font-bubbly font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Progress</div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-pink/30 flex flex-col items-center">
                <div className="bg-lms-pink/10 p-3 rounded-full mb-2">
                  <BookOpen className="h-6 w-6 text-lms-pink" />
                </div>
                <div className="text-3xl font-bubbly font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-yellow/30 flex flex-col items-center">
                <div className="bg-lms-yellow/10 p-3 rounded-full mb-2">
                  <Award className="h-6 w-6 text-lms-yellow" />
                </div>
                <div className="text-3xl font-bubbly font-bold">
                  {students.filter(s => s.progress >= 75).length}
                </div>
                <div className="text-sm text-muted-foreground">High Performers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
