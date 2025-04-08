
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Clock, BarChart3, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Badge } from '@/components/ui/badge';

// Mock children data
const children = [
  {
    id: 1,
    name: "Emma Thompson",
    age: 5,
    grade: "Preschool",
    avatar: "/avatars/child1.jpg",
    progress: 72,
    school: "Little Learners Preschool",
    recentActivity: [
      { id: 1, activity: "Completed 'Counting 1-10' exercise", date: "Today", subject: "Maths" },
      { id: 2, activity: "Read 'The Three Little Pigs'", date: "Yesterday", subject: "Story Time" }
    ],
    subjects: [
      { id: 1, name: "English Rhymes", progress: 80, icon: <BookOpen className="h-4 w-4" /> },
      { id: 2, name: "EVS", progress: 65, icon: <Star className="h-4 w-4" /> },
      { id: 3, name: "Maths", progress: 70, icon: <Clock className="h-4 w-4" /> },
      { id: 4, name: "Story Time", progress: 75, icon: <BookOpen className="h-4 w-4" /> }
    ],
    achievements: [
      { id: 1, title: "Star Reader", date: "March 15, 2025" },
      { id: 2, title: "Maths Whiz", date: "April 2, 2025" }
    ]
  },
  {
    id: 2,
    name: "Noah Johnson",
    age: 4,
    grade: "Nursery",
    avatar: "/avatars/child2.jpg",
    progress: 58,
    school: "Little Learners Preschool",
    recentActivity: [
      { id: 1, activity: "Learned 'Twinkle Twinkle Little Star'", date: "Today", subject: "English Rhymes" },
      { id: 2, activity: "Identified different animals", date: "2 days ago", subject: "EVS" }
    ],
    subjects: [
      { id: 1, name: "English Rhymes", progress: 85, icon: <BookOpen className="h-4 w-4" /> },
      { id: 2, name: "EVS", progress: 55, icon: <Star className="h-4 w-4" /> },
      { id: 3, name: "Maths", progress: 45, icon: <Clock className="h-4 w-4" /> },
      { id: 4, name: "Story Time", progress: 60, icon: <BookOpen className="h-4 w-4" /> }
    ],
    achievements: [
      { id: 1, title: "Song Bird", date: "March 28, 2025" }
    ]
  }
];

const ChildrenPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="forest" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Users className="mr-3 h-8 w-8" />
            My Children
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Monitor your children's progress and learning journey
          </p>
        </div>
        
        {children.map(child => (
          <div key={child.id} className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 border-4 border-white mr-4">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback className="bg-lms-purple/20 text-lms-purple text-xl">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bubbly">{child.name}</CardTitle>
                    <CardDescription className="font-round">
                      Age: {child.age} • Grade: {child.grade} • {child.school}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">Overall Progress</div>
                  <div className="w-full max-w-[200px] bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-lms-green rounded-full" 
                      style={{ width: `${child.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{child.progress}% Complete</div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bubbly text-lg mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-lms-blue" />
                      Subjects Progress
                    </h3>
                    <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-dashed border-lms-blue/30">
                      {child.subjects.map(subject => (
                        <div key={subject.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="p-1.5 rounded-full bg-lms-blue/10 text-lms-blue mr-2">
                                {subject.icon}
                              </div>
                              <span className="text-sm font-medium">{subject.name}</span>
                            </div>
                            <span className="text-xs">{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bubbly text-lg mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-lms-pink" />
                      Recent Activities
                    </h3>
                    <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-dashed border-lms-pink/30">
                      {child.recentActivity.map(activity => (
                        <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-dashed last:border-0 last:pb-0">
                          <div className="p-2 rounded-full bg-lms-pink/20 text-lms-pink">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.activity}</p>
                            <div className="flex justify-between mt-1">
                              <Badge variant="outline" className="text-xs bg-lms-yellow/10 text-lms-yellow border-lms-yellow">
                                {activity.subject}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bubbly text-lg mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-lms-yellow" />
                      Achievements
                    </h3>
                    <div className="space-y-4 bg-white p-4 rounded-2xl border-2 border-dashed border-lms-yellow/30">
                      {child.achievements.map(achievement => (
                        <div key={achievement.id} className="flex items-center space-x-3 pb-3 border-b border-dashed last:border-0 last:pb-0">
                          <div className="p-2 rounded-full bg-lms-yellow/20 text-lms-yellow">
                            <Star className="h-4 w-4 fill-lms-yellow" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <span className="text-xs text-muted-foreground">{achievement.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-lms-green rounded-xl">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ChildrenPage;
