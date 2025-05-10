import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText, CheckCircle2, Video, File, FilePlus } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const ContentUpload = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    topic: '',
    contentType: 'document',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const grades = [
    'Pre-Nursery',
    'Nursery',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5'
  ];

  const subjects = [
    'English Rhymes',
    'EVS',
    'Maths',
    'Story Time',
    'Art & Craft',
    'General Knowledge'
  ];

  const contentTypes = [
    { value: 'document', label: 'Document', icon: <FileText className="h-4 w-4" /> },
    { value: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { value: 'quiz', label: 'Quiz', icon: <File className="h-4 w-4" /> },
    { value: 'activity', label: 'Activity', icon: <FilePlus className="h-4 w-4" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('grade', formData.grade);
      formDataToSend.append('topic', formData.topic);
      formDataToSend.append('contentType', formData.contentType);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      await axios.post(`${API_BASE_URL}/api/content/upload`, formDataToSend, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Show success message
      toast({
        title: "Content Uploaded Successfully",
        description: `"${formData.title}" has been uploaded for ${formData.grade} - ${formData.subject}`,
      });
      
      setIsSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: '',
          description: '',
          subject: '',
          grade: '',
          topic: '',
          contentType: 'document',
          file: null,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading content:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <UploadCloud className="mr-3 h-8 w-8" />
            Upload Educational Content
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Add new educational materials for students and teachers
          </p>
        </div>
        
        <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-blue/10">
            <CardTitle className="text-xl font-bubbly">Content Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-round">Content Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title of the content"
                    className="rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contentType" className="font-round">Content Type</Label>
                  <Select
                    value={formData.contentType}
                    onValueChange={(value) => handleSelectChange('contentType', value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="font-round">
                          <div className="flex items-center">
                            {type.icon}
                            <span className="ml-2">{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade" className="font-round">Grade Level</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => handleSelectChange('grade', value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade} className="font-round">
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-round">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleSelectChange('subject', value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="font-round">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic" className="font-round">Topic</Label>
                  <Input
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="Enter specific topic"
                    className="rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file" className="font-round">Upload File</Label>
                  <div className="border-2 border-dashed border-input rounded-xl p-4 text-center">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer block">
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                          {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, MP4, DOCX, PPTX up to 50MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="font-round">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter content description"
                  className="rounded-xl min-h-[100px]"
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  className="rounded-xl bg-primary hover:bg-primary/80 px-6 py-2 font-bubbly"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>Uploading...</>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Uploaded Successfully
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-5 w-5 mr-2" />
                      Upload Content
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-green/10">
            <CardTitle className="text-xl font-bubbly">Recently Uploaded Content</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { 
                  title: 'Introduction to Counting 1-10', 
                  grade: 'Nursery', 
                  subject: 'Maths', 
                  type: 'document',
                  date: '2025-04-05'
                },
                { 
                  title: 'Animals and Their Sounds', 
                  grade: 'Pre-Nursery', 
                  subject: 'EVS', 
                  type: 'video',
                  date: '2025-04-01'
                },
                { 
                  title: 'Twinkle Twinkle Little Star', 
                  grade: 'Pre-Nursery', 
                  subject: 'English Rhymes', 
                  type: 'activity',
                  date: '2025-03-28'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start p-4 border border-border rounded-xl">
                  <div className={`p-3 rounded-full mr-4 ${
                    item.type === 'document' ? 'bg-lms-blue/20 text-lms-blue' : 
                    item.type === 'video' ? 'bg-lms-red/20 text-lms-red' : 
                    'bg-lms-green/20 text-lms-green'
                  }`}>
                    {item.type === 'document' ? (
                      <FileText className="h-6 w-6" />
                    ) : item.type === 'video' ? (
                      <Video className="h-6 w-6" />
                    ) : (
                      <FilePlus className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium font-round">{item.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm mr-3">{item.grade}</span>
                      <span className="text-sm text-muted-foreground">{item.subject}</span>
                    </div>
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

export default ContentUpload;
