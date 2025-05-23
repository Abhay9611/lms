import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList, Plus, Clock, Calendar, CheckCircle, X, Book, FileText, School, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Calendar as CalendarIcon } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const API_BASE_URL = 'http://localhost:5000';

interface Grade {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  gradeId: string;
}

interface Topic {
  id: string;
  title: string;
  subjectId: string;
}

const AdminPlanner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [plannerList, setPlannerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      fetchSubjects();
    } else {
      setSubjects([]);
      setSelectedSubject('');
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedSubject) {
      fetchTopics();
    } else {
      setTopics([]);
      setSelectedTopic('');
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedGrade) {
      const fetchPlanner = async () => {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
          const response = await axios.get(`${API_BASE_URL}/api/monthly-planner`, { headers });
          const filteredPlanner = response.data.filter(planner => planner.gradeId === selectedGrade);
          setPlannerList(filteredPlanner.map(planner => ({ id: planner.id, pdfName: planner.pdfUrl })));
        } catch (error) {
          console.error('Error fetching planner:', error);
          toast({ title: 'Error', description: 'Failed to fetch planner.' });
        }
      };
      fetchPlanner();
    }
  }, [selectedGrade]);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/grades`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      toast({
        title: "Error",
        description: "Failed to fetch grades. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/subjects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const filteredSubjects = response.data.filter((subject: Subject) => subject.gradeId === selectedGrade);
      setSubjects(filteredSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subjects. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/topics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const filteredTopics = response.data.filter((topic: Topic) => topic.subjectId === selectedSubject);
      setTopics(filteredTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch topics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGrade || !selectedSubject || !selectedTopic) {
      toast({
        title: "Error",
        description: "Please select grade, subject, and topic",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }

    if (startDate > endDate) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/api/admin/planner`, {
        gradeId: selectedGrade,
        subjectId: selectedSubject,
        topicId: selectedTopic,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Academic plan created successfully",
          variant: "default"
        });
        // Reset form
        setSelectedGrade('');
        setSelectedSubject('');
        setSelectedTopic('');
        setStartDate(undefined);
        setEndDate(undefined);
      }
    } catch (error) {
      console.error('Error creating planner:', error);
      toast({
        title: "Error",
        description: "Failed to create academic plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: any) => {
    setSelectedGrade(value);
  };

  const handleFileUpload = async (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('pdf', file);

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.post(`${API_BASE_URL}/api/monthly-planner/upload`, fileFormData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({ title: 'Error', description: 'Failed to upload file.' });
      return null;
    }
  };

  const handleAddMaterial = async () => {
    const materialFile: any = selectedGrade;
    if (!(materialFile instanceof File)) return;
    try {
      const uploadedMaterial = await handleFileUpload(materialFile);
      if (!uploadedMaterial) return;

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const newMaterial = {
        gradeId: selectedGrade,
        pdfUrl: uploadedMaterial.file.path.replace(/^uploads\\/, ''),
      };

      const newPlanner = await axios.post(`${API_BASE_URL}/api/monthly-planner`, newMaterial, { headers });
      setPlannerList((prev) => [...prev, { id: newPlanner.data.id, pdfName: newMaterial.pdfUrl }]);
    } catch (error) {
      console.error('Error adding material:', error);
      toast({ title: 'Error', description: 'Failed to add material.' });
    }
  };

  const deletePlanner = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      await axios.delete(`${API_BASE_URL}/api/monthly-planner/${id}`, { headers });
      setPlannerList(plannerList.filter(planner => planner.id !== id));
    } catch (error) {
      console.error('Error deleting planner:', error);
      toast({ title: 'Error', description: 'Failed to delete planner.' });
    }
  };

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
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <div className="flex gap-3 mb-4">
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade.id} value={grade.id}>{grade.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {plannerList.length > 0 ? (
                    plannerList.map(planner => (
                      <div
                        key={planner.id}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border transition-all hover:shadow-md"
                      >
                        <div className="flex items-start space-x-3">
                          <FileText className="h-5 w-5" />
                          <div>
                            <p className="font-round">
                              {planner.pdfName}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => deletePlanner(planner.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 text-muted-foreground">
                      <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>{selectedGrade ? "No planners found for this grade" : "No grade selected"}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex gap-3">
                  <Input
                    type="file"
                    className="mr-2"
                    onChange={(e) => handleChange(e.target.files?.[0])}
                  />
                  <Button onClick={handleAddMaterial} className="bg-lms-purple hover:bg-lms-purple/80">
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
