
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, BookOpen, CheckCircle, ArrowLeft, File, Film, FileAudio, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

const ContentUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadComplete(true);
    
    toast({
      title: "Content uploaded successfully!",
      description: "The new content is now available for students and teachers."
    });
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
  };
  
  const handleBackToContent = () => {
    navigate('/admin/content');
  };

  if (uploadComplete) {
    return (
      <DashboardLayout>
        <div className="relative space-y-6">
          <AnimatedCharacters variant="space" density="low" />
          
          <div className="relative mb-6">
            <Button 
              variant="ghost" 
              className="mb-4 pl-0 text-muted-foreground"
              onClick={handleBackToContent}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Content Library
            </Button>
            
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <CheckCircle className="mr-3 h-8 w-8 text-lms-green" />
              Upload Complete
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Your content has been successfully uploaded
            </p>
          </div>
          
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly text-lms-green">Success!</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-lms-green/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-lms-green" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bubbly font-bold mb-4">Content Uploaded Successfully</h2>
              <p className="text-muted-foreground mb-6">
                Your content "Twinkle Twinkle Little Star" has been added to the library
                and is now available for students and teachers.
              </p>
              
              <div className="flex flex-col gap-4 md:flex-row md:justify-center">
                <Button 
                  variant="outline" 
                  className="rounded-xl"
                  onClick={() => setUploadComplete(false)}
                >
                  Upload Another
                </Button>
                <Button 
                  className="rounded-xl bg-lms-green"
                  onClick={handleBackToContent}
                >
                  View Content Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="relative mb-6">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 text-muted-foreground"
            onClick={handleBackToContent}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content Library
          </Button>
          
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Upload className="mr-3 h-8 w-8" />
            Upload New Content
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Add new educational content to the BookWorm Academy platform
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
          </div>
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">
              {step === 1 && "Content Details"}
              {step === 2 && "Upload Files"}
              {step === 3 && "Review & Publish"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Content Title</Label>
                      <Input id="title" placeholder="e.g. Twinkle Twinkle Little Star" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Content Type</Label>
                      <Select defaultValue="rhyme">
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rhyme">Rhyme</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="activity">Activity</SelectItem>
                          <SelectItem value="game">Game</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select defaultValue="nursery">
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-nursery">Pre-Nursery (2-3 yrs)</SelectItem>
                          <SelectItem value="nursery">Nursery (3-4 yrs)</SelectItem>
                          <SelectItem value="lkg">LKG (4-5 yrs)</SelectItem>
                          <SelectItem value="ukg">UKG (5-6 yrs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select defaultValue="english-rhymes">
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english-rhymes">English Rhymes</SelectItem>
                          <SelectItem value="evs">EVS</SelectItem>
                          <SelectItem value="maths">Maths</SelectItem>
                          <SelectItem value="story-time">Story Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Select defaultValue="nursery-rhymes">
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursery-rhymes">Nursery Rhymes</SelectItem>
                          <SelectItem value="alphabets">Alphabets</SelectItem>
                          <SelectItem value="numbers">Numbers</SelectItem>
                          <SelectItem value="colors">Colors</SelectItem>
                          <SelectItem value="shapes">Shapes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter a description of the content" rows={4} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <RadioGroup defaultValue="easy" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy" />
                        <Label htmlFor="easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard" />
                        <Label htmlFor="hard">Hard</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4 border-t pt-4">
                    <Label>Additional Settings</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="featured">Featured Content</Label>
                        <p className="text-sm text-muted-foreground">Display prominently on the dashboard</p>
                      </div>
                      <Switch id="featured" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="active">Publish Immediately</Label>
                        <p className="text-sm text-muted-foreground">Make available as soon as uploaded</p>
                      </div>
                      <Switch id="active" defaultChecked />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Primary Content File</Label>
                    <div className="border-2 border-dashed border-muted rounded-xl p-10 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bubbly mb-2">Drag and drop your main content file</h3>
                      <p className="text-muted-foreground mb-4">Supported formats: PDF, MP4, MP3, PPTX</p>
                      <div className="flex justify-center">
                        <Button className="rounded-xl">Browse Files</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Additional Materials</Label>
                      <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center">
                        <Film className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <h4 className="text-sm font-medium mb-1">Video</h4>
                        <p className="text-xs text-muted-foreground mb-2">Add a supporting video</p>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                          Upload Video
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>&nbsp;</Label>
                      <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center">
                        <FileAudio className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <h4 className="text-sm font-medium mb-1">Audio</h4>
                        <p className="text-xs text-muted-foreground mb-2">Add an audio recording</p>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                          Upload Audio
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center">
                        <Image className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <h4 className="text-sm font-medium mb-1">Images</h4>
                        <p className="text-xs text-muted-foreground mb-2">Add supporting images</p>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                          Upload Images
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center">
                        <File className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <h4 className="text-sm font-medium mb-1">Worksheet</h4>
                        <p className="text-xs text-muted-foreground mb-2">Add a printable activity sheet</p>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                          Upload Worksheet
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-bubbly font-medium mb-3">Sample File Uploaded</h3>
                    <div className="bg-muted/20 p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileAudio className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">twinkle_twinkle.mp3</p>
                          <p className="text-xs text-muted-foreground">2.4 MB · Audio</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/20 p-6 rounded-xl">
                    <h3 className="text-lg font-bubbly mb-4">Content Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Title</p>
                        <p className="font-medium">Twinkle Twinkle Little Star</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">Rhyme</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="font-medium">Nursery (3-4 yrs)</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Subject</p>
                        <p className="font-medium">English Rhymes</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Topic</p>
                        <p className="font-medium">Nursery Rhymes</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Difficulty</p>
                        <p className="font-medium">Easy</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p>A classic nursery rhyme with animated visuals and interactive elements to engage young learners.</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-bubbly font-medium mb-3">Files Included</h3>
                    <div className="space-y-2">
                      <div className="bg-muted/20 p-3 rounded-xl flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileAudio className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">twinkle_twinkle.mp3</p>
                          <p className="text-xs text-muted-foreground">Main Audio File</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-3 rounded-xl flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Film className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">twinkle_animation.mp4</p>
                          <p className="text-xs text-muted-foreground">Video Animation</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-3 rounded-xl flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <File className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">twinkle_worksheet.pdf</p>
                          <p className="text-xs text-muted-foreground">Activity Worksheet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="font-bubbly font-medium">Publishing Settings</h3>
                        <p className="text-sm text-muted-foreground">This content will be visible to students and teachers.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-xl"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-xl"
                    onClick={handleBackToContent}
                  >
                    Cancel
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button 
                    type="button" 
                    className="rounded-xl"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="rounded-xl"
                  >
                    Upload Content
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContentUpload;
