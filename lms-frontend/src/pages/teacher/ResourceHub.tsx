import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Search, Filter, Download, BookOpen, Film, FileText, Music, Pencil, Puzzle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

// Mock resources data
const resources = [
  {
    id: 1,
    title: "Alphabet Learning Kit",
    type: "lesson-plan",
    subject: "English",
    grade: "Nursery",
    format: "PDF",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    downloads: 245,
    date: "2025-03-15"
  },
  {
    id: 2,
    title: "Numbers 1-10 Flashcards",
    type: "material",
    subject: "Maths",
    grade: "Nursery",
    format: "PDF",
    thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
    downloads: 189,
    date: "2025-03-10"
  },
  {
    id: 3,
    title: "Colors and Shapes Song",
    type: "multimedia",
    subject: "General",
    grade: "Pre-Nursery",
    format: "MP3",
    thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    downloads: 320,
    date: "2025-03-05"
  },
  {
    id: 4,
    title: "Animals and Their Homes",
    type: "activity",
    subject: "EVS",
    grade: "Nursery",
    format: "PDF",
    thumbnail: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
    downloads: 156,
    date: "2025-03-01"
  },
  {
    id: 5,
    title: "Twinkle Twinkle Little Star Animation",
    type: "multimedia",
    subject: "English Rhymes",
    grade: "Pre-Nursery",
    format: "MP4",
    thumbnail: "https://images.unsplash.com/photo-1597423244036-ef5020e83f3c",
    downloads: 278,
    date: "2025-02-28"
  },
  {
    id: 6,
    title: "My Family Worksheet",
    type: "worksheet",
    subject: "EVS",
    grade: "LKG",
    format: "PDF",
    thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5",
    downloads: 142,
    date: "2025-02-25"
  },
  {
    id: 7,
    title: "Counting Games Bundle",
    type: "activity",
    subject: "Maths",
    grade: "Nursery",
    format: "ZIP",
    thumbnail: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    downloads: 201,
    date: "2025-02-20"
  },
  {
    id: 8,
    title: "Seasons of the Year",
    type: "lesson-plan",
    subject: "EVS",
    grade: "LKG",
    format: "PDF",
    thumbnail: "https://images.unsplash.com/photo-1604537466158-719b1972feb8",
    downloads: 167,
    date: "2025-02-15"
  }
];

const TeacherResourceHub = () => {
  const { toast } = useToast();
  
  const handleDownload = (id: number) => {
    const resource = resources.find(r => r.id === id);
    
    toast({
      title: "Resource downloaded",
      description: `Successfully downloaded "${resource?.title}"`,
    });
  };

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="relative mb-6">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Library className="mr-3 h-8 w-8" />
            Teacher Resource Hub
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Find teaching materials, lesson plans, and activities
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl p-4 shadow-sm">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10 rounded-xl border-2"
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all-grades">
              <SelectTrigger className="w-[160px] rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-grades">All Grades</SelectItem>
                <SelectItem value="pre-nursery">Pre-Nursery</SelectItem>
                <SelectItem value="nursery">Nursery</SelectItem>
                <SelectItem value="lkg">LKG</SelectItem>
                <SelectItem value="ukg">UKG</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-subjects">
              <SelectTrigger className="w-[160px] rounded-xl">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-subjects">All Subjects</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="maths">Maths</SelectItem>
                <SelectItem value="evs">EVS</SelectItem>
                <SelectItem value="rhymes">Rhymes</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lesson-plans">Lesson Plans</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
            <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <Card 
                  key={resource.id} 
                  className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <Badge className={`
                        ${resource.type === 'lesson-plan' ? 'bg-lms-blue' : 
                          resource.type === 'activity' ? 'bg-lms-green' : 
                          resource.type === 'worksheet' ? 'bg-lms-pink' : 
                          'bg-lms-purple'}
                      `}>
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/80">
                        {resource.format}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bubbly font-bold truncate">{resource.title}</h3>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1 mb-3">
                      <span>{resource.subject}</span>
                      <span>|</span>
                      <span>{resource.grade}</span>
                      <span>|</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <Button 
                      className="w-full rounded-xl"
                      variant="outline"
                      onClick={() => handleDownload(resource.id)}
                    >
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lesson-plans" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.filter(r => r.type === 'lesson-plan').map((resource) => (
                <Card 
                  key={resource.id} 
                  className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <Badge className="bg-lms-blue">
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/80">
                        {resource.format}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bubbly font-bold truncate">{resource.title}</h3>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1 mb-3">
                      <span>{resource.subject}</span>
                      <span>|</span>
                      <span>{resource.grade}</span>
                      <span>|</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <Button 
                      className="w-full rounded-xl"
                      variant="outline"
                      onClick={() => handleDownload(resource.id)}
                    >
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Other tab contents would be similar */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.filter(r => r.type === 'activity').map((resource) => (
                <Card 
                  key={resource.id} 
                  className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <Badge className="bg-lms-green">
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/80">
                        {resource.format}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bubbly font-bold truncate">{resource.title}</h3>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1 mb-3">
                      <span>{resource.subject}</span>
                      <span>|</span>
                      <span>{resource.grade}</span>
                      <span>|</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <Button 
                      className="w-full rounded-xl"
                      variant="outline"
                      onClick={() => handleDownload(resource.id)}
                    >
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="border-4 border-lms-yellow/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-yellow/10">
            <CardTitle className="text-xl font-bubbly">Popular Teaching Resources</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Nursery Rhymes Collection",
                  desc: "A collection of 20 popular nursery rhymes with lyrics and music",
                  icon: <Music className="h-10 w-10 text-lms-purple" />,
                  subject: "English Rhymes",
                  color: "bg-lms-purple/10 text-lms-purple border-lms-purple/30"
                },
                { 
                  title: "Early Math Activities",
                  desc: "15 hands-on activities for teaching basic math concepts",
                  icon: <Puzzle className="h-10 w-10 text-lms-blue" />,
                  subject: "Maths",
                  color: "bg-lms-blue/10 text-lms-blue border-lms-blue/30"
                },
                { 
                  title: "Preschool Classroom Decor",
                  desc: "Printable decor materials to create a welcoming classroom",
                  icon: <Star className="h-10 w-10 text-lms-pink" />,
                  subject: "Classroom Resources",
                  color: "bg-lms-pink/10 text-lms-pink border-lms-pink/30"
                }
              ].map((item, index) => (
                <Card key={index} className={`border-2 ${item.color} rounded-xl overflow-hidden hover:shadow-md transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 ${item.color} rounded-full mb-4`}>
                        {item.icon}
                      </div>
                      <h3 className="font-bubbly font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                      <Badge className="mb-3">{item.subject}</Badge>
                      <Button 
                        className="w-full rounded-xl"
                        variant="outline"
                      >
                        View Collection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-green/10">
            <CardTitle className="text-xl font-bubbly">Resource Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: <BookOpen className="h-6 w-6" />, name: "Lesson Plans", count: 45, color: "bg-lms-blue/10 text-lms-blue" },
                { icon: <Pencil className="h-6 w-6" />, name: "Worksheets", count: 78, color: "bg-lms-pink/10 text-lms-pink" },
                { icon: <Puzzle className="h-6 w-6" />, name: "Activities", count: 63, color: "bg-lms-green/10 text-lms-green" },
                { icon: <Film className="h-6 w-6" />, name: "Videos", count: 32, color: "bg-lms-purple/10 text-lms-purple" },
                { icon: <Music className="h-6 w-6" />, name: "Audio", count: 29, color: "bg-lms-yellow/10 text-lms-yellow" },
                { icon: <FileText className="h-6 w-6" />, name: "Printables", count: 54, color: "bg-primary/10 text-primary" }
              ].map((category, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl ${category.color} border-2 border-dashed hover:border-solid cursor-pointer transition-all text-center`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-2 ${category.color} rounded-full mb-2`}>
                      {category.icon}
                    </div>
                    <h3 className="font-bubbly font-medium text-sm">{category.name}</h3>
                    <span className="text-xs">{category.count} items</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherResourceHub;
