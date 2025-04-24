
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { BarChart3, Award, Star, BookOpen, Clock, CheckCircle } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const colors = ['bg-lms-pink', 'bg-lms-green', 'bg-lms-blue', 'bg-lms-purple']

// Preschool-specific subjects with progress data
const xsubjectsProgress = [
  {
    id: 1,
    name: 'English Rhymes',
    progress: 65,
    topics: 5,
    completed: 3,
    color: 'bg-lms-pink',
    textColor: 'text-lms-pink',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: 2,
    name: 'EVS',
    progress: 40,
    topics: 5,
    completed: 2,
    color: 'bg-lms-green',
    textColor: 'text-lms-green',
    icon: <Star className="h-5 w-5" />
  },
  {
    id: 3,
    name: 'Maths',
    progress: 30,
    topics: 5,
    completed: 1.5,
    color: 'bg-lms-blue',
    textColor: 'text-lms-blue',
    icon: <Clock className="h-5 w-5" />
  },
  {
    id: 4,
    name: 'Story Time',
    progress: 50,
    topics: 5,
    completed: 2.5,
    color: 'bg-lms-purple',
    textColor: 'text-lms-purple',
    icon: <CheckCircle className="h-5 w-5" />
  }
];

// Recent activities data
const recentActivities = [
  {
    id: 1,
    title: "Completed 'Twinkle Twinkle Little Star'",
    date: "2025-04-06",
    subject: "English Rhymes",
    subjectId: 1,
    color: "bg-lms-pink",
    icon: <Star className="h-4 w-4" />
  },
  {
    id: 2,
    title: "Learned about 'Animals and Their Homes'",
    date: "2025-04-05",
    subject: "EVS",
    subjectId: 2,
    color: "bg-lms-green",
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: 3,
    title: "Completed 'Counting 1 to 10'",
    date: "2025-04-04",
    subject: "Maths",
    subjectId: 3,
    color: "bg-lms-blue",
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: 4,
    title: "Read 'The Three Little Pigs'",
    date: "2025-04-03",
    subject: "Story Time",
    subjectId: 4,
    color: "bg-lms-purple",
    icon: <BookOpen className="h-4 w-4" />
  }
];

// Achievements data
const achievements = [
  {
    id: 1,
    title: "Star Reader",
    description: "Read 5 stories",
    date: "2025-04-01",
    icon: <BookOpen className="h-8 w-8" />,
    color: "bg-lms-blue/20 text-lms-blue"
  },
  {
    id: 2,
    title: "Math Whiz",
    description: "Completed counting 1-10",
    date: "2025-03-28",
    icon: <Award className="h-8 w-8 fill-lms-yellow" />,
    color: "bg-lms-green/20 text-lms-green"
  },
  {
    id: 3,
    title: "Song Bird",
    description: "Learned 3 rhymes",
    date: "2025-03-25",
    icon: <Star className="h-8 w-8 fill-lms-yellow" />,
    color: "bg-lms-yellow/20 text-lms-yellow"
  }
];

const StudentProgress = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [subjectsProgress, setSubjectsProgress] = useState<any[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);


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

        //TODO: Recent activities

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
          color: colors[index % colors.length],
          progress: progressList[index]
        }))

        setTotalProgress(Math.round(completed / total * 100));
        setSubjectsProgress(progress);
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
      <div className="relative space-y-8">
        <AnimatedCharacters variant="minimal" density="medium" />

        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <BarChart3 className="mr-3 h-8 w-8" />
            My Progress
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            See how well you're doing with your learning!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-4 border-primary/30 rounded-3xl shadow-lg lg:col-span-2">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-xl font-bubbly">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-dashed">
                  <div className="relative w-40 h-40 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bubbly font-bold">{totalProgress}%</div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="#f1f1f1"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="10"
                        strokeDasharray={`${totalProgress * 2.51} 251`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bubbly mb-1">Overall Progress</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Keep up the good work! You're doing great!
                  </p>
                </div>
                <div className="space-y-4">
                  {subjectsProgress.map((subject) => (
                    <div
                      key={subject.id}
                      className="p-4 bg-white rounded-xl border-2 border-dashed hover:border-solid cursor-pointer transition-all duration-200"
                      onClick={() => navigate(`/student/subjects/${subject.id}`)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className={`${subject.color} p-2 rounded-full mr-2`}>
                            {subject.icon}
                          </div>
                          <h3 className="font-bubbly">{subject.name}</h3>
                        </div>
                        <span className="text-sm font-medium">{subject.progress}%</span>
                      </div>
                      <ProgressBar
                        value={subject.progress}
                        className="h-2.5 rounded-full"
                      />

                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-secondary/30 rounded-3xl shadow-lg">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="text-xl font-bubbly">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-dashed last:border-0">
                    <div className={`mt-0.5 p-2 rounded-full ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{activity.subject}</span>
                        <span className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" size="sm" className="w-full">
                  View More Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProgress;

