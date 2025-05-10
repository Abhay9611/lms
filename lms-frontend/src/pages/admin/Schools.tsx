import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School as SchoolIcon, Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import AddSchoolModal from '@/components/auth/AddSchoolModal';

const API_BASE_URL = 'http://localhost:5000';

interface SchoolData {
  id: number;
  name: string;
  code: string;
  teachers: number;
  status: string;
}

const SchoolsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schoolsList, setSchoolsList] = useState<SchoolData[]>([]);
  const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const [schoolsResponse, usersResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/schools`, { headers }),
        axios.get(`${API_BASE_URL}/api/users`, { headers })
      ]);

      const schoolsData = schoolsResponse.data;
      const usersData = usersResponse.data;

      const formattedSchools = schoolsData.map((school: any) => {
        const schoolTeachers = usersData.filter((user: any) => 
          user.role === 'TEACHER' && user.schoolId === school.id
        );
        return {
          id: school.id,
          name: school.name,
          code: school.code,
          teachers: schoolTeachers.length,
          status: school.isActive ? 'active' : 'inactive',
        };
      });

      setSchoolsList(formattedSchools);
    } catch (error) {
      setError('Failed to fetch statistics');
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      await axios.delete(`${API_BASE_URL}/api/schools/${id}`, { headers });
      setSchoolsList(schoolsList.filter(school => school.id !== id));
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />

        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <SchoolIcon className="mr-3 h-8 w-8" />
            Schools Management
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage all schools in the BookWorm Academy platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools..."
              className="pl-10 rounded-xl border-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <Users className="h-4 w-4 mr-2" />
              View Teachers
            </Button>

            <Button 
              className="rounded-xl bg-primary"
              onClick={() => setIsAddSchoolModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add School
            </Button>
          </div>
        </div>

        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">All Schools</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-muted">
                    <th className="px-4 py-3 text-left font-bubbly text-primary">School</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Code</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Teachers</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Status</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolsList.map(school => (
                    <tr key={school.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <SchoolIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{school.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{school.code}</td>
                      <td className="px-4 py-4 text-center">{school.teachers}</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant={school.status === "active" ? "default" : "outline"}
                          className={school.status === "active" ? "bg-lms-green" : ""}>
                          {school.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-pink" onClick={() => handleDelete(school.id)}>
                            <Trash2 className="h-4 w-4" />
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

      <AddSchoolModal
        isOpen={isAddSchoolModalOpen}
        onClose={() => setIsAddSchoolModalOpen(false)}
        onSuccess={() => {
          setIsAddSchoolModalOpen(false);
          fetchStats();
        }}
      />
    </DashboardLayout>
  );
};

export default SchoolsPage;
