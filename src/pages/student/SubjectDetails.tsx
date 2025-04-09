
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

// Dummy subject data
const subjects = {
  '1': {
    id: '1',
    name: 'English Rhymes',
    color: 'bg-lms-pink',
    description: 'Fun rhymes and songs to learn English sounds and words',
    topics: [
      {
        id: 't1',
        title: 'Twinkle Twinkle Little Star',
        description: 'Learn this classic nursery rhyme with animations and fun activities',
        videoUrl: 'https://www.youtube.com/embed/yCjJyiqpAuU',
        quizUrl: '#/quiz/1',
        materials: [
          { title: 'Illustrated Lyrics PDF', url: '#/materials/1' },
          { title: 'Coloring Activity', url: '#/activities/1' }
        ]
      },
      {
        id: 't2',
        title: 'Baa Baa Black Sheep',
        description: 'A fun rhyme about a black sheep with beautiful animations',
        videoUrl: 'https://www.youtube.com/embed/MR5XSOdjKMA',
        quizUrl: '#/quiz/2',
        materials: [
          { title: 'Sing Along Cards', url: '#/materials/2' },
          { title: 'Animal Sounds Activity', url: '#/activities/2' }
        ]
      },
      {
        id: 't3',
        title: 'Incy Wincy Spider',
        description: 'Learn about perseverance with the little spider that never gives up!',
        videoUrl: 'https://www.youtube.com/embed/YAJynCIsNUg',
        quizUrl: '#/quiz/3',
        materials: [
          { title: 'Spider Craft Template', url: '#/materials/3' },
          { title: 'Weather Words Activity', url: '#/activities/3' }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    name: 'EVS',
    color: 'bg-lms-green',
    description: 'Explore the world around you through fun activities',
    topics: [
      {
        id: 't1',
        title: 'Plants Around Us',
        description: 'Learn about different types of plants and what they need to grow',
        videoUrl: 'https://www.youtube.com/embed/TE6xptjgNR0',
        quizUrl: '#/quiz/4',
        materials: [
          { title: 'Plant Growth Chart', url: '#/materials/4' },
          { title: 'Seed Planting Activity', url: '#/activities/4' }
        ]
      },
      {
        id: 't2',
        title: 'Wild Animals',
        description: 'Discover fascinating facts about animals living in the wild',
        videoUrl: 'https://www.youtube.com/embed/CA6Mofzh7jo',
        quizUrl: '#/quiz/5',
        materials: [
          { title: 'Animal Habitats Poster', url: '#/materials/5' },
          { title: 'Animal Sounds Activity', url: '#/activities/5' }
        ]
      },
      {
        id: 't3',
        title: 'Water Cycle',
        description: 'See how water moves through our world in a never-ending cycle',
        videoUrl: 'https://www.youtube.com/embed/ncORPosDrjI',
        quizUrl: '#/quiz/6',
        materials: [
          { title: 'Water Cycle Diagram', url: '#/materials/6' },
          { title: 'Cloud in a Jar Experiment', url: '#/activities/6' }
        ]
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Maths',
    color: 'bg-lms-blue',
    description: 'Learn counting, shapes, and basic math through games',
    topics: [
      {
        id: 't1',
        title: 'Counting Numbers 1-10',
        description: 'Learn to count objects and recognize number symbols',
        videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA',
        quizUrl: '#/quiz/7',
        materials: [
          { title: 'Number Flashcards', url: '#/materials/7' },
          { title: 'Counting Game', url: '#/activities/7' }
        ]
      },
      {
        id: 't2',
        title: 'Basic Shapes',
        description: 'Identify circles, squares, triangles and more!',
        videoUrl: 'https://www.youtube.com/embed/dsR0h50BiFQ',
        quizUrl: '#/quiz/8',
        materials: [
          { title: 'Shape Matching Cards', url: '#/materials/8' },
          { title: 'Shape Hunt Activity', url: '#/activities/8' }
        ]
      },
      {
        id: 't3',
        title: 'Simple Addition',
        description: 'Learn to add numbers together with fun visual examples',
        videoUrl: 'https://www.youtube.com/embed/AkQUULgG8VY',
        quizUrl: '#/quiz/9',
        materials: [
          { title: 'Addition Worksheet', url: '#/materials/9' },
          { title: 'Addition Game', url: '#/activities/9' }
        ]
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Story Time',
    color: 'bg-lms-purple',
    description: 'Amazing stories with colorful pictures and fun activities',
    topics: [
      {
        id: 't1',
        title: 'The Three Little Pigs',
        description: 'A classic tale about three pig brothers and a big bad wolf',
        videoUrl: 'https://www.youtube.com/embed/QLR2pLUsl-Y',
        quizUrl: '#/quiz/10',
        materials: [
          { title: 'Story Sequence Cards', url: '#/materials/10' },
          { title: 'House Building Activity', url: '#/activities/10' }
        ]
      },
      {
        id: 't2',
        title: 'Little Red Riding Hood',
        description: 'Join Little Red on her adventure through the forest',
        videoUrl: 'https://www.youtube.com/embed/LDMWJCrDVMI',
        quizUrl: '#/quiz/11',
        materials: [
          { title: 'Character Masks', url: '#/materials/11' },
          { title: 'Story Map Activity', url: '#/activities/11' }
        ]
      },
      {
        id: 't3',
        title: 'The Gingerbread Man',
        description: 'Can you catch the clever gingerbread man?',
        videoUrl: 'https://www.youtube.com/embed/YoQyyB5xvLk',
        quizUrl: '#/quiz/12',
        materials: [
          { title: 'Gingerbread Recipe', url: '#/materials/12' },
          { title: 'Running Race Game', url: '#/activities/12' }
        ]
      }
    ]
  }
};

const SubjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const subject = id ? subjects[id as keyof typeof subjects] : null;
  
  if (!subject) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Button onClick={() => navigate('/student/subjects')}>Go back to subjects</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 relative">
        <AnimatedCharacters variant="school" density="low" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/student/subjects')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className={`text-3xl font-bubbly font-bold ${subject.color.replace('bg-', 'text-')}`}>
              {subject.name}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground mb-6 font-round">{subject.description}</p>
        
        <div className="space-y-6">
          {subject.topics.map((topic, index) => (
            <Card key={topic.id} className="border-4 border-dashed rounded-3xl overflow-hidden">
              <CardHeader className={`${subject.color} bg-opacity-20`}>
                <CardTitle className="text-xl font-bubbly">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6 font-round">{topic.description}</p>
                
                <div className="aspect-video bg-black mb-6 rounded-xl overflow-hidden">
                  <iframe 
                    src={topic.videoUrl} 
                    title={topic.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className={`${subject.color} rounded-xl`}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Take the Quiz
                  </Button>
                  
                  <h3 className="w-full text-lg font-bold mt-4 mb-2">Learning Materials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {topic.materials.map((material, idx) => (
                      <Button key={idx} variant="outline" className="justify-start rounded-xl">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {material.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubjectDetails;
