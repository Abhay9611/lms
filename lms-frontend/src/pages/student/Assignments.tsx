
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, CheckCircle, AlertCircle, Calendar, BookOpen } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock assignments data with more details for preschool
const assignments = [
  { 
    id: 1, 
    title: 'Draw Your Family',
    description: 'Draw a picture of your family members and color it',
    instructions: 'Take a blank paper and draw all your family members. Color them nicely.',
    dueDate: '2025-04-15',
    status: 'pending',
    subject: 'EVS',
    subjectId: 2,
    subjectColor: 'bg-lms-green',
    textColor: 'text-lms-green'
  },
  { 
    id: 2, 
    title: 'Count the Objects',
    description: 'Count and write the number of objects shown in the worksheet',
    instructions: 'Look at each picture, count how many objects are there, and write the number.',
    dueDate: '2025-04-12',
    status: 'pending',
    subject: 'Maths',
    subjectId: 3,
    subjectColor: 'bg-lms-blue',
    textColor: 'text-lms-blue'
  },
  { 
    id: 3, 
    title: 'Recite Twinkle Twinkle',
    description: 'Practice reciting "Twinkle Twinkle Little Star" rhyme',
    instructions: 'Listen to the rhyme and practice saying it with actions.',
    dueDate: '2025-04-10',
    status: 'pending',
    subject: 'English Rhymes',
    subjectId: 1,
    subjectColor: 'bg-lms-pink',
    textColor: 'text-lms-pink'
  },
  { 
    id: 4, 
    title: 'Color the Shapes',
    description: 'Color the different shapes with specific colors',
    instructions: 'Color circles red, squares blue, and triangles yellow.',
    dueDate: '2025-04-05',
    status: 'completed',
    subject: 'Maths',
    subjectId: 3,
    subjectColor: 'bg-lms-blue',
    textColor: 'text-lms-blue'
  },
  { 
    id: 5, 
    title: 'Match Animals to Their Sounds',
    description: 'Draw lines to match animals with their sounds',
    instructions: 'Draw a line from each animal to the word that shows its sound.',
    dueDate: '2025-04-03',
    status: 'completed',
    subject: 'EVS',
    subjectId: 2,
    subjectColor: 'bg-lms-green',
    textColor: 'text-lms-green'
  },
  { 
    id: 6, 
    title: 'The Three Little Pigs Story',
    description: 'Listen to the story and draw your favorite part',
    instructions: 'After listening to the story, draw the part you liked most.',
    dueDate: '2025-04-01',
    status: 'completed',
    subject: 'Story Time',
    subjectId: 4,
    subjectColor: 'bg-lms-purple',
    textColor: 'text-lms-purple'
  }
];

const Assignments = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignments[0] | null>(null);
  
  return (
    <DashboardLayout>
      <div className="relative">
        <AnimatedCharacters variant="school" density="medium" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <ClipboardList className="mr-3 h-8 w-8" />
            My Assignments
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Here are all your fun activities to complete!
          </p>
        </div>
        
        <Tabs defaultValue="pending" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending" className="text-lg font-bubbly">
              <AlertCircle className="mr-2 h-4 w-4" />
              To Do
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-lg font-bubbly">
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.filter(a => a.status === 'pending').map((assignment) => (
                <Card 
                  key={assignment.id}
                  className="border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <div className={`${assignment.subjectColor} h-3 w-full`}></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={`${assignment.subjectColor} bg-opacity-20 ${assignment.textColor}`}>
                        {assignment.subject}
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h3 className="font-bubbly text-lg mb-2">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {assignment.description}
                    </p>
                    <Button className="w-full">Open Assignment</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {assignments.filter(a => a.status === 'pending').length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-16 w-16 text-lms-green mb-4" />
                <h3 className="text-xl font-bubbly mb-2">All Done!</h3>
                <p className="text-muted-foreground">You have completed all your assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.filter(a => a.status === 'completed').map((assignment) => (
                <Card 
                  key={assignment.id}
                  className="border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer opacity-80 hover:opacity-100"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <div className={`${assignment.subjectColor} h-3 w-full`}></div>
                  <CardContent className="pt-6 relative">
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-6 w-6 text-lms-green fill-lms-green/20" />
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={`${assignment.subjectColor} bg-opacity-20 ${assignment.textColor}`}>
                        {assignment.subject}
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Completed</span>
                      </div>
                    </div>
                    <h3 className="font-bubbly text-lg mb-2">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {assignment.description}
                    </p>
                    <Button variant="outline" className="w-full">View Results</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {assignments.filter(a => a.status === 'completed').length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-16 w-16 text-lms-yellow mb-4" />
                <h3 className="text-xl font-bubbly mb-2">No Completed Tasks</h3>
                <p className="text-muted-foreground">You haven't completed any assignments yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {selectedAssignment && (
          <Card className="border-4 border-dashed mb-8">
            <CardHeader className={`${selectedAssignment.subjectColor} bg-opacity-20`}>
              <div className="flex justify-between items-center">
                <CardTitle className="font-bubbly text-xl flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  {selectedAssignment.title}
                </CardTitle>
                <Badge variant="outline" className={selectedAssignment.textColor}>
                  {selectedAssignment.subject}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Description:</h3>
                  <p>{selectedAssignment.description}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Instructions:</h3>
                  <p>{selectedAssignment.instructions}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <Button onClick={() => setSelectedAssignment(null)}>
                    {selectedAssignment.status === 'completed' ? 'View Results' : 'Start Activity'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
