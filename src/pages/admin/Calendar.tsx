
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, Users, School, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

// Mock calendar events
const events = [
  {
    id: 1,
    title: "Content Release: Alphabets A-M",
    date: "2025-04-15",
    type: "content",
    audience: "Pre-Nursery"
  },
  {
    id: 2,
    title: "Teacher Training Session",
    date: "2025-04-20",
    type: "training",
    audience: "All Teachers"
  },
  {
    id: 3,
    title: "System Maintenance",
    date: "2025-04-25",
    type: "system",
    audience: "All Users"
  },
  {
    id: 4,
    title: "Content Release: Numbers 1-10",
    date: "2025-04-30",
    type: "content",
    audience: "Nursery"
  }
];

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);

  // Handle date change
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const filteredEvents = events.filter(event => event.date === formattedDate);
      setSelectedDateEvents(filteredEvents);
    } else {
      setSelectedDateEvents([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <CalendarIcon className="mr-3 h-8 w-8" />
            Admin Calendar
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Schedule and manage content releases and system events
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
              
              <div className="mt-6">
                <Button className="w-full rounded-xl bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Event
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly">
                {date ? (
                  <>Events for {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</>
                ) : (
                  <>Select a date to view events</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="bg-white p-4 rounded-xl border-2 border-dashed">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bubbly text-lg">{event.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge className={
                              event.type === 'content' ? "bg-lms-green" :
                              event.type === 'training' ? "bg-lms-blue" : "bg-lms-purple"
                            }>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4 text-lms-green" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Audience: {event.audience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bubbly mb-2">No Events Scheduled</h3>
                  <p className="text-muted-foreground mb-4">
                    {date ? "No events scheduled for this date. Add a new event to get started." : "Select a date to view or add events."}
                  </p>
                  {date && (
                    <Button className="rounded-xl bg-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event for This Date
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-muted">
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Event Title</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Date</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Type</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Audience</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                    <tr key={event.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 font-medium">{event.title}</td>
                      <td className="px-4 py-4 text-center">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="px-4 py-4 text-center">
                        <Badge className={
                          event.type === 'content' ? "bg-lms-green" :
                          event.type === 'training' ? "bg-lms-blue" : "bg-lms-purple"
                        }>
                          {event.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {event.audience.includes('All') ? (
                            <Users className="h-4 w-4 mr-2 text-lms-blue" />
                          ) : (
                            <School className="h-4 w-4 mr-2 text-lms-green" />
                          )}
                          {event.audience}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-blue">
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCalendar;
