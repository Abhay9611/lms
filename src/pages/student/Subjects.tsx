
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { BookOpen, Book, Star } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Preschool-specific subjects
const preschoolSubjects = [
  { 
    id: 1, 
    name: 'English Rhymes', 
    description: 'Fun rhymes and songs to learn English sounds and words',
    imageUrl: '/subjects/english.jpg',
    color: 'bg-lms-pink',
    textColor: 'text-lms-pink',
    progress: 65,
    topics: [
      "Twinkle Twinkle Little Star",
      "Baa Baa Black Sheep",
      "Alphabet Song",
      "Wheels on the Bus",
      "Incy Wincy Spider"
    ],
    icon: <BookOpen className="h-6 w-6" />
  },
  { 
    id: 2, 
    name: 'EVS', 
    description: 'Explore the world around you through fun activities',
    imageUrl: '/subjects/evs.jpg',
    color: 'bg-lms-green',
    textColor: 'text-lms-green',
    progress: 40,
    topics: [
      "Animals and Their Homes",
      "Weather and Seasons",
      "Our Body Parts",
      "Plants Around Us",
      "My Family"
    ],
    icon: <Star className="h-6 w-6" />
  },
  { 
    id: 3, 
    name: 'Maths', 
    description: 'Learn counting, shapes, and basic math through games',
    imageUrl: '/subjects/math.jpg',
    color: 'bg-lms-blue',
    textColor: 'text-lms-blue',
    progress: 30,
    topics: [
      "Counting 1 to 10",
      "Shapes and Colors",
      "Basic Addition",
      "Patterns",
      "Size Comparison"
    ],
    icon: <Star className="h-6 w-6" />
  },
  { 
    id: 4, 
    name: 'Story Time', 
    description: 'Amazing stories with colorful pictures and fun activities',
    imageUrl: '/subjects/story.jpg',
    color: 'bg-lms-purple',
    textColor: 'text-lms-purple',
    progress: 50,
    topics: [
      "The Three Little Pigs",
      "The Lion and the Mouse",
      "Jack and the Beanstalk",
      "Goldilocks and the Three Bears",
      "The Gingerbread Man"
    ],
    icon: <Book className="h-6 w-6" />
  }
];

const Subjects = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="relative space-y-8">
        <AnimatedCharacters variant="school" density="high" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <BookOpen className="mr-3 h-8 w-8" />
            My Subjects
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Explore all your fun learning subjects!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {preschoolSubjects.map((subject) => (
            <Card 
              key={subject.id}
              className="rounded-3xl overflow-hidden border-4 border-dashed hover:border-solid transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col"
              onClick={() => navigate(`/student/subjects/${subject.id}`)}
            >
              <div className={`${subject.color} h-6 w-full`}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`${subject.color} p-3 rounded-full mr-3`}>
                      {subject.icon}
                    </div>
                    <h2 className="text-2xl font-bubbly">{subject.name}</h2>
                  </div>
                  <div className={`${subject.textColor} font-medium flex items-center`}>
                    <div className="bg-lms-yellow/10 text-lms-yellow px-3 py-1 rounded-full text-sm">
                      {subject.progress}% Complete
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{subject.description}</p>
                
                <div className="mb-4 flex-1">
                  <h3 className="font-bubbly mb-2">Topics:</h3>
                  <ul className="space-y-2">
                    {subject.topics.slice(0, 3).map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <div className={`${subject.color} w-2 h-2 rounded-full mr-2`}></div>
                        <span>{topic}</span>
                      </li>
                    ))}
                    {subject.topics.length > 3 && (
                      <li className="text-muted-foreground text-sm pl-4">
                        And {subject.topics.length - 3} more topics...
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-3 rounded-full" />
                  <Button className="w-full mt-4">
                    Explore Subject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subjects;
