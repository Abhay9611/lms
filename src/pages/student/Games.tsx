
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Star, Brain, Puzzle, Award } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const games = [
  {
    id: 1,
    title: "Alphabet Adventure",
    description: "Learn letters through a fun forest adventure",
    category: "English",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-pink",
    icon: <Star className="h-5 w-5" />,
    completed: true
  },
  {
    id: 2,
    title: "Counting Stars",
    description: "Count stars in the night sky to learn numbers",
    category: "Maths",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-blue",
    icon: <Brain className="h-5 w-5" />,
    completed: false
  },
  {
    id: 3,
    title: "Animal Sounds",
    description: "Listen and match animal sounds in this memory game",
    category: "EVS",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-green",
    icon: <Puzzle className="h-5 w-5" />,
    completed: false
  },
  {
    id: 4,
    title: "Shape Sorter",
    description: "Sort shapes and learn their names",
    category: "Maths",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1618540824901-8c1a0749ae11?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-purple",
    icon: <Puzzle className="h-5 w-5" />,
    completed: false
  },
  {
    id: 5,
    title: "Rhyme Time",
    description: "Sing along with animated rhymes and songs",
    category: "English Rhymes",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-yellow",
    icon: <Star className="h-5 w-5" />,
    completed: false
  },
  {
    id: 6,
    title: "Color Matching",
    description: "Match colors to objects in this fun game",
    category: "EVS",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?auto=format&fit=crop&q=80&w=1500",
    color: "bg-lms-pink",
    icon: <Puzzle className="h-5 w-5" />,
    completed: true
  }
];

const StudentGames = () => {
  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="school" density="low" />
        
        <div className="relative mb-6">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Gamepad2 className="mr-3 h-8 w-8" />
            Fun Learning Games
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Play these fun games to practice what you've learned!
          </p>
        </div>
        
        <Card className="border-4 border-lms-yellow/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-yellow/10">
            <CardTitle className="text-xl font-bubbly flex items-center">
              <Award className="h-5 w-5 mr-2 text-lms-yellow" />
              Your Game Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-lms-yellow/20 flex items-center justify-center">
                  <Star className="h-8 w-8 text-lms-yellow fill-lms-yellow" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bubbly text-lg">Game Master</h3>
                  <p className="text-muted-foreground text-sm">You've completed 2 of 6 games</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bubbly font-bold">2/6</div>
                <p className="text-muted-foreground text-sm">Games Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className={`border-4 border-${game.color}/30 rounded-3xl shadow-lg overflow-hidden transition-all hover:scale-105`}>
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center">
                    <div className={`${game.color} p-2 rounded-full`}>
                      {game.icon}
                    </div>
                    <span className="ml-2 text-sm font-medium">{game.category}</span>
                  </div>
                </div>
                {game.completed && (
                  <div className="absolute top-3 right-3 bg-lms-green text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Completed
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bubbly text-lg font-bold mb-1">{game.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                    {game.difficulty}
                  </span>
                  <Button size="sm" className={`${game.color}`}>
                    {game.completed ? "Play Again" : "Start Game"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGames;
