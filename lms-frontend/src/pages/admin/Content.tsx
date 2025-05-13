import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Search, Edit, Trash2, FileText, Film, Music, Upload, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import AddContentModal from '@/components/content/AddContentModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import api from '@/lib/api';

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
  const [isEditContentModalOpen, setIsEditContentModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter content based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContent(contentItems);
    } else {
      const filtered = contentItems.filter(item => 
        item.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.grade.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContent(filtered);
    }
  }, [searchQuery, contentItems]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch content, topics, subjects, grades, and teaching guides in parallel
        const [contentResponse, topicsResponse, subjectsResponse, gradesResponse, teachingGuidesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/contents`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/topics`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/subjects`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/grades`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/teaching-guides`, { headers })
        ]);

        // Create lookup maps
        const topicsMap = topicsResponse.data.reduce((acc, topic) => {
          acc[topic.id] = topic;
          return acc;
        }, {});

        const subjectsMap = subjectsResponse.data.reduce((acc, subject) => {
          acc[subject.id] = subject;
          return acc;
        }, {});

        const gradesMap = gradesResponse.data.reduce((acc, grade) => {
          acc[grade.id] = grade.name;
          return acc;
        }, {});

        const teachingGuidesMap = teachingGuidesResponse.data.reduce((acc, guide) => {
          acc[guide.topicId] = guide;
          return acc;
        }, {});

        // Combine the data
        const enrichedContent = contentResponse.data.map(content => {
          const topic = topicsMap[content.topicId];
          const subject = topic ? subjectsMap[topic.subjectId] : null;
          const gradeName = subject ? gradesMap[subject.gradeId] : 'Unknown Class';
          const teachingGuide = topic ? teachingGuidesMap[topic.id] : null;
          
          return {
            ...content,
            topicName: topic?.title || 'Unknown Topic',
            grade: gradeName,
            pdfUrl: teachingGuide?.pdfUrl || null
          };
        });

        setContentItems(enrichedContent);
        setFilteredContent(enrichedContent);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch content. Please try again later.",
          variant: "destructive"
        });
      }
    };

    fetchContent();
  }, []);

  const handleAddContentClick = () => {
    setIsAddContentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddContentModalOpen(false);
  };

  const handlePdfClick = async (pdfUrl: string) => {
    if (!pdfUrl) {
      toast({
        title: "Error",
        description: "No PDF available for this content",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Show loading state
      toast({
        title: "Loading",
        description: "Opening PDF...",
      });

      // Decode the URL-encoded filename
      const decodedFilename = decodeURIComponent(pdfUrl);
      
      // Log the request details for debugging
      console.log('Requesting PDF:', {
        url: `/contents/download/${decodedFilename}`,
        filename: decodedFilename
      });
      
      const response = await api.get(`/contents/download/${decodedFilename}`, {
        responseType: 'blob'
      });

      // Create blob URL and open in new tab
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open PDF in new tab
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        toast({
          title: "Warning",
          description: "Please allow popups to view PDFs",
          variant: "destructive"
        });
      }
      
      // Clean up the blob URL after a short delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

    } catch (error: any) {
      console.error('Error viewing PDF:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to open PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (content) => {
    setSelectedContent(content);
    setIsEditContentModalOpen(true);
  };

  const handleDelete = (content) => {
    setSelectedContent(content);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      await axios.delete(`${import.meta.env.VITE_API_URL}/contents/${selectedContent.id}`, { headers });

      // Update the content list
      setContentItems(prevItems => prevItems.filter(item => item.id !== selectedContent.id));
      setFilteredContent(prevItems => prevItems.filter(item => item.id !== selectedContent.id));

      toast({
        title: "Success",
        description: "Content deleted successfully",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedContent(null);
    }
  };

  const handleContentUpdate = async (updatedContent) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/contents/${updatedContent.id}`, updatedContent, { headers });

      // Update the content list
      setContentItems(prevItems => 
        prevItems.map(item => item.id === updatedContent.id ? { ...item, ...updatedContent } : item)
      );
      setFilteredContent(prevItems => 
        prevItems.map(item => item.id === updatedContent.id ? { ...item, ...updatedContent } : item)
      );

      toast({
        title: "Success",
        description: "Content updated successfully",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEditContentModalOpen(false);
      setSelectedContent(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
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
              placeholder="Search by topic, title, or class..."
              className="pl-10 rounded-xl border-2 w-full"
              value={searchQuery}
              onChange={handleSearch}
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

        {selectedContent && (
          <AddContentModal 
            isOpen={isEditContentModalOpen} 
            onClose={() => {
              setIsEditContentModalOpen(false);
              setSelectedContent(null);
            }}
          />
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the content
                "{selectedContent?.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
                        <th className="px-4 py-4 text-left font-bubbly text-primary w-[30%]">Topic</th>
                        <th className="px-4 py-4 text-center font-bubbly text-primary w-[20%]">Class</th>
                        <th className="px-4 py-4 text-center font-bubbly text-primary w-[25%]">PDF</th>
                        <th className="px-4 py-4 text-center font-bubbly text-primary w-[25%]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/50">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-muted-foreground">Loading content...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-red-500">{error}</td>
                        </tr>
                      ) : filteredContent.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-muted-foreground">No content found</td>
                        </tr>
                      ) : (
                        filteredContent.map((content) => (
                          <tr key={content.id} className="hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-4 truncate max-w-[200px] font-medium">{content.topicName}</td>
                            <td className="px-4 py-4 text-center truncate max-w-[150px]">{content.grade}</td>
                            <td className="px-4 py-4 text-center">
                              {content.pdfUrl ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-500 hover:text-blue-700 hover:underline flex items-center justify-center gap-2 mx-auto"
                                  onClick={() => handlePdfClick(content.pdfUrl)}
                                >
                                  <Eye className="h-4 w-4" />
                                  View PDF
                                </Button>
                              ) : (
                                <span className="text-muted-foreground">No PDF</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-lms-blue hover:bg-lms-blue/10"
                                  onClick={() => handleEdit(content)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-lms-pink hover:bg-lms-pink/10"
                                  onClick={() => handleDelete(content)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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
