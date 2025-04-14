
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, FileText, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const AdminCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());

  // Mock events data
  const events = [
    { id: 1, title: 'New Book Releases', date: new Date(2025, 3, 15), type: 'content' },
    { id: 2, title: 'Teacher Training', date: new Date(2025, 3, 20), type: 'staff' },
    { id: 3, title: 'System Maintenance', date: new Date(2025, 3, 25), type: 'admin' },
    { id: 4, title: 'Content Review', date: new Date(2025, 3, 10), type: 'content' },
    { id: 5, title: 'Staff Meeting', date: new Date(2025, 3, 5), type: 'staff' }
  ];

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Filter events for the selected month
  const selectedMonthEvents = events.filter(event => 
    event.date.getMonth() === month && 
    event.date.getFullYear() === year
  );

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <CalendarIcon className="mr-3 h-8 w-8" />
              Admin Calendar
            </h1>
            <p className="text-lg text-muted-foreground">Manage and schedule platform events</p>
          </div>
          
          <Button className="bg-lms-green hover:bg-lms-green/80 rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        </div>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden md:col-span-2">
                <CardHeader className="bg-lms-blue/10 flex flex-row items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{monthNames[month]} {year}</span>
                    <Button variant="outline" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden h-fit">
                <CardHeader className="bg-lms-purple/10">
                  <CardTitle>
                    {date ? (
                      <span>Events for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    ) : (
                      <span>Select a date</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map(event => (
                        <div key={event.id} className="flex items-start space-x-3 p-3 border border-dashed rounded-lg">
                          <div className={`p-2 rounded-full ${event.type === 'content' ? 'bg-lms-green/20' : event.type === 'staff' ? 'bg-lms-blue/20' : 'bg-lms-pink/20'}`}>
                            {event.type === 'content' ? (
                              <FileText className="h-5 w-5 text-lms-green" />
                            ) : event.type === 'staff' ? (
                              <Users className="h-5 w-5 text-lms-blue" />
                            ) : (
                              <CalendarIcon className="h-5 w-5 text-lms-pink" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No events for this date
                    </p>
                  )}
                  
                  <Button className="w-full mt-4 rounded-xl" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="flex items-center justify-between">
                  <span>Events for {monthNames[month]} {year}</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {selectedMonthEvents.length > 0 ? (
                    selectedMonthEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map(event => (
                        <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0 text-center">
                            <div className="text-2xl font-bold">{event.date.getDate()}</div>
                            <div className="text-xs text-muted-foreground">
                              {event.date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Event description goes here...
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No events scheduled for this month
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminCalendar;
