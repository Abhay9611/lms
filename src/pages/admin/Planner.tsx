
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ClipboardList, BookOpen, Plus, School, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// Mock planner items
const plannerItems = [
  {
    id: 1,
    title: "Alphabet Recognition Week",
    description: "Focus on letters A-M with interactive activities",
    startDate: "2025-04-01",
    endDate: "2025-04-07",
    gradeLevel: "Pre-Nursery",
    subject: "Language",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Numbers 1-5 Deep Dive",
    description: "Extended activities for number recognition and counting",
    startDate: "2025-04-08",
    endDate: "2025-04-14",
    gradeLevel: "Nursery",
    subject: "Mathematics",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Colors and Shapes Week",
    description: "Identifying basic shapes and primary colors",
    startDate: "2025-04-15",
    endDate: "2025-04-21",
    gradeLevel: "Pre-Nursery",
    subject: "EVS",
    status: "draft"
  },
  {
    id: 4,
    title: "Rhymes and Songs Festival",
    description: "Week of musical learning with interactive rhymes",
    startDate: "2025-04-22",
    endDate: "2025-04-28",
    gradeLevel: "All Grades",
    subject: "Music",
    status: "scheduled"
  }
];

const AdminPlanner = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <ClipboardList className="mr-3 h-8 w-8" />
            Admin Planner
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Plan and organize curriculum and content releases
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bubbly">{MONTHS[currentMonth]} {currentYear}</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-xl bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Planning Item
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Add New Planning Item</SheetTitle>
                <SheetDescription>
                  Create a new curriculum or content planning item
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter item title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Enter description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  <Input placeholder="Select grade level" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Select subject" />
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Plan</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">Curriculum Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {plannerItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl border-2 border-dashed">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bubbly text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-lms-blue" />
                          <span className="text-sm">
                            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge className={item.status === "scheduled" ? "bg-lms-green" : "bg-lms-yellow"}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4 text-lms-green" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4 text-lms-pink" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center text-sm">
                      <School className="h-4 w-4 mr-1 text-lms-purple" />
                      <span>{item.gradeLevel}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-1 text-lms-pink" />
                      <span>{item.subject}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">Content Release Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Content release timeline would go here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly">Grade Level Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {["Pre-Nursery", "Nursery", "LKG", "UKG"].map(grade => (
                  <div key={grade} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <School className="h-5 w-5 mr-2 text-lms-purple" />
                      <span className="font-bubbly">{grade}</span>
                    </div>
                    <Button variant="ghost" size="sm">View Plan</Button>
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

export default AdminPlanner;
