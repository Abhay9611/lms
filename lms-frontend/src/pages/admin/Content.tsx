import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Search, Edit, Trash2, FileText, Film, Music, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import AddContentModal from '@/components/content/AddContentModal';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
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

const API_BASE_URL = 'http://localhost:5000';

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
          axios.get(`${API_BASE_URL}/api/contents`, { headers }),
          axios.get(`${API_BASE_URL}/api/topics`, { headers }),
          axios.get(`${API_BASE_URL}/api/subjects`, { headers }),
          axios.get(`${API_BASE_URL}/api/grades`, { headers }),
          axios.get(`${API_BASE_URL}/api/teaching-guides`, { headers })
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

  const handlePdfClick = (pdfUrl: string) => {
    if (!pdfUrl) return;
    
    // Construct the URL to access the uploaded file
    const fullUrl = `${API_BASE_URL}/uploads/${pdfUrl}`;
    
    // Open in new tab
    window.open(fullUrl, '_blank');
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

      await axios.delete(`${API_BASE_URL}/api/contents/${selectedContent.id}`, { headers });

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

      await axios.put(`${API_BASE_URL}/api/contents/${updatedContent.id}`, updatedContent, { headers });

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
            content={selectedContent}
            onUpdate={handleContentUpdate}
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
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-bubbly text-primary w-[25%]">Title</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">Type</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-bubbly text-primary w-[20%]">Topic</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">Class</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[15%]">PDF</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bubbly text-primary w-[10%]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8">Loading content...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-red-500">{error}</td>
                        </tr>
                      ) : filteredContent.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8">No content found</td>
                        </tr>
                      ) : (
                        filteredContent.map(item => (
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
                            <td className="px-2 md:px-4 py-2 md:py-3 truncate max-w-[100px]">{item.topicName}</td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-center truncate max-w-[100px]">{item.grade}</td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                              {item.pdfUrl ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-500 hover:text-blue-700 hover:underline flex items-center justify-center gap-1"
                                  onClick={() => handlePdfClick(item.pdfUrl)}
                                >
                                  <FileText className="h-4 w-4" />
                                  View PDF
                                </Button>
                              ) : (
                                <span className="text-muted-foreground">No PDF</span>
                              )}
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 md:h-8 w-6 md:w-8 p-0 text-lms-blue hover:bg-lms-blue/10"
                                  onClick={() => handleEdit(item)}
                                >
                                  <Edit className="h-3 md:h-4 w-3 md:w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 md:h-8 w-6 md:w-8 p-0 text-lms-pink hover:bg-lms-pink/10"
                                  onClick={() => handleDelete(item)}
                                >
                                  <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
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
