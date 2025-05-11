
import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePen, Plus, Book, CheckCircle, Circle, Calendar, GraduationCap, BookOpen, List, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// Mock lesson plans
const lessonPlans = [
  {
    id: 1,
    title: "Alphabet Recognition",
    subject: "English",
    date: "2025-04-15",
    status: "completed",
    objectives: ["Recognize letters A-E", "Match letters to sounds", "Practice writing letters"],
    materials: ["Alphabet flashcards", "Letter tracing worksheets", "ABC song audio"],
    activities: ["Alphabet song", "Letter recognition game", "Tracing practice"]
  },
  {
    id: 2,
    title: "Counting Numbers 1-5",
    subject: "Maths",
    date: "2025-04-16",
    status: "upcoming",
    objectives: ["Count objects from 1-5", "Recognize number symbols", "Match quantities to numbers"],
    materials: ["Number flashcards", "Counting objects", "Number worksheets"],
    activities: ["Counting song", "Number hunt game", "Counting practice with objects"]
  },
  {
    id: 3,
    title: "Colors Around Us",
    subject: "EVS",
    date: "2025-04-17",
    status: "in-progress",
    objectives: ["Identify primary colors", "Match objects to colors", "Color mixing introduction"],
    materials: ["Color flashcards", "Sorting objects", "Coloring worksheets"],
    activities: ["Color song", "Color scavenger hunt", "Sorting by color activity"]
  },
  {
    id: 4,
    title: "My Family",
    subject: "EVS",
    date: "2025-04-18",
    status: "upcoming",
    objectives: ["Identify family members", "Understand family relationships", "Draw a family picture"],
    materials: ["Family flashcards", "Family tree template", "Drawing materials"],
    activities: ["Family song", "Family role-play", "Family drawing activity"]
  },
  {
    id: 5,
    title: "Shapes in Our World",
    subject: "Maths",
    date: "2025-04-19",
    status: "upcoming",
    objectives: ["Identify basic shapes", "Find shapes in the environment", "Create shapes with materials"],
    materials: ["Shape flashcards", "Shape sorting toys", "Shape worksheets"],
    activities: ["Shape song", "Shape hunt", "Shape collage activity"]
  }
];

const TeacherPlanner = () => {

  const db_grades = {
    "playhome": "Play Home",
    "nursery": "Pre-nursery",
    "lkg": "LKG",
    "ukg": "UKG"
  }

  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState("playhome");
  const [playhomePlans, setPlayhomePlans] = useState([]);
  const [nurseryPlans, setNurseryPlans] = useState([]);
  const [lkgPlans, setLkgPlans] = useState([]);
  const [ukgPlans, setUkgPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const allPlans = await axios.get(`${import.meta.env.VITE_API_URL}/monthly-planner`);
      const grades = await axios.get(`${import.meta.env.VITE_API_URL}/grades`);
      const gradeName = db_grades[selectedGrade];
      const gradeId = grades.data.find((grade) => grade.name === gradeName).id;
      const filteredPlans = allPlans.data.filter((plan) => plan.gradeId === gradeId);
      console.log("filteredPlans", filteredPlans);
      switch (selectedGrade) {
        case "playhome":
          setPlayhomePlans(filteredPlans.map((plan) => ({ id: plan.id, pdfName: plan.pdfUrl, createdAt: plan.createdAt })));
          break;
        case "nursery":
          setNurseryPlans(filteredPlans.map((plan) => ({ id: plan.id, pdfName: plan.pdfUrl, createdAt: plan.createdAt })));
          break;
        case "lkg":
          setLkgPlans(filteredPlans.map((plan) => ({ id: plan.id, pdfName: plan.pdfUrl, createdAt: plan.createdAt })));
          break;
        case "ukg":
          setUkgPlans(filteredPlans.map((plan) => ({ id: plan.id, pdfName: plan.pdfUrl, createdAt: plan.createdAt })));
          break;
      }
    };
    fetchPlans();
  }, [selectedGrade]);





  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />

        <div className="relative mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <FilePen className="mr-3 h-8 w-8" />
              Lesson Planner
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Plan and organize your teaching activities
            </p>
          </div>


        </div>

        <Tabs defaultValue="playhome" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="playhome" onClick={() => setSelectedGrade("playhome")}>Play Home</TabsTrigger>
              <TabsTrigger value="nursery" onClick={() => setSelectedGrade("nursery")}>Nursery</TabsTrigger>
              <TabsTrigger value="lkg" onClick={() => setSelectedGrade("lkg")}>LKG</TabsTrigger>
              <TabsTrigger value="ukg" onClick={() => setSelectedGrade("ukg")}>UKG</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">


            </div>
          </div>

          <TabsContent value="playhome" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {playhomePlans.length > 0 ? playhomePlans.map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">

                              <span className="text-xs text-muted-foreground">
                                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.pdfName}</h3>

                          </div>

                          <div className="flex items-center space-x-2">

                            <Button
                              variant="outline"
                              size="sm"

                            >
                              View Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )) : <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No plans found</p>
                  </div>}
                </div>
              </CardContent>
            </Card>


          </TabsContent>

          <TabsContent value="nursery" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {nurseryPlans.length > 0 ? nurseryPlans.map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">

                              <span className="text-xs text-muted-foreground">
                                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.pdfName}</h3>

                          </div>

                          <div className="flex items-center space-x-2">

                            <Button
                              variant="outline"
                              size="sm"

                            >
                              View Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )) : <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No plans found</p>
                  </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lkg" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lkgPlans.length > 0 ? lkgPlans.map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">

                              <span className="text-xs text-muted-foreground">
                                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.pdfName}</h3>

                          </div>

                          <div className="flex items-center space-x-2">

                            <Button
                              variant="outline"
                              size="sm"

                            >
                              View Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )) : <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No plans found</p>
                  </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ukg" className="space-y-6">
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {ukgPlans.length > 0 ? ukgPlans.map((plan) => (
                    <Card key={plan.id} className="rounded-xl overflow-hidden">
                      <div className="border-l-4 border-lms-green p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">

                              <span className="text-xs text-muted-foreground">
                                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-bubbly font-bold">{plan.pdfName}</h3>

                          </div>

                          <div className="flex items-center space-x-2">

                            <Button
                              variant="outline"
                              size="sm"

                            >
                              View Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )) : <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No plans found</p>
                  </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherPlanner;
