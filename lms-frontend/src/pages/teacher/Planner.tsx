import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePen, Plus, Book, Calendar as CalendarIcon, Search, Download, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Download as DownloadIcon, Trash as TrashIcon } from 'lucide-react';

// Spinner component for loading state
const SpinnerComponent = ({ className }: { className?: string }) => (
  <div className={cn("animate-spin rounded-full h-8 w-8 border-b-2 border-lms-blue", className)} />
);

interface Grade {
  id: string;
  name: string;
}

interface MonthlyPlan {
  id: string;
  title: string;
  content: string;
  date: string;
  gradeId: string;
  grade?: Grade;
  pdfUrl?: string;
}

const TeacherPlanner = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plans, setPlans] = useState<MonthlyPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch grades when component mounts
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        console.log('Fetching grades...');
        const response = await api.get('/grades');
        console.log('Grades response:', response.data);
        
        // Handle both response formats
        const gradesData = Array.isArray(response.data) ? response.data : response.data.data;
        
        if (gradesData && gradesData.length > 0) {
          console.log('Setting grades:', gradesData);
          setGrades(gradesData);
          
          // Set initial grade only if we have grades and no grade is selected
          if (!selectedGrade) {
            console.log('Setting initial grade:', gradesData[0]);
            setSelectedGrade(gradesData[0].id);
          }
        } else {
          console.error('No grades found in response');
          toast({
            title: 'Warning',
            description: 'No grades available',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch grades',
          variant: 'destructive',
        });
      }
    };

    fetchGrades();
  }, []);

  // Log grades and selected grade for debugging
  useEffect(() => {
    console.log('Current grades:', grades);
    console.log('Selected grade:', selectedGrade);
  }, [grades, selectedGrade]);

  // Fetch plans when grade or date changes
  useEffect(() => {
    if (selectedGrade && selectedDate && token) {
      fetchPlans();
    }
  }, [selectedGrade, selectedDate, token]);

  // Fetch plans function
  const fetchPlans = async () => {
    if (!selectedGrade || !selectedDate) return;

    try {
      setLoading(true);
      // Format the date as YYYY-MM-DD
      const dateString = selectedDate.toISOString().split('T')[0];
      
      const params = {
        gradeId: selectedGrade,
        date: dateString
      };

      console.log('Selected Date:', selectedDate);
      console.log('Formatted Date String:', dateString);
      console.log('Fetching monthly planners with params:', params);
      
      const response = await api.get('/monthly-planner', { params });
      console.log('Monthly planners API response:', response.data);

      if (response.data.status === 'success') {
        setPlans(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch plans');
      }
    } catch (error: any) {
      console.error('Error fetching plans:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.message || 'Failed to fetch plans');
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch plans',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (pdfUrl: string) => {
    try {
      const response = await api.get(`/monthly-planner/download/${pdfUrl}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `plan-${selectedDate.toISOString()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to download PDF',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePlan = async (planId: number) => {
    try {
      await api.delete(`/monthly-planner/${planId}`);
      toast({
        title: 'Success',
        description: 'Plan deleted successfully',
      });
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete plan',
        variant: 'destructive',
      });
    }
  };

  const filteredPlans = plans.filter(plan => 
    !searchQuery || 
    (plan.title && plan.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bubbly text-lms-blue">Daily Planner</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Button className="bg-lms-green hover:bg-lms-green/90">
              <Plus className="h-4 w-4 mr-2" />
              New Plan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar and Grade Selection Section */}
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-1">
            <CardHeader className="bg-gradient-to-r from-lms-blue/20 to-lms-blue/5">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-lms-blue" />
                Select Date and Grade
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Grade</label>
                <Select 
                  value={selectedGrade} 
                  onValueChange={setSelectedGrade}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {grades.find(g => g.id === selectedGrade)?.name || "Select Grade"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {grades && grades.length > 0 ? (
                      grades.map((grade) => (
                        <SelectItem 
                          key={grade.id} 
                          value={grade.id}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {grade.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No grades available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Plans Section */}
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-lms-green/20 to-lms-green/5">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Book className="h-5 w-5 mr-2 text-lms-green" />
                Plans for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Selected Date"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <SpinnerComponent className="h-8 w-8" />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>{error}</p>
                </div>
              ) : filteredPlans.length > 0 ? (
                <div className="space-y-4">
                  {filteredPlans.map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Badge variant="outline" className="mr-2">
                                {plan.grade?.name || grades.find(g => g.id === plan.gradeId)?.name || 'Unknown Grade'}
                              </Badge>
                              {plan.date && (
                                <span className="text-xs text-muted-foreground">
                                  {format(parseISO(plan.date), 'h:mm a')}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{plan.content}</p>
                            <div className="flex gap-2">
                              {plan.pdfUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mr-2"
                                  onClick={() => handleDownloadPDF(plan.pdfUrl!)}
                                >
                                  <DownloadIcon className="h-4 w-4 mr-2" />
                                  Download PDF
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeletePlan(parseInt(plan.id))}
                              >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-3">
                    <FilePen className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-lg font-bubbly">No Plans Found</h3>
                    <p className="text-muted-foreground">
                      {selectedDate 
                        ? `There are no plans for ${format(selectedDate, 'MMMM d, yyyy')}`
                        : 'Please select a date to view plans'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherPlanner;
