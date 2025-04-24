import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import { studentStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, Smile, Star, Book } from 'lucide-react';
import SubjectCard from '@/components/content/SubjectCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';


const colors = ['bg-lms-pink', 'bg-lms-green', 'bg-lms-blue', 'bg-lms-purple']


const books = {
  "Play Home": 3,
  "Nursery": 6,
  "LKG": 8,
  "UKG": 8,
}
const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [preschoolSubjects, setPreschoolSubjects] = useState<any[]>([]);

  const calculateProgress = async (userProgress: any, subject: any) => {
    const topicsRes = await axios.get("http://localhost:3000/api/topics");
    const topicList = topicsRes.data.filter((topic: any) => topic.subjectId === subject.id);
    const topicIds = topicList.map((topic: any) => topic.id);
    const videoCompletions = userProgress.filter((progress: any) => topicIds.includes(progress.topicId) && progress.videoCompleted).length;
    const quizCompletions = userProgress.filter((progress: any) => topicIds.includes(progress.topicId) && progress.quizCompleted).length;
    return Math.round((videoCompletions + quizCompletions) * 100 / (topicIds.length * 2));
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Student user object:", user);
        if (!user?.gradeId) {
          setError("No grade information found for user.");
          setLoading(false);
          return;
        }
        // Fetch all subjects and filter by gradeId
        const subjects = await axios.get("http://localhost:3000/api/subjects");
        const gradeSubjects = subjects.data.filter((s: any) => s.gradeId === user.gradeId)

        const studentProgressRes = await axios.get("http://localhost:3000/api/progress");
        const progressData = studentProgressRes.data.filter((progress: any) => user.id == progress.userId);

        const grade = await axios.get("http://localhost:3000/api/grades");
        const user_grade = grade.data.filter((s: any) => s.id === user.gradeId)[0].name;

        let completed = 0;
        let total = 0;
        const progressList = [];
        for (const subject of gradeSubjects) {
          const progress = await calculateProgress(progressData, subject);
          completed += progress;
          total += 100;
          progressList.push(progress);
        }

        const subjectCount = gradeSubjects.length;

        const progress = gradeSubjects.map((subject, index) => ({
          id: subject.id,
          name: subject.name,
          description: subject.description,
          color: colors[index % colors.length],
          progress: progressList[index]
        }))
        setStats([{
          label: 'Subjects', value: subjectCount
        }, {
          label: 'Books', value: books[user_grade]
        }, {
          label: 'Completed', value: `${Math.round(completed / total * 100)}%`
        }, {
          label: 'Avg. Score', value: '92%'
        }])
        setPreschoolSubjects(progress);
      } catch (err: any) {
        setError(err.message || "Failed to fetch subjects");
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
      <div className="space-y-8 relative">
        {/* Add animated characters as background */}
        <AnimatedCharacters variant="school" density="high" />

        <WelcomeCard stats={stats} />

        <div className="grid grid-cols-1 gap-6">
          <div>
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 transform rotate-12">
                <Star className="h-12 w-12 text-lms-yellow fill-lms-yellow animate-pulse" />
              </div>

              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="text-xl font-bubbly flex items-center">
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow mr-2 animate-spin-slow" />
                  My Learning Progress
                  <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow ml-2 animate-spin-slow" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {preschoolSubjects.map((subject) => {
                    return (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-round font-medium flex items-center">
                            <span className={`${subject.color} w-3 h-3 rounded-full mr-2`}></span>
                            {subject.name}
                          </h3>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Smile className={`h-5 w-5 mr-1 ${subject.progress > 50 ? 'text-lms-green' : 'text-lms-yellow'}`} />
                            {subject.progress}% Complete
                          </span>
                        </div>
                        <Progress
                          value={subject.progress}
                          className="h-3 rounded-full bg-lms-blue/10"
                          color={subject.progress > 50 ? 'bg-lms-green' : 'bg-lms-yellow'}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-bubbly flex items-center">
              <BookOpen className="h-6 w-6 text-lms-blue mr-2" />
              My Subjects
            </h2>
            <Button variant="outline" onClick={() => navigate('/student/subjects')} size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {preschoolSubjects.map((subject, index) => {
              if (index > 3) return null;
              return (
                <div
                  key={subject.id}
                  className="bg-white rounded-3xl border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/student/subjects/${subject.id}`)}
                >
                  <div className={`${subject.color} h-4 w-full`}></div>
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <div className={`${subject.color.replace('bg-', 'text-')} bg-opacity-20 p-2 rounded-full`}>
                        <Book className="h-6 w-6" />
                      </div>
                      <div className="bg-lms-yellow/10 text-lms-yellow px-3 py-1 rounded-full text-xs font-medium">
                        {subject.progress}%
                      </div>
                    </div>
                    <h3 className="font-bubbly text-lg mb-2">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-round">
                      {subject.description}
                    </p>
                    <div className="mt-4">
                      <Progress value={subject.progress} className="h-2 rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
