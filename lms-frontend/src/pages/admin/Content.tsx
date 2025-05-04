import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Search, Edit, Trash2, FileText, Film, Music, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import AddContentModal from '@/components/content/AddContentModal';

// Mock content data
const contentItems = [
  {
    id: 1,
    title: "Twinkle Twinkle Little Star",
    type: "rhyme",
    subject: "English Rhymes",
    ageGroup: "3-4 years",
    dateAdded: "2025-03-15",
    status: "active"
  },
  {
    id: 2,
    title: "Numbers 1 to 10",
    type: "lesson",
    subject: "Maths",
    ageGroup: "3-5 years",
    dateAdded: "2025-03-10",
    status: "active"
  },
  {
    id: 3,
    title: "Animals and Their Homes",
    type: "interactive",
    subject: "EVS",
    ageGroup: "4-5 years",
    dateAdded: "2025-03-08",
    status: "active"
  },
  {
    id: 4,
    title: "The Three Little Pigs",
    type: "story",
    subject: "Story Time",
    ageGroup: "3-5 years",
    dateAdded: "2025-03-05",
    status: "active"
  },
  {
    id: 5,
    title: "Shapes and Colors",
    type: "lesson",
    subject: "Maths",
    ageGroup: "3-4 years",
    dateAdded: "2025-03-01",
    status: "draft"
  }
];

const ContentPage = () => {
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);

  const handleAddContentClick = () => {
    setIsAddContentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddContentModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />

        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <BookOpen className="mr-3 h-8 w-8" />
            Content Management
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage all educational content for preschool students
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-10 rounded-xl border-2 w-full"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button className="rounded-xl bg-primary w-full md:w-auto" onClick={handleAddContentClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Content
            </Button>
          </div>
        </div>

        <AddContentModal isOpen={isAddContentModalOpen} onClose={handleCloseModal} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { title: "Lessons", count: 48, icon: <FileText className="h-6 w-6" />, color: "bg-lms-blue/10 text-lms-blue border-lms-blue/30" },
            { title: "Videos", count: 23, icon: <Film className="h-6 w-6" />, color: "bg-lms-pink/10 text-lms-pink border-lms-pink/30" },
            { title: "Rhymes", count: 15, icon: <Music className="h-6 w-6" />, color: "bg-lms-purple/10 text-lms-purple border-lms-purple/30" },
            { title: "Stories", count: 32, icon: <BookOpen className="h-6 w-6" />, color: "bg-lms-green/10 text-lms-green border-lms-green/30" }
          ].map((item, index) => (
            <Card key={index} className={`border-4 ${item.color} rounded-3xl shadow-md overflow-hidden`}>
              <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                <div className={`p-2 md:p-3 rounded-full ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-lg md:text-xl font-bubbly">{item.title}</p>
                  <p className="text-2xl md:text-3xl font-bubbly font-bold">{item.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-lg md:text-xl font-bubbly">Content Library</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="relative h-[400px] overflow-hidden">
              <div className="absolute inset-0 overflow-auto">
                <div className="min-w-[500px] md:min-w-0">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-background z-10">
                      <tr className="border-b-2 border-muted">
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-bubbly text-primary w-[30%]">Title</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">Type</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-bubbly text-primary w-[15%]">Subject</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">Age Group</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">Date Added</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[10%]">Status</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[5%]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map(item => (
                        <tr key={item.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                          <td className="px-2 md:px-4 py-2 md:py-3 font-medium truncate max-w-[150px]">{item.title}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                            <Badge className={
                              item.type === 'rhyme' ? "bg-lms-pink" :
                                item.type === 'lesson' ? "bg-lms-blue" :
                                  item.type === 'interactive' ? "bg-lms-purple" :
                                    "bg-lms-green"
                            }>
                              {item.type}
                            </Badge>
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 truncate max-w-[100px]">{item.subject}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-center truncate max-w-[100px]">{item.ageGroup}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-center truncate max-w-[100px]">{new Date(item.dateAdded).toLocaleDateString()}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                            <Badge variant={item.status === "active" ? "default" : "outline"}
                              className={item.status === "active" ? "bg-lms-green" : ""}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                            <div className="flex items-center justify-center space-x-1 md:space-x-2">
                              <Button variant="ghost" size="sm" className="h-6 md:h-8 w-6 md:w-8 p-0 text-lms-blue">
                                <Edit className="h-3 md:h-4 w-3 md:w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 md:h-8 w-6 md:w-8 p-0 text-lms-pink">
                                <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </DashboardLayout>
  );
};

export default ContentPage;
