import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePen, Plus, Book, CheckCircle, Circle, Calendar, GraduationCap, BookOpen, List, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

// Mock lesson plans
const lessonPlans = [
  {
    id: 1,
    title: "Alphabet Recognition",
    subject: "English",
    date: "2025-04-15",
    status: "completed",
    objectives: ["Recognize letters A-E", "Match letters to sounds", "Practice writing letters"],
    materials: ["Alphabet flashcards", "Letter tracing worksheets", "ABC song audio"],
    activities: ["Alphabet song", "Letter recognition game", "Tracing practice"]
  },
  {
    id: 2,
    title: "Counting Numbers 1-5",
    subject: "Maths",
    date: "2025-04-16",
    status: "upcoming",
    objectives: ["Count objects from 1-5", "Recognize number symbols", "Match quantities to numbers"],
    materials: ["Number flashcards", "Counting objects", "Number worksheets"],
    activities: ["Counting song", "Number hunt game", "Counting practice with objects"]
  },
  {
    id: 3,
    title: "Colors Around Us",
    subject: "EVS",
    date: "2025-04-17",
    status: "in-progress",
    objectives: ["Identify primary colors", "Match objects to colors", "Color mixing introduction"],
    materials: ["Color flashcards", "Sorting objects", "Coloring worksheets"],
    activities: ["Color song", "Color scavenger hunt", "Sorting by color activity"]
  },
  {
    id: 4,
    title: "My Family",
    subject: "EVS",
    date: "2025-04-18",
    status: "upcoming",
    objectives: ["Identify family members", "Understand family relationships", "Draw a family picture"],
    materials: ["Family flashcards", "Family tree template", "Drawing materials"],
    activities: ["Family song", "Family role-play", "Family drawing activity"]
  },
  {
    id: 5,
    title: "Shapes in Our World",
    subject: "Maths",
    date: "2025-04-19",
    status: "upcoming",
    objectives: ["Identify basic shapes", "Find shapes in the environment", "Create shapes with materials"],
    materials: ["Shape flashcards", "Shape sorting toys", "Shape worksheets"],
    activities: ["Shape song", "Shape hunt", "Shape collage activity"]
  }
];

const TeacherPlanner = () => {
  const { toast } = useToast();
  
  const handleAddLessonPlan = () => {
    toast({
      title: "Create Lesson Plan",
      description: "This would open a form to create a new lesson plan in a real application",
    });
  };
  
  const handleCompleteLessonPlan = (id: number) => {
    toast({
      title: "Lesson Plan Completed",
      description: "The lesson plan has been marked as completed",
    });
  };
  
  const handleEditLessonPlan = (id: number) => {
    toast({
      title: "Edit Lesson Plan",
      description: "This would open a form to edit the lesson plan in a real application",
    });
  };

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="relative mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <FilePen className="mr-3 h-8 w-8" />
              Lesson Planner
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Plan and organize your teaching activities
            </p>
          </div>
          
          <Button className="rounded-xl bg-primary" onClick={handleAddLessonPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lesson Plan
          </Button>
        </div>
        
        <Tabs defaultValue="play-home" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="play-home">Play Home</TabsTrigger>
              <TabsTrigger value="nursery">Nursery</TabsTrigger>
              <TabsTrigger value="lkg">LKG</TabsTrigger>
              <TabsTrigger value="ukg">UKG</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="rounded-xl">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="maths">Maths</SelectItem>
                  <SelectItem value="evs">EVS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="play-home" className="mt-0">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">This Week's Lesson Plans</CardTitle>
            </CardHeader>
            <p className="text-muted-foreground mb-6 font-round">Flipbook goes here</p>
          </TabsContent>
          <TabsContent value="nursery" className="mt-0">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">This Week's Lesson Plans</CardTitle>
            </CardHeader>
            <p className="text-muted-foreground mb-6 font-round">Flipbook goes here</p>
          </TabsContent>
          <TabsContent value="lkg" className="mt-0">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">This Week's Lesson Plans</CardTitle>
            </CardHeader>
            <p className="text-muted-foreground mb-6 font-round">Flipbook goes here</p>
          </TabsContent>
          <TabsContent value="ukg" className="mt-0">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly">This Week's Lesson Plans</CardTitle>
            </CardHeader>
            <p className="text-muted-foreground mb-6 font-round">Flipbook goes here</p>
          </TabsContent>
          
          <TabsContent value="current" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">This Week's Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lessonPlans.slice(0, 3).map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Badge className={`
                                ${plan.status === 'completed' ? 'bg-lms-green' : 
                                  plan.status === 'in-progress' ? 'bg-lms-yellow' : 
                                  'bg-lms-blue'}
                              `}>
                                {plan.status}
                              </Badge>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {new Date(plan.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <BookOpen className="h-3.5 w-3.5 mr-1" />
                              <span>{plan.subject}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-lms-green"
                              onClick={() => handleCompleteLessonPlan(plan.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {plan.status === 'completed' ? 'Completed' : 'Mark Complete'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditLessonPlan(plan.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-lms-blue/10">
                  <CardTitle className="text-xl font-bubbly flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-lms-blue" />
                    Teaching Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { title: "Alphabet Flashcards", type: "Visual Aid", icon: <Book className="h-4 w-4" /> },
                      { title: "Number Songs Collection", type: "Audio", icon: <BookText className="h-4 w-4" /> },
                      { title: "Colors and Shapes Presentation", type: "Slides", icon: <BookOpen className="h-4 w-4" /> },
                      { title: "Nursery Classroom Activities", type: "Guide", icon: <List className="h-4 w-4" /> }
                    ].map((resource, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-lms-blue/20 rounded-full flex items-center justify-center text-lms-blue">
                            {resource.icon}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">{resource.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full rounded-xl">
                      Browse Resource Library
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-lms-pink/10">
                  <CardTitle className="text-xl font-bubbly flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-lms-pink" />
                    Lesson Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { title: "Prepare flashcards for alphabet lesson", completed: true },
                      { title: "Print number worksheets for Tuesday", completed: true },
                      { title: "Set up color mixing activity materials", completed: false },
                      { title: "Record attendance for Monday's class", completed: true },
                      { title: "Prepare family tree templates", completed: false },
                      { title: "Review shapes lesson plan", completed: false }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.completed ? 'bg-lms-green text-white' : 'bg-muted'}`}>
                          {item.completed ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Circle className="h-3 w-3" />
                          )}
                        </div>
                        <span className={`ml-3 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.title}
                        </span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between mt-4 pt-3 border-t">
                      <span className="text-sm text-muted-foreground">3 of 6 tasks completed</span>
                      <Button variant="ghost" size="sm" className="text-lms-pink h-auto p-0">
                        Add Task
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="text-xl font-bubbly">Upcoming Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lessonPlans.filter(plan => plan.status === 'upcoming').map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-blue p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Badge className="bg-lms-blue">
                                upcoming
                              </Badge>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {new Date(plan.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <BookOpen className="h-3.5 w-3.5 mr-1" />
                              <span>{plan.subject}</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditLessonPlan(plan.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Completed Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lessonPlans.filter(plan => plan.status === 'completed').map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Badge className="bg-lms-green">
                                completed
                              </Badge>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {new Date(plan.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <BookOpen className="h-3.5 w-3.5 mr-1" />
                              <span>{plan.subject}</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditLessonPlan(plan.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="border-4 border-lms-yellow/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-yellow/10">
            <CardTitle className="text-xl font-bubbly">Lesson Plan Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {lessonPlans.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bubbly font-bold">{lessonPlans[2].title}</h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                      <span>{lessonPlans[2].subject}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(lessonPlans[2].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Badge className="bg-lms-yellow self-start md:self-auto">
                    in-progress
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-bubbly font-medium text-lg flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-lms-green" />
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2">
                      {lessonPlans[2].objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-lms-green/20 flex items-center justify-center text-lms-green mt-0.5 mr-2">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bubbly font-medium text-lg flex items-center">
                      <Book className="h-4 w-4 mr-2 text-lms-blue" />
                      Materials Needed
                    </h3>
                    <ul className="space-y-2">
                      {lessonPlans[2].materials.map((material, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-lms-blue/20 flex items-center justify-center text-lms-blue mt-0.5 mr-2">
                            <Circle className="h-3 w-3" />
                          </div>
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bubbly font-medium text-lg flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-lms-pink" />
                      Activities
                    </h3>
                    <ul className="space-y-2">
                      {lessonPlans[2].activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-lms-pink/20 flex items-center justify-center text-lms-pink mt-0.5 mr-2">
                            <Circle className="h-3 w-3" />
                          </div>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                  <Button variant="outline" className="rounded-xl">
                    Export as PDF
                  </Button>
                  <Button className="rounded-xl bg-lms-yellow text-primary" onClick={() => handleEditLessonPlan(lessonPlans[2].id)}>
                    Edit Lesson Plan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherPlanner;
