
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Star, Award } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

// Mock topic data for each subject
const topicsBySubject = {
  'english': [
    { id: 1, title: 'Twinkle Twinkle Little Star', type: 'rhyme', level: 'easy', completed: true },
    { id: 2, title: 'Baa Baa Black Sheep', type: 'rhyme', level: 'easy', completed: true },
    { id: 3, title: 'Alphabet Song', type: 'rhyme', level: 'medium', completed: false },
    { id: 4, title: 'Wheels on the Bus', type: 'rhyme', level: 'medium', completed: false },
    { id: 5, title: 'Incy Wincy Spider', type: 'rhyme', level: 'hard', completed: false },
  ],
  'evs': [
    { id: 1, title: 'Animals and Their Homes', type: 'activity', level: 'easy', completed: true },
    { id: 2, title: 'Weather and Seasons', type: 'activity', level: 'easy', completed: false },
    { id: 3, title: 'Our Body Parts', type: 'activity', level: 'medium', completed: false },
    { id: 4, title: 'Plants Around Us', type: 'activity', level: 'medium', completed: false },
    { id: 5, title: 'My Family', type: 'activity', level: 'easy', completed: false },
  ],
  'maths': [
    { id: 1, title: 'Counting 1 to 10', type: 'activity', level: 'easy', completed: true },
    { id: 2, title: 'Shapes and Colors', type: 'activity', level: 'easy', completed: true },
    { id: 3, title: 'Basic Addition', type: 'activity', level: 'medium', completed: false },
    { id: 4, title: 'Patterns', type: 'activity', level: 'medium', completed: false },
    { id: 5, title: 'Size Comparison', type: 'activity', level: 'easy', completed: false },
  ],
  'story': [
    { id: 1, title: 'The Three Little Pigs', type: 'story', level: 'easy', completed: true },
    { id: 2, title: 'The Lion and the Mouse', type: 'story', level: 'easy', completed: false },
    { id: 3, title: 'Jack and the Beanstalk', type: 'story', level: 'medium', completed: false },
    { id: 4, title: 'Goldilocks and the Three Bears', type: 'story', level: 'medium', completed: false },
    { id: 5, title: 'The Gingerbread Man', type: 'story', level: 'easy', completed: false },
  ]
};

// Map of subject IDs to their details
const subjectDetails = {
  '1': { id: 1, name: 'English Rhymes', key: 'english', color: 'bg-lms-pink', textColor: 'text-lms-pink', variant: 'school' },
  '2': { id: 2, name: 'EVS', key: 'evs', color: 'bg-lms-green', textColor: 'text-lms-green', variant: 'forest' },
  '3': { id: 3, name: 'Maths', key: 'maths', color: 'bg-lms-blue', textColor: 'text-lms-blue', variant: 'minimal' },
  '4': { id: 4, name: 'Story Time', key: 'story', color: 'bg-lms-purple', textColor: 'text-lms-purple', variant: 'space' },
};

const SubjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('all');
  const subject = subjectDetails[id as keyof typeof subjectDetails];
  
  if (!subject) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">Subject not found</div>
      </DashboardLayout>
    );
  }
  
  const topics = topicsBySubject[subject.key as keyof typeof topicsBySubject] || [];
  
  // Filter topics based on active tab
  const filteredTopics = activeTab === 'all' 
    ? topics 
    : activeTab === 'completed' 
      ? topics.filter(topic => topic.completed) 
      : topics.filter(topic => !topic.completed);
  
  return (
    <DashboardLayout>
      <div className="relative pb-12">
        <AnimatedCharacters variant={subject.variant as 'school' | 'forest' | 'minimal' | 'space'} density="medium" />
        
        <div className="mb-6 relative">
          <h1 className={`text-4xl font-bubbly font-bold ${subject.textColor} flex items-center`}>
            <BookOpen className="mr-3 h-8 w-8" />
            {subject.name}
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Explore fun {subject.name.toLowerCase()} and activities designed just for you!
          </p>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('all')}
            className="rounded-full font-bubbly text-md"
          >
            All Topics
          </Button>
          <Button 
            variant={activeTab === 'completed' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('completed')}
            className="rounded-full font-bubbly text-md"
          >
            Completed
          </Button>
          <Button 
            variant={activeTab === 'pending' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('pending')}
            className="rounded-full font-bubbly text-md"
          >
            In Progress
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(topic => (
            <Card key={topic.id} className="border-4 border-dashed hover:border-solid hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className={`${subject.color} h-4 w-full`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {topic.completed ? (
                      <div className="bg-lms-green/20 p-1 rounded-full">
                        <Star className="h-5 w-5 text-lms-green fill-lms-green animate-pulse" />
                      </div>
                    ) : (
                      <div className="bg-lms-yellow/20 p-1 rounded-full">
                        <Book className="h-5 w-5 text-lms-yellow" />
                      </div>
                    )}
                  </div>
                  <span className="font-bubbly text-lg">{topic.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {topic.type}
                  </span>
                  <span className={`text-sm ${
                    topic.level === 'easy' ? 'bg-green-100 text-green-600' :
                    topic.level === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  } px-3 py-1 rounded-full`}>
                    {topic.level}
                  </span>
                </div>
                <Button className="w-full font-round">
                  {topic.completed ? 'Review Again' : 'Start Learning'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bubbly mb-2">No topics found</h3>
            <p className="text-muted-foreground">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SubjectDetails;
