
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, Clock, Users, BookOpen, Trash2, Edit, Info, Search, Filter, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  },
  {
    id: 6,
    title: "Art & Craft Session",
    date: new Date(2025, 3, 16),
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    type: "activity",
    grade: "Kindergarten",
    description: "Creating paper animals and learning about wildlife"
  },
  {
    id: 7,
    title: "Music & Movement",
    date: new Date(2025, 3, 17),
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "class",
    grade: "Nursery",
    description: "Learning songs with movements to develop coordination"
  },
  {
    id: 8,
    title: "Science Experiment: Plants",
    date: new Date(2025, 3, 18),
    startTime: "9:30 AM",
    endTime: "10:30 AM",
    type: "activity",
    grade: "Kindergarten",
    description: "Simple experiment to show how plants grow"
  }
];

// Helper to format date as YYYY-MM-DD for comparison
const formatDateForCompare = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const TeacherCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  
  // Get events for the selected date
  const filteredEvents = mockEvents
    .filter(event => 
      !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(event => typeFilter === 'all' || event.type === typeFilter)
    .filter(event => gradeFilter === 'all' || event.grade === gradeFilter);
    
  const selectedDateEvents = date 
    ? filteredEvents.filter(event => 
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <CalendarIcon className="mr-3 h-8 w-8" />
              Teacher Calendar
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Plan your classes and activities efficiently
            </p>
          </div>
          
          <Button className="rounded-xl bg-primary shadow-lg hover:shadow-xl transition-all" onClick={addEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/50 backdrop-blur-sm p-4 rounded-xl mb-6 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-9 bg-white/80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="class">Classes</SelectItem>
                  <SelectItem value="activity">Activities</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="story">Story Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="Nursery">Nursery</SelectItem>
                  <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                  <SelectItem value="All Grades">Multiple Grades</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-1 h-full">
              <CardHeader className="bg-gradient-to-r from-lms-blue/20 to-lms-blue/5">
                <CardTitle className="text-xl font-bubbly flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-lms-blue" />
                  Select Date
                </CardTitle>
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
                    className="rounded-xl shadow-sm hover:shadow-md transition-all"
                    onClick={() => setDate(new Date())}
                  >
                    Today
                  </Button>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h4 className="font-bubbly font-medium text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-lms-green" />
                    Event Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-lms-green">class</Badge>
                    <Badge className="bg-lms-blue">activity</Badge>
                    <Badge className="bg-lms-pink">meeting</Badge>
                    <Badge className="bg-lms-purple">story</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden h-full">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5">
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
                  <motion.div 
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedDateEvents.map((event) => (
                      <motion.div 
                        key={event.id} 
                        className="border-2 border-dashed rounded-xl p-4 hover:border-solid hover:shadow-md transition-all duration-200"
                        variants={itemVariants}
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
                              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              onClick={() => editEvent(event.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => deleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    {date ? (
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Info className="h-12 w-12 text-muted-foreground mx-auto" />
                        <h3 className="text-lg font-bubbly">No Events Scheduled</h3>
                        <p className="text-muted-foreground">
                          There are no events scheduled for this date. Click "Add Event" to create one.
                        </p>
                        <Button 
                          className="mt-4 rounded-xl bg-primary shadow-md hover:shadow-lg transition-all" 
                          onClick={addEvent}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </motion.div>
                    ) : (
                      <p>Please select a date to view events</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-lms-green/20 to-lms-green/5">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Users className="h-5 w-5 mr-2 text-lms-green" />
                Upcoming Events (Next 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents
                  .filter(event => {
                    const today = new Date();
                    const nextWeek = new Date();
                    nextWeek.setDate(today.getDate() + 7);
                    return event.date >= today && event.date <= nextWeek;
                  })
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <motion.div 
                      key={event.id} 
                      className="flex items-center p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="flex justify-end space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button variant="outline" className="rounded-xl">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Print Calendar
          </Button>
          <Button className="rounded-xl">
            <Users className="h-4 w-4 mr-2" />
            Share Calendar
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherCalendar;
