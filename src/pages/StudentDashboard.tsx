
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { studentStats, subjects, books, assignments } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award } from 'lucide-react';
import SubjectCard from '@/components/content/SubjectCard';
import BookCard from '@/components/content/BookCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  // Get 3 recent books
  const recentBooks = books.slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeCard stats={studentStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.slice(0, 3).map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{subject.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 100)}% Complete
                        </span>
                      </div>
                      <Progress value={Math.floor(Math.random() * 100)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                    <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{assignment.title}</p>
                        <Badge variant="outline" className="text-xs">
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
            <h2 className="text-2xl font-bold">Explore Subjects</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently Viewed Books</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Fast Learner', description: 'Completed 5 topics in one day', icon: <Award className="h-8 w-8" /> },
                  { title: 'Bookworm', description: 'Read 10 books', icon: <BookOpen className="h-8 w-8" /> },
                  { title: 'Perfect Score', description: 'Got 100% on a quiz', icon: <Award className="h-8 w-8" /> },
                ].map((achievement, i) => (
                  <div key={i} className="bg-primary/5 rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mb-3">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
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
