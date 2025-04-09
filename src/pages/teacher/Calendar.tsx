
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, Clock, Users, BookOpen, Trash2, Edit, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Alphabet Song Class",
    date: new Date(2025, 3, 10),
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    type: "class",
    grade: "Nursery",
    description: "Teaching the alphabet song with actions"
  },
  {
    id: 2,
    title: "Shapes & Colors Activity",
    date: new Date(2025, 3, 10),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "activity",
    grade: "Nursery",
    description: "Interactive activity to identify shapes and colors"
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    date: new Date(2025, 3, 12),
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    type: "meeting",
    grade: "All Grades",
    description: "Quarterly progress discussion with parents"
  },
  {
    id: 4,
    title: "Numbers 1-10 Class",
    date: new Date(2025, 3, 15),
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    type: "class",
    grade: "Nursery",
    description: "Teaching to count numbers from 1 to 10"
  },
  {
    id: 5,
    title: "Story Time: Three Little Pigs",
    date: new Date(2025, 3, 15),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "story",
    grade: "Nursery",
    description: "Reading and acting out the story of Three Little Pigs"
  }
];

// Helper to format date as YYYY-MM-DD for comparison
const formatDateForCompare = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const TeacherCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const selectedDateEvents = date 
    ? mockEvents.filter(event => 
        formatDateForCompare(event.date) === formatDateForCompare(date)
      )
    : [];
    
  // Days with events for highlighting in the calendar
  const daysWithEvents = mockEvents.map(event => event.date);
  
  const addEvent = () => {
    toast({
      title: "Add event",
      description: "This would open an event creation form in a real application",
    });
  };
  
  const deleteEvent = (id: number) => {
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar",
    });
  };
  
  const editEvent = (id: number) => {
    toast({
      title: "Edit event",
      description: "This would open an event editing form in a real application",
    });
  };

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="relative mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <CalendarIcon className="mr-3 h-8 w-8" />
              Teacher Calendar
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Plan your classes and activities
            </p>
          </div>
          
          <Button className="rounded-xl bg-primary" onClick={addEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-1">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">Select Date</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  event: daysWithEvents,
                }}
                modifiersStyles={{
                  event: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderRadius: '100%'
                  }
                }}
              />
              
              <div className="mt-4 flex justify-center">
                <Button 
                  variant="outline" 
                  className="rounded-xl"
                  onClick={() => setDate(new Date())}
                >
                  Today
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-xl font-bubbly">
                {date ? (
                  <span>Events for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                ) : (
                  <span>No Date Selected</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="border-2 border-dashed rounded-xl p-4 hover:border-solid transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Badge className={`
                              ${event.type === 'class' ? 'bg-lms-green' : 
                                event.type === 'activity' ? 'bg-lms-blue' : 
                                event.type === 'story' ? 'bg-lms-purple' : 
                                'bg-lms-pink'}
                            `}>
                              {event.type}
                            </Badge>
                            <span className="ml-2 text-xs text-muted-foreground">{event.grade}</span>
                          </div>
                          <h3 className="text-lg font-bubbly font-bold mt-1">{event.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          <p className="mt-2 text-sm">{event.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => editEvent(event.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  {date ? (
                    <div className="space-y-3">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-bubbly">No Events Scheduled</h3>
                      <p className="text-muted-foreground">
                        There are no events scheduled for this date. Click "Add Event" to create one.
                      </p>
                      <Button 
                        className="mt-4 rounded-xl" 
                        onClick={addEvent}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </div>
                  ) : (
                    <p>Please select a date to view events</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-green/10">
            <CardTitle className="text-xl font-bubbly flex items-center">
              <Users className="h-5 w-5 mr-2 text-lms-green" />
              Upcoming Events (Next 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {mockEvents
                .filter(event => {
                  const today = new Date();
                  const nextWeek = new Date();
                  nextWeek.setDate(today.getDate() + 7);
                  return event.date >= today && event.date <= nextWeek;
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                  >
                    <div className="w-14 text-center">
                      <div className="text-lg font-bold">{event.date.getDate()}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <Badge className={`
                          ${event.type === 'class' ? 'bg-lms-green' : 
                            event.type === 'activity' ? 'bg-lms-blue' : 
                            event.type === 'story' ? 'bg-lms-purple' : 
                            'bg-lms-pink'}
                        `}>
                          {event.type}
                        </Badge>
                        <span className="ml-2 text-xs">{event.grade}</span>
                      </div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => editEvent(event.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="rounded-xl">
            Print Calendar
          </Button>
          <Button className="rounded-xl">
            Share Calendar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherCalendar;
