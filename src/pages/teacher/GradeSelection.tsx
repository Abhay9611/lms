
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookOpen, Users, GraduationCap } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';

const TeacherGradeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const grades = [
    { name: 'Pre-Nursery', icon: <GraduationCap className="h-12 w-12" />, color: 'bg-lms-pink text-white' },
    { name: 'Nursery', icon: <GraduationCap className="h-12 w-12" />, color: 'bg-lms-yellow text-black' },
    { name: 'Kindergarten', icon: <GraduationCap className="h-12 w-12" />, color: 'bg-lms-green text-white' },
    { name: 'Grade 1', icon: <School className="h-12 w-12" />, color: 'bg-lms-blue text-white' },
    { name: 'Grade 2', icon: <School className="h-12 w-12" />, color: 'bg-lms-purple text-white' },
    { name: 'Grade 3', icon: <School className="h-12 w-12" />, color: 'bg-lms-red text-white' },
    { name: 'Grade 4', icon: <School className="h-12 w-12" />, color: 'bg-lms-orange text-white' },
    { name: 'Grade 5', icon: <School className="h-12 w-12" />, color: 'bg-lms-navy text-white' }
  ];

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    
    // In a real app, this would likely store the selected grade in context or localStorage
    localStorage.setItem('teacherSelectedGrade', grade);
    
    toast({
      title: "Grade Selected",
      description: `You've selected ${grade}. Resources for this grade will now be shown.`,
    });
    
    // Navigate to teacher dashboard
    navigate('/teacher');
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-[80vh] flex flex-col">
        <AnimatedCharacters variant="minimal" density="medium" />
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bubbly font-bold text-primary mb-3">
            Welcome Teacher!
          </h1>
          <p className="text-xl text-muted-foreground font-round max-w-2xl mx-auto">
            Please select the grade level you're teaching to access customized teaching resources, 
            lesson plans, and activities for your classroom.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grades.map((grade) => (
            <Card 
              key={grade.name}
              className={`border-4 rounded-3xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                selectedGrade === grade.name 
                  ? 'border-primary scale-105 transform' 
                  : 'border-transparent hover:border-primary/50 hover:scale-105'
              }`}
              onClick={() => handleGradeSelect(grade.name)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${grade.color} mb-4`}>
                  {grade.icon}
                </div>
                <h3 className="text-xl font-bubbly font-bold mb-2">{grade.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access resources and materials for {grade.name} students
                </p>
                <Button 
                  variant={selectedGrade === grade.name ? "default" : "outline"}
                  className="w-full rounded-xl"
                >
                  {selectedGrade === grade.name ? "Selected" : "Select Grade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-auto pt-8 text-center">
          <Button 
            className="rounded-xl px-8 py-6 text-lg bg-primary hover:bg-primary/80"
            onClick={() => navigate('/teacher')}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherGradeSelection;
