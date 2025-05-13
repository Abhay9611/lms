import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  grade?: {
    name: string;
  };
  pdfUrl?: string;
}

const TeacherDashboard = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState<MonthlyPlan[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      if (!token) {
        console.log('No token available, skipping grade fetch');
        return;
      }

      try {
        console.log('Fetching grades...');
        const response = await api.get('/grades');
        console.log('Grades response:', response.data);

        // Handle both response formats
        const gradesData = Array.isArray(response.data) ? response.data : response.data.data || [];
        console.log('Setting grades:', gradesData);
        setGrades(gradesData);
        
        // Set the first grade as selected by default
        if (gradesData.length > 0) {
          console.log('Setting initial grade:', gradesData[0]);
          setSelectedGrade(gradesData[0].id);
        }
      } catch (error: any) {
        console.error('Error fetching grades:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            params: error.config?.params,
            headers: error.config?.headers
          }
        });
        setError('Failed to fetch grades. Please try again.');
      }
    };

    fetchGrades();
  }, [token]);

  // Fetch plans when grade changes
  useEffect(() => {
    const fetchPlans = async () => {
      if (!token || !selectedGrade) {
        console.log('No token or grade selected, skipping fetch');
        return;
      }

      try {
        setLoading(true);
        const today = new Date();
        
        // Format date as YYYY-MM-DD
        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const dateStr = formatDate(today);
        console.log('Fetching plans with params:', {
          gradeId: selectedGrade,
          startDate: dateStr,
          endDate: dateStr
        });

        const response = await api.get('/monthly-planner', {
          params: {
            gradeId: selectedGrade,
            startDate: dateStr,
            endDate: dateStr
          }
        });

        console.log('Plans response:', response.data);

        if (response.data.status === 'success') {
          // Handle both possible response formats
          const plansData = response.data.data?.planners || response.data.data || [];
          console.log('Setting plans:', plansData);
          setPlans(Array.isArray(plansData) ? plansData : []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch plans');
        }
      } catch (error: any) {
        console.error('Error fetching plans:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            params: error.config?.params,
            headers: error.config?.headers
          }
        });

        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch plans';
        setError(errorMessage);
        setPlans([]); // Reset plans on error
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token, selectedGrade]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard />
        
        {/* Monthly Planner Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today's Plans
            </CardTitle>
            <Select
              value={selectedGrade}
              onValueChange={setSelectedGrade}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : plans.length > 0 ? (
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex items-start gap-4 border-b border-border pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{plan.title}</p>
                        <Badge variant="outline" className="ml-2">
                          {plan.grade?.name || 'Unknown Grade'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.content}
                      </p>
                      {plan.pdfUrl && (
                        <a
                          href={plan.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                          View PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No plans scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
