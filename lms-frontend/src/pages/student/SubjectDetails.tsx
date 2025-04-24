import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PlayCircle,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  ListTodo,
  BookText,
  ScrollText,
  ArrowDown,
  File,
  FileText
} from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import Quiz, { QuizQuestion } from '@/components/learning/Quiz';
import Flashcard, { FlashcardItem } from '@/components/learning/Flashcard';
import PDFViewer from '@/components/learning/PDFViewer';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import YouTube from 'react-youtube';

// Type for learning material resource
type MaterialType = "worksheet" | "reading" | "activity" | "printable";

// Extending the interface to match our data structure
interface TopicLearningMaterial {
  id: string;
  title: string;
  type: MaterialType;
  description: string;
  url: string;
  pdfUrl: string;
}

// Update the topic interface
interface Topic {
  id: string;
  title: string;
  videoUrl: string[];
  materials: { title: string; url: string; }[];
  quiz: QuizQuestion[];
  flashcards: FlashcardItem[];
}

interface Subject {
  id: string;
  name: string;
  color: string;
  topics: Topic[];
}


const SubjectDetails = () => {

  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<string>('video');
  const [subjectDetails, setSubjectDetails] = useState<Subject | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);
  const [showContentArea, setShowContentArea] = useState<boolean>(!isMobileView);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);


  const getYouTubeID = (embedUrl: string) => {
    // match the last chunk after the last slash
    const match = embedUrl.match(/\/embed\/([^?&/]+)/);
    return match ? match[1] : null;
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      rel: 0,
    },
  };

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch subject details by subject ID
        const subjectRes = await axios.get(`http://localhost:3000/api/subjects/${id}`);
        console.log("Fetched subject details from backend:", subjectRes.data);
        const subjectData = subjectRes.data;

        // Fetch all topics and filter by subjectId
        const topicsRes = await axios.get("http://localhost:3000/api/topics");
        const contentsRes = await axios.get("http://localhost:3000/api/contents");
        const materialsRes = await axios.get("http://localhost:3000/api/teaching-guides");
        const quizzesRes = await axios.get("http://localhost:3000/api/quizzes");

        const filteredTopics: Topic[] = topicsRes.data.filter((topic: any) => topic.subjectId === id).map((topic: any) => {
          const videoUrls = contentsRes.data
            .filter((content: any) => content.topicId === topic.id)
            .map((content: any) => content.videoUrl || []);
          const materials = materialsRes.data.filter((material: any) => material.topicId === topic.id).map((material: any) => ({
            title: material.title || '',
            url: material.pdfUrl || ''
          }));
          const quizzes = quizzesRes.data.filter((quiz: any) => quiz.topicId === topic.id).map((quiz: any) => {
            const mapping = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
            const options = [quiz.option1_text, quiz.option2_text, quiz.option3_text, quiz.option4_text];
            const shuffledOptions = mapping.map(index => options[index]);
            const correctOption = [quiz.option1_iscorrect, quiz.option2_iscorrect, quiz.option3_iscorrect, quiz.option4_iscorrect];
            const shuffledCorrectOptionIndex = mapping.map(index => correctOption[index]);
            const correctOptionIndex = shuffledCorrectOptionIndex.findIndex(isCorrect => isCorrect);
            const correctAnswer = shuffledOptions[correctOptionIndex];
            const explanationList = [quiz.option1_explanation, quiz.option2_explanation, quiz.option3_explanation, quiz.option4_explanation];
            const shuffledExplanation = mapping.map(index => explanationList[index]);
            const explanation = shuffledExplanation[correctOptionIndex];
            return {
              id: quiz.id,
              question: quiz.question,
              options: shuffledOptions,
              correctAnswer: correctAnswer,
              explanation: explanation
            };
          });
          console.log("Fetched quizzes from backend:", quizzes);
          return {
            id: topic.id || '',
            title: topic.title || '',
            description: topic.description || '',
            videoUrl: videoUrls,
            materials: materials,
            quiz: quizzes
          };
        });
        console.log("Fetched topics from backend:", filteredTopics);

        // Update subject details with filtered topics
        setSubjectDetails({ ...subjectData, topics: filteredTopics, color: '#FF0000' });

        console.log("Subject details:", subjectDetails);
      } catch (err: any) {
        setError(err.message || "Failed to fetch subject details");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjectDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobileView(mobileView);
      setShowContentArea(!mobileView);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading subject details...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!subjectDetails) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Button onClick={() => navigate('/student/subjects')}>Go back to subjects</Button>
        </div>
      </DashboardLayout>
    );
  }

  const currentTopic: Topic = selectedTopic || subjectDetails.topics[0];


  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(subjectDetails.topics.find(t => t.id === topicId) || null);
    setActiveTab('video');
    if (isMobileView) {
      setShowContentArea(true);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const updateProgress = async () => {
      const res = await axios.post(`http://localhost:3000/api/topics/progress/${currentTopic.id}`, {
        completedItem: "quiz"
      });
    }
    updateProgress();
    toast({
      title: `Quiz completed!`,
      description: `You scored ${score} out of ${total} (${percentage}%)`,
    });
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : currentTopic.videoUrl.length - 1));
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex < currentTopic.videoUrl.length - 1 ? prevIndex + 1 : 0));
  };

  const handleVideoEnded = () => {
    const updateProgress = async () => {
      const res = await axios.post(`http://localhost:3000/api/topics/progress/${currentTopic.id}`, {
        completedItem: "video"
      });
    }
    updateProgress();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 relative">
        <AnimatedCharacters variant="school" density="low" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/student/subjects')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className={`text-3xl font-bubbly font-bold ${subjectDetails.color.replace('bg-', 'text-')}`}>
              {subjectDetails.name}
            </h1>
          </div>
        </div>
        {/*         
        <p className="text-lg text-muted-foreground mb-6 font-round">{subjectDetails.description}</p> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topic selection sidebar */}
          {(!showContentArea || !isMobileView) && (
            <div className="lg:col-span-1">
              <Card className="border-4 border-dashed sticky top-4 rounded-3xl overflow-hidden">
                <CardHeader className={`${subjectDetails.color} bg-opacity-20`}>
                  <CardTitle className="text-lg font-bubbly">Topics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: '660px' }}>
                  <div className="space-y-2">
                    {subjectDetails.topics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={topic.id === (selectedTopic?.id || subjectDetails.topics[0].id) ? "default" : "outline"}
                        className={`w-full justify-start text-left rounded-xl ${topic.id === (selectedTopic?.id || subjectDetails.topics[0].id)
                          ? subjectDetails.color
                          : "hover:" + subjectDetails.color
                          }`}
                        onClick={() => handleTopicSelect(topic.id)}
                      >
                        <div className="truncate">{topic.title}</div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Content area */}
          {showContentArea && (
            <div className="lg:col-span-3">
              <Card className="border-4 border-dashed rounded-3xl overflow-hidden">
                <CardHeader className={`${subjectDetails.color} bg-opacity-20`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowContentArea(false)}
                        className="rounded-full mr-2 lg:hidden"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <CardTitle className="text-xl font-bubbly">{currentTopic?.title}</CardTitle>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                          <TabsTrigger value="video" className="text-sm">
                            <PlayCircle className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Video</span>
                          </TabsTrigger>
                          <TabsTrigger value="quiz" className="text-sm">
                            <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Quiz</span>
                          </TabsTrigger>

                          <TabsTrigger value="materials" className="text-sm">
                            <BookText className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Materials</span>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {currentTopic && (
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                      <TabsContent value="video" className="mt-0">
                        {/* <p className="text-muted-foreground mb-6 font-round">{currentTopic.description}</p> */}
                        <div className="aspect-video bg-black mb-6 rounded-xl overflow-hidden relative">
                          {/* <iframe
                            src={currentTopic && currentTopic.videoUrl && currentTopic.videoUrl.length > 0 ? currentTopic.videoUrl[currentVideoIndex] : ''}
                            title={currentTopic ? currentTopic.title : 'No Video Available'}
                            className="w-full h-full"
                            onEnded={() => handleVideoEnded()}
                            allowFullScreen
                          ></iframe> */}
                          {currentTopic && currentTopic.videoUrl && currentTopic.videoUrl.length > 0 ? (
                            <YouTube
                              style={{ width: '100%', height: '100%' }}
                              videoId={getYouTubeID(currentTopic.videoUrl[currentVideoIndex])}
                              opts={opts}
                              onEnd={handleVideoEnded}
                            />
                          ) : (
                            <div className="text-center w-full h-full flex items-center justify-center text-white text-2xl font-bold font-bubbly">Videos coming soon!</div>
                          )}
                        </div>
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={handlePreviousVideo}
                            className="bg-white bg-opacity-50 p-2 rounded-full"
                          >
                            ◀
                          </button>
                          <button
                            onClick={handleNextVideo}
                            className="bg-white bg-opacity-50 p-2 rounded-full"
                          >
                            ▶
                          </button>
                        </div>
                      </TabsContent>

                      <TabsContent value="quiz" className="mt-0">
                        {currentTopic.quiz && currentTopic.quiz.length > 0 ? (
                          <Quiz
                            title={`Quiz: ${currentTopic.title}`}
                            description="Let's see how much you've learned!"
                            questions={currentTopic.quiz}
                            onComplete={handleQuizComplete}
                            subjectColor={subjectDetails.color}
                          />
                        ) : (
                          <div className="text-center text-gray-500">No Quiz Available</div>
                        )}
                      </TabsContent>



                      <TabsContent value="materials" className="mt-0">
                        {currentTopic?.materials.length === 0 ? (
                          <div className="text-center text-gray-500">No Materials Available</div>
                        ) : (
                          currentTopic.materials.map((material) => (
                            <div key={material.url} className="flex items-center justify-between p-4 border-b">
                              <div className="flex items-center space-x-4">
                                <FileText className="h-6 w-6 text-gray-500" />
                                <div>
                                  <div className="text-lg font-semibold">{material.url}</div>
                                  <div className="text-sm text-gray-500">Created at: {new Date().toLocaleDateString()}</div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => window.open(`http://localhost:3000/uploads/${material.url}`, '_blank')}
                                className="rounded-full"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubjectDetails;
