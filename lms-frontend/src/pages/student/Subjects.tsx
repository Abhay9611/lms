import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { BookOpen, Book, Star } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

const Subjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Student user object:', user);
        if (!user?.grade?.id && !user?.gradeId) {
          setError('No grade information found for user.');
          setLoading(false);
          return;
        }
        // Fetch all subjects and filter by gradeId
        const res = await axios.get('/api/subjects');
        console.log('Fetched subjects from backend:', res.data);
        const gradeId = user.grade?.id || user.gradeId;
        const filtered = res.data.filter((s: any) => s.gradeId === gradeId);
        setSubjects(filtered);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch subjects');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading subjects...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="relative space-y-8">
        <AnimatedCharacters variant="school" density="high" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <BookOpen className="mr-3 h-8 w-8" />
            My Subjects
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Explore all your fun learning subjects!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {subjects.map((subject) => (
            <Card 
              key={subject.id}
              className="rounded-3xl overflow-hidden border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col"
              onClick={() => navigate(`/student/subjects/${subject.id}`)}
            >
              <div className="bg-lms-blue h-6 w-full"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-lms-blue p-3 rounded-full mr-3">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bubbly">{subject.name}</h2>
                  </div>
                  <div className="text-lms-blue font-medium flex items-center">
                    <div className="bg-lms-yellow/10 text-lms-yellow px-3 py-1 rounded-full text-sm">
                      {/* Progress placeholder */} 0% Complete
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{subject.description}</p>
                
                <div className="mb-4 flex-1">
                  <h3 className="font-bubbly mb-2">Topics:</h3>
                  <ul className="space-y-2">
                    {/* Topics placeholder, can be fetched in detail page */}
                    <li className="flex items-center">
                      <div className="bg-lms-blue w-2 h-2 rounded-full mr-2"></div>
                      <span>See details</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-3 rounded-full" />
                  <Button className="w-full mt-4">
                    Explore Subject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subjects;
