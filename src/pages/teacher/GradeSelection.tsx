
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, School, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const grades = [
  {
    id: 1,
    name: "Pre-Nursery",
    ageRange: "2-3 years",
    students: 45,
    icon: <GraduationCap className="h-8 w-8 text-lms-pink" />,
    color: "border-lms-pink/50 bg-lms-pink/5 hover:bg-lms-pink/10",
    textColor: "text-lms-pink"
  },
  {
    id: 2,
    name: "Nursery",
    ageRange: "3-4 years",
    students: 56,
    icon: <GraduationCap className="h-8 w-8 text-lms-blue" />,
    color: "border-lms-blue/50 bg-lms-blue/5 hover:bg-lms-blue/10",
    textColor: "text-lms-blue"
  },
  {
    id: 3,
    name: "LKG",
    ageRange: "4-5 years",
    students: 48,
    icon: <GraduationCap className="h-8 w-8 text-lms-green" />,
    color: "border-lms-green/50 bg-lms-green/5 hover:bg-lms-green/10",
    textColor: "text-lms-green"
  },
  {
    id: 4,
    name: "UKG",
    ageRange: "5-6 years",
    students: 52,
    icon: <GraduationCap className="h-8 w-8 text-lms-purple" />,
    color: "border-lms-purple/50 bg-lms-purple/5 hover:bg-lms-purple/10",
    textColor: "text-lms-purple"
  }
];

const TeacherGradeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGradeSelect = (gradeId: number) => {
    // In a real app, this would save the selection to context/store
    toast({
      title: "Grade selected",
      description: `You are now viewing resources for ${grades.find(g => g.id === gradeId)?.name}`,
    });
    
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5 p-4 md:p-8 overflow-hidden relative">
      {/* Animated background */}
      <AnimatedCharacters variant="minimal" density="low" />
      
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center space-x-2 mb-6">
          <School className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bubbly font-bold text-primary">BookWorm Academy</h1>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-primary/30 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bubbly font-bold mb-2">Welcome, Teacher!</h2>
            <p className="text-muted-foreground">
              Please select the grade level you're teaching today to access relevant resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {grades.map((grade) => (
              <Card 
                key={grade.id} 
                className={`border-4 rounded-3xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer ${grade.color}`}
                onClick={() => handleGradeSelect(grade.id)}
              >
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4">
                    {grade.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bubbly font-bold ${grade.textColor}`}>{grade.name}</h3>
                    <p className="text-sm text-muted-foreground">{grade.ageRange}</p>
                    <p className="text-xs text-muted-foreground">{grade.students} students</p>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${grade.textColor}`} />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Switch Account
            </Button>
            <p className="text-sm text-muted-foreground">
              You can change the grade level at any time from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradeSelection;
