import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList, Plus, Clock, Calendar, CheckCircle, X, Book, FileText, School, Trash, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Grade {
  id: string;
  name: string;
}

interface MonthlyPlanner {
  gradeId: string;
  title: string;
  content?: string;
  pdfUrl: string;
  date: string;
}

const AdminPlanner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [gradesList, setGradesList] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [plannerId, setPlannerId] = useState<File | null>(null);
  const [plannerText, setPlannerText] = useState<string>('');
  const [plannerTitle, setPlannerTitle] = useState<string>('');
  const [isTextMode, setIsTextMode] = useState<boolean>(true);

  const [subjects, setSubjects] = useState<any[]>([]);
  const [plannerList, setPlannerList] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('/grades');
        setGradesList(response.data);
        console.log('Fetched grades:', response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch grades'
        });
      }
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    console.log('Selected grade changed to:', selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedGrade) {
      // Initialize empty planner list for the selected grade
      setPlannerList([]);
    }
  }, [selectedGrade]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjects = await api.get('/subjects');
        const filteredSubjects = subjects.data.filter((subject: any) => subject.gradeId === selectedGrade);
        setSubjects(filteredSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch subjects'
        });
      }
    };
    fetchSubjects();
  }, [selectedGrade]);

  const handleChange = (value: any) => {
    setPlannerId(value);
  };

  const handleFileUpload = async (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('pdf', file);

    try {
      const response = await api.post('/monthly-planner/upload', fileFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Upload error:', error.response?.data || error);
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Failed to upload file.' 
      });
      return null;
    }
  };

  const handleAddMaterial = async () => {
    if (!selectedGrade || !selectedDate) {
      toast({ 
        title: 'Missing information', 
        description: 'Please select both a grade and a date' 
      });
      return;
    }

    if (!plannerTitle.trim()) {
      toast({
        title: 'Missing title',
        description: 'Please enter a title for the planner'
      });
      return;
    }

    if (isTextMode && !plannerText.trim()) {
      toast({
        title: 'Missing content',
        description: 'Please enter some text content'
      });
      return;
    }

    if (!isTextMode && !plannerId) {
      toast({
        title: 'Missing file',
        description: 'Please select a file to upload'
      });
      return;
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('gradeId', selectedGrade);
      formData.append('title', plannerTitle);
      formData.append('date', selectedDate.toISOString());

      if (isTextMode) {
        formData.append('content', plannerText);
      } else if (plannerId) {
        if (plannerId.type !== 'application/pdf') {
          toast({
            title: 'Invalid file type',
            description: 'Only PDF files are allowed'
          });
          return;
        }
        if (plannerId.size > 5 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: 'File size must be less than 5MB'
          });
          return;
        }
        formData.append('pdf', plannerId);
      }

      // Log the request details
      console.log('Sending request to /monthly-planner with:', {
        gradeId: selectedGrade,
        title: plannerTitle,
        date: selectedDate.toISOString(),
        hasContent: !!plannerText,
        hasFile: !!plannerId,
        token: localStorage.getItem('token') ? 'present' : 'missing'
      });

      // Send the request
      const response = await api.post('/monthly-planner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Response received:', response.data);

      // Check if we have a valid response
      if (!response.data) {
        throw new Error('No response data received');
      }

      // Handle both possible response formats
      const plannerData = response.data.data || response.data;
      if (!plannerData) {
        throw new Error('Invalid response format');
      }

      // Create the new planner object
      const newPlanner = {
        id: plannerData.id,
        title: plannerData.title,
        content: plannerData.content || '',
        textName: plannerData.pdfUrl || 'Text Content',
        date: plannerData.date,
        formattedDate: format(new Date(plannerData.date), "PPP")
      };

      // Update the planner list
      setPlannerList(prev => [...prev, newPlanner]);

      // Reset form
      setPlannerId(null);
      setPlannerText('');
      setPlannerTitle('');
      setSelectedDate(undefined);

      // Show success message
      toast({
        title: 'Success',
        description: 'Monthly planner created successfully'
      });

    } catch (error: any) {
      // Log the full error for debugging
      console.error('Error creating monthly planner:', {
        error,
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
        headers: error.config?.headers
      });

      // Show user-friendly error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to create monthly planner';
      
      toast({ 
        title: 'Error', 
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  const deletePlanner = async (id: number) => {
    try {
      await api.delete(`/monthly-planner/${id}`);
      setPlannerList(plannerList.filter(planner => planner.id !== id));
    } catch (error) {
      console.log(error);
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
          <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-3">
            <CardHeader className="bg-lms-purple/10">
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <div className="flex gap-3 mb-4">
                  <Select 
                    value={selectedGrade} 
                    onValueChange={setSelectedGrade}
                  >
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Select Grade">
                        {selectedGrade ? gradesList.find(g => g.id === selectedGrade)?.name : 'Select Grade'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {gradesList.map((grade) => (
                        <SelectItem key={grade.id} value={grade.id}>
                          {grade.name}
                        </SelectItem>
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
                              {planner.textName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {planner.formattedDate}
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
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date: Date | undefined) => setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <Button
                      variant={isTextMode ? "default" : "outline"}
                      onClick={() => setIsTextMode(true)}
                      className="flex-1"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Text Input
                    </Button>
                    <Button
                      variant={!isTextMode ? "default" : "outline"}
                      onClick={() => setIsTextMode(false)}
                      className="flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      File Upload
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter planner title..."
                        value={plannerTitle}
                        onChange={(e) => setPlannerTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  
                    {isTextMode ? (
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Enter your planner content here..."
                          value={plannerText}
                          onChange={(e) => setPlannerText(e.target.value)}
                          className="min-h-[150px] mt-1"
                        />
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="file">Upload File</Label>
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf"
                          className="mt-1"
                          onChange={(e) => setPlannerId(e.target.files?.[0] || null)}
                        />
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleAddMaterial} 
                    className="bg-lms-purple hover:bg-lms-purple/80"
                    disabled={!selectedGrade || !selectedDate || !plannerTitle.trim() || (isTextMode ? !plannerText.trim() : !plannerId)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Planner
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mt-6">
          {plannerList.length > 0 ? (
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-semibold text-sm">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Content</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              {plannerList.map((planner, index) => (
                <div
                  key={planner.id}
                  className="grid grid-cols-12 gap-4 p-4 border-t items-center hover:bg-muted/30 transition-colors"
                >
                  <div className="col-span-1 text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="col-span-3">
                    <div className="font-medium">{format(new Date(planner.date), "PPP")}</div>
                  </div>
                  <div className="col-span-4">
                    <div className="font-medium">{planner.title}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="line-clamp-2 text-sm">
                      {planner.content || planner.textName}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => {
                        toast({
                          title: planner.title,
                          description: planner.content || 'No content available'
                        });
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => deletePlanner(planner.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground border rounded-lg">
              <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{selectedGrade ? "No planners found for this grade" : "Select a grade to view planners"}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const Circle = ({ className }: { className?: string }) => (
  <div className={`w-5 h-5 rounded-full border-2 ${className}`}></div>
);

export default AdminPlanner;
