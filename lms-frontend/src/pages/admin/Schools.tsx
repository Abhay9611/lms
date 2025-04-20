
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import AddSchoolModal from '@/components/auth/AddSchoolModal';
// Mock schools data
interface School {
  id: number;
  name: string;
  location: string;
  students: number;
  teachers: number;
  established: string;
}

interface SchoolActivity {
  text: string;
  time: string;
}

const Schools = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [schoolActivities, setSchoolActivities] = useState<SchoolActivity[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      setError(null);
      try {
        const schoolsResponse = await axios.get('http://localhost:3000/api/schools');
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        const teachersResponse = await axios.get('http://localhost:3000/api/users');

        const sortedSchool = schoolsResponse.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        const schoolData = schoolsResponse.data.map((school: any) => {
          const studentsCount = usersResponse.data.filter((user: any) => user.role === 'student' && user.schoolId === school.id).length;
          const teachersCount = teachersResponse.data.filter((teacher: any) => teacher.role === 'teacher' && teacher.schoolId === school.id).length;
          return {
            id: school.id,
            name: school.name,
            location: school.address,
            students: studentsCount,
            teachers: teachersCount,
          };
        });

        const schoolActivitiesData = sortedSchool.map((school: any) => ({
          text: `School ${school.name} was added.`,
          time: new Date(school.createdAt).toLocaleString(),
        }));

        console.log("School data:", schoolData);
        setSchoolList(schoolData);
        setSchoolActivities(schoolActivitiesData);
      } catch (error) {
        setError('Failed to fetch statistics');
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <>
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <School className="mr-3 h-8 w-8" />
            Schools Management
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage all preschools in the BookWorm Academy network
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search schools..." 
              className="pl-10 rounded-xl border-2"
            />
          </div>
          
          <Button className="rounded-xl bg-primary" onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add School
          </Button>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">Preschools Network</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-muted">
                  <th className="px-4 py-3 text-left font-bubbly text-primary">School Id</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">School Name</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Location</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Students</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Teachers</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolList.map(school => (
                    <tr key={school.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 font-medium">{school.id}</td>
                      <td className="px-4 py-4 font-medium">{school.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{school.location}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Users className="h-4 w-4 mr-2 text-lms-blue" />
                          {school.students}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <School className="h-4 w-4 mr-2 text-lms-green" />
                          {school.teachers}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-blue">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-pink">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">School Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-blue/30 flex flex-col items-center">
                  <div className="bg-lms-blue/10 p-3 rounded-full mb-2">
                    <School className="h-6 w-6 text-lms-blue" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">{schoolList.length}</div>
                  <div className="text-sm text-muted-foreground">Total Schools</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-green/30 flex flex-col items-center">
                  <div className="bg-lms-green/10 p-3 rounded-full mb-2">
                    <Users className="h-6 w-6 text-lms-green" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">
                    {schoolList.reduce((sum, school) => sum + school.students, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden md:col-span-2">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {schoolActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-dashed last:border-0 last:pb-0">
                    <div className="mt-0.5 p-2 rounded-full bg-lms-purple/20 text-lms-purple">
                      <School className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.text}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
    <AddSchoolModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Schools;
