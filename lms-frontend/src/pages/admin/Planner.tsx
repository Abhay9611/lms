
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList, Plus, Clock, Calendar, CheckCircle, X, Book, FileText, School } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';

const AdminPlanner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [newTask, setNewTask] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Mock data for tasks
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Review new Math content for Grade 3', completed: false, category: 'content', grade: 'grade3', subject: 'math' },
    { id: 2, task: 'Prepare Q2 content calendar', completed: true, category: 'content', grade: 'all', subject: 'all' },
    { id: 3, task: 'Update teacher resources for EVS', completed: false, category: 'resources', grade: 'grade1', subject: 'evs' },
    { id: 4, task: 'Check student progress reports', completed: false, category: 'admin', grade: 'grade2', subject: 'english' },
    { id: 5, task: 'Schedule new content uploads', completed: false, category: 'admin', grade: 'all', subject: 'all' }
  ]);
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        task: newTask,
        completed: false,
        category: activeTab,
        grade: selectedGrade,
        subject: selectedSubject
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      toast({
        title: "Task added",
        description: "New task has been added to your planner."
      });
    }
  };
  
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task removed",
      description: "Task has been removed from your planner."
    });
  };
  
  const filteredTasks = tasks.filter(task => task.category === activeTab);
  
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <ClipboardList className="mr-3 h-8 w-8" />
              Admin Planner
            </h1>
            <p className="text-lg text-muted-foreground">Organize your tasks and manage content planning</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="bg-lms-purple/10">
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="content" className="rounded-l-md">Content</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="admin" className="rounded-r-md">Admin</TabsTrigger>
                </TabsList>
                
                <div>
                  <div className="flex gap-3 mb-4">
                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="preschool">Pre-School</SelectItem>
                        <SelectItem value="grade1">Grade 1</SelectItem>
                        <SelectItem value="grade2">Grade 2</SelectItem>
                        <SelectItem value="grade3">Grade 3</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="evs">EVS</SelectItem>
                        <SelectItem value="stories">Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map(task => (
                        <div 
                          key={task.id} 
                          className="flex items-center justify-between p-4 bg-white rounded-xl border transition-all hover:shadow-md"
                        >
                          <div className="flex items-start space-x-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`rounded-full ${task.completed ? 'text-lms-green' : 'text-muted-foreground'}`}
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              {task.completed ? <CheckCircle className="h-5 w-5 fill-lms-green" /> : <Circle className="h-5 w-5" />}
                            </Button>
                            <div>
                              <p className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.task}
                              </p>
                              <div className="flex space-x-2 mt-1">
                                {task.grade !== 'all' && (
                                  <Badge variant="outline" className="text-xs bg-lms-blue/10 text-lms-blue">
                                    {task.grade === 'preschool' ? 'Pre-School' : task.grade.replace('grade', 'Grade ')}
                                  </Badge>
                                )}
                                {task.subject !== 'all' && (
                                  <Badge variant="outline" className="text-xs bg-lms-green/10 text-lms-green">
                                    {task.subject.charAt(0).toUpperCase() + task.subject.slice(1)}
                                  </Badge>
                                )}
                                {task.category === 'content' && (
                                  <Badge variant="outline" className="text-xs bg-lms-purple/10 text-lms-purple">
                                    Content
                                  </Badge>
                                )}
                                {task.category === 'resources' && (
                                  <Badge variant="outline" className="text-xs bg-lms-yellow/10 text-lms-yellow">
                                    Resources
                                  </Badge>
                                )}
                                {task.category === 'admin' && (
                                  <Badge variant="outline" className="text-xs bg-lms-red/10 text-lms-red">
                                    Admin
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTask(task.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-6 text-muted-foreground">
                        <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No tasks found for this category</p>
                      </div>
                    )}
                  </div>
                </div>
              </Tabs>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex gap-3">
                  <Input
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 bg-white"
                  />
                  <Button onClick={handleAddTask} className="bg-lms-purple hover:bg-lms-purple/80">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-6">
                {['April', 'May', 'June'].map((month) => (
                  <div key={month} className="space-y-2">
                    <h3 className="font-bubbly flex items-center text-lg font-bold">
                      <Calendar className="h-4 w-4 mr-2 text-lms-blue" />
                      {month} 2025
                    </h3>
                    <div className="border-l-2 border-lms-blue/30 pl-4 space-y-3">
                      {month === 'April' && (
                        <>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Badge className="bg-lms-green text-white">Apr 15</Badge>
                              <h4 className="ml-2 font-medium">New Book Releases</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Math textbooks for Grades 1-3</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Badge className="bg-lms-blue text-white">Apr 22</Badge>
                              <h4 className="ml-2 font-medium">EVS Content Update</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">New videos and activities</p>
                          </div>
                        </>
                      )}
                      {month === 'May' && (
                        <>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Badge className="bg-lms-pink text-white">May 5</Badge>
                              <h4 className="ml-2 font-medium">New Story Collection</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Interactive story books for Pre-School</p>
                          </div>
                        </>
                      )}
                      {month === 'June' && (
                        <>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Badge className="bg-lms-yellow text-white">June 10</Badge>
                              <h4 className="ml-2 font-medium">Summer Learning Package</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Special activities for vacation time</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Schedule New Release
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-green/10">
            <CardTitle>Content Production Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Content Planning', icon: <FileText className="h-8 w-8" />, color: 'bg-lms-blue/10 text-lms-blue', status: 'In Progress', items: 5 },
                { title: 'Under Production', icon: <Book className="h-8 w-8" />, color: 'bg-lms-yellow/10 text-lms-yellow', status: 'Active', items: 12 },
                { title: 'Review Stage', icon: <CheckCircle className="h-8 w-8" />, color: 'bg-lms-purple/10 text-lms-purple', status: 'Pending', items: 8 },
                { title: 'Ready to Publish', icon: <School className="h-8 w-8" />, color: 'bg-lms-green/10 text-lms-green', status: 'Completed', items: 3 }
              ].map((section, idx) => (
                <Card key={idx} className="border-2 border-dashed">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${section.color} mb-3`}>
                      {section.icon}
                    </div>
                    <h3 className="font-bold text-lg">{section.title}</h3>
                    <Badge className={
                      section.status === 'In Progress' ? 'bg-lms-blue' :
                      section.status === 'Active' ? 'bg-lms-yellow' :
                      section.status === 'Pending' ? 'bg-lms-purple' : 'bg-lms-green'
                    }>
                      {section.status}
                    </Badge>
                    <p className="mt-2 text-3xl font-bold">{section.items}</p>
                    <p className="text-sm text-muted-foreground">items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const Circle = ({ className }: { className?: string }) => (
  <div className={`w-5 h-5 rounded-full border-2 ${className}`}></div>
);

export default AdminPlanner;
