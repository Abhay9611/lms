
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { studentStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, Smile, Star, Book } from 'lucide-react';
import SubjectCard from '@/components/content/SubjectCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Preschool-specific subjects
const preschoolSubjects = [
  { 
    id: 1, 
    name: 'English Rhymes', 
    description: 'Fun rhymes and songs to learn English sounds and words',
    imageUrl: '/subjects/english.jpg',
    color: 'bg-lms-pink',
    progress: 65
  },
  { 
    id: 2, 
    name: 'EVS', 
    description: 'Explore the world around you through fun activities',
    imageUrl: '/subjects/evs.jpg',
    color: 'bg-lms-green',
    progress: 40
  },
  { 
    id: 3, 
    name: 'Maths', 
    description: 'Learn counting, shapes, and basic math through games',
    imageUrl: '/subjects/math.jpg',
    color: 'bg-lms-blue',
    progress: 30
  },
  { 
    id: 4, 
    name: 'Story Time', 
    description: 'Amazing stories with colorful pictures and fun activities',
    imageUrl: '/subjects/story.jpg',
    color: 'bg-lms-purple',
    progress: 50
  }
];

// Mock assignments data
const assignments = [
  { 
    id: 1, 
    title: 'Draw Your Family', 
    description: 'Draw a picture of your family members',
    dueDate: '2025-04-15',
    subject: 'EVS'
  },
  { 
    id: 2, 
    title: 'Count the Objects', 
    description: 'Count and write the number of objects shown',
    dueDate: '2025-04-12',
    subject: 'Maths'
  },
  { 
    id: 3, 
    title: 'Recite Twinkle Twinkle', 
    description: 'Practice reciting "Twinkle Twinkle Little Star"',
    dueDate: '2025-04-10',
    subject: 'English Rhymes'
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        {/* Add animated characters as background */}
        <AnimatedCharacters variant="school" density="high" />
        
        <WelcomeCard stats={studentStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 transform rotate-12">
                <Star className="h-12 w-12 text-lms-yellow fill-lms-yellow animate-pulse" />
              </div>
              
              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="text-xl font-bubbly flex items-center">
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow mr-2 animate-spin-slow" />
                  My Learning Progress
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow ml-2 animate-spin-slow" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {preschoolSubjects.map((subject) => {
                    return (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-round font-medium flex items-center">
                            <span className={`${subject.color} w-3 h-3 rounded-full mr-2`}></span>
                            {subject.name}
                          </h3>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Smile className={`h-5 w-5 mr-1 ${subject.progress > 50 ? 'text-lms-green' : 'text-lms-yellow'}`} />
                            {subject.progress}% Complete
                          </span>
                        </div>
                        <Progress 
                          value={subject.progress} 
                          className="h-3 rounded-full bg-lms-blue/10"
                          color={subject.progress > 50 ? 'bg-lms-green' : 'bg-lms-yellow'}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 -mt-4 -ml-4 transform -rotate-12">
                <BookOpen className="h-12 w-12 text-lms-purple/70 animate-bounce" />
              </div>
              
              <CardHeader className="bg-lms-purple/10">
                <CardTitle className="text-xl font-bubbly">My Assignments</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-3 border-b border-dashed pb-3 last:border-0">
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
                      <p className="text-xs text-muted-foreground font-medium">{assignment.subject}</p>
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="w-full">
                  View All Assignments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-bubbly flex items-center">
              <BookOpen className="h-6 w-6 text-lms-blue mr-2" />
              My Subjects
            </h2>
            <Button variant="outline" onClick={() => navigate('/student/subjects')} size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {preschoolSubjects.map((subject) => (
              <div 
                key={subject.id} 
                className="bg-white rounded-3xl border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/student/subjects/${subject.id}`)}
              >
                <div className={`${subject.color} h-4 w-full`}></div>
                <div className="p-6">
                  <div className="flex justify-between mb-3">
                    <div className={`${subject.color.replace('bg-', 'text-')} bg-opacity-20 p-2 rounded-full`}>
                      <Book className="h-6 w-6" />
                    </div>
                    <div className="bg-lms-yellow/10 text-lms-yellow px-3 py-1 rounded-full text-xs font-medium">
                      {subject.progress}%
                    </div>
                  </div>
                  <h3 className="font-bubbly text-lg mb-2">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 font-round">
                    {subject.description}
                  </p>
                  <div className="mt-4">
                    <Progress value={subject.progress} className="h-2 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">My Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Star Reader', description: 'Read 5 stories', icon: <BookOpen className="h-10 w-10" />, color: 'bg-lms-blue/10 text-lms-blue' },
                  { title: 'Math Whiz', description: 'Completed counting 1-10', icon: <Award className="h-10 w-10 fill-lms-yellow" />, color: 'bg-lms-green/10 text-lms-green' },
                  { title: 'Song Bird', description: 'Learned 3 rhymes', icon: <Star className="h-10 w-10 fill-lms-yellow" />, color: 'bg-lms-yellow/10 text-lms-yellow' },
                ].map((achievement, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border-2 border-dashed border-lms-purple/30 flex flex-col items-center text-center transform transition-transform hover:scale-105 shadow-md hover:shadow-lg">
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
