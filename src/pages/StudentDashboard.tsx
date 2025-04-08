
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { studentStats, subjects, books, assignments } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, Smile, Star } from 'lucide-react';
import SubjectCard from '@/components/content/SubjectCard';
import BookCard from '@/components/content/BookCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const StudentDashboard = () => {
  // Get 3 recent books
  const recentBooks = books.slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        {/* Add animated characters as background */}
        <AnimatedCharacters variant="school" density="low" />
        
        <WelcomeCard stats={studentStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="text-xl font-bubbly flex items-center">
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow mr-2 animate-spin-slow" />
                  My Learning Progress
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow ml-2 animate-spin-slow" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {subjects.slice(0, 3).map((subject) => {
                    const progress = Math.floor(Math.random() * 100);
                    return (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-round font-medium">{subject.name}</h3>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Smile className={`h-5 w-5 mr-1 ${progress > 70 ? 'text-lms-green' : 'text-lms-yellow'}`} />
                            {progress}% Complete
                          </span>
                        </div>
                        <Progress 
                          value={progress} 
                          className="h-3 rounded-full bg-lms-blue/10"
                          color={progress > 70 ? 'bg-lms-green' : 'bg-lms-yellow'}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-purple/10">
                <CardTitle className="text-xl font-bubbly">Upcoming Assignments</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                    <div className="mt-1 w-10 h-10 rounded-full bg-lms-pink/20 flex items-center justify-center text-lms-pink">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium font-round">{assignment.title}</p>
                        <Badge variant="outline" className="text-xs bg-lms-yellow/10 text-lms-yellow border-lms-yellow">
                          Due {new Date(assignment.dueDate).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-bubbly flex items-center">
              <BookOpen className="h-6 w-6 text-lms-blue mr-2" />
              Explore Subjects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-bubbly flex items-center">
              <BookOpen className="h-6 w-6 text-lms-green mr-2" />
              Recently Viewed Books
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
        
        <div>
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Fast Learner', description: 'Completed 5 topics in one day', icon: <Award className="h-10 w-10" />, color: 'bg-lms-blue/10 text-lms-blue' },
                  { title: 'Bookworm', description: 'Read 10 books', icon: <BookOpen className="h-10 w-10" />, color: 'bg-lms-green/10 text-lms-green' },
                  { title: 'Perfect Score', description: 'Got 100% on a quiz', icon: <Star className="h-10 w-10 fill-lms-yellow" />, color: 'bg-lms-yellow/10 text-lms-yellow' },
                ].map((achievement, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border-2 border-dashed border-lms-purple/30 flex flex-col items-center text-center transform transition-transform hover:scale-105 shadow-md">
                    <div className={`${achievement.color} p-4 rounded-full mb-3 animate-bounce`}>
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold font-bubbly text-lg">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-round">{achievement.description}</p>
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

export default StudentDashboard;
