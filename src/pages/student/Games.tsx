
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Award, Star, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useNavigate } from 'react-router-dom';

const StudentGames = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Alphabet Adventure",
      description: "Learn alphabet letters through a fun adventure game",
      image: "https://placehold.co/300x200/FCD34D/1F2937?text=Alphabet+Adventure",
      category: "English",
      difficulty: "Easy",
      time: "10 min",
      color: "bg-lms-yellow"
    },
    {
      id: 2,
      title: "Counting Stars",
      description: "Count stars and other objects in this interactive math game",
      image: "https://placehold.co/300x200/60A5FA/FFFFFF?text=Counting+Stars",
      category: "Maths",
      difficulty: "Easy",
      time: "5 min",
      color: "bg-lms-blue"
    },
    {
      id: 3,
      title: "Animal Sounds",
      description: "Match animals with their sounds in this fun memory game",
      image: "https://placehold.co/300x200/4ADE80/1F2937?text=Animal+Sounds",
      category: "EVS",
      difficulty: "Medium",
      time: "8 min",
      color: "bg-lms-green"
    },
    {
      id: 4,
      title: "Color Mixer",
      description: "Learn about colors by mixing them in this interactive game",
      image: "https://placehold.co/300x200/EC4899/FFFFFF?text=Color+Mixer",
      category: "Art",
      difficulty: "Easy",
      time: "7 min",
      color: "bg-lms-pink"
    },
    {
      id: 5,
      title: "Story Builder",
      description: "Create your own story by arranging pictures in sequence",
      image: "https://placehold.co/300x200/9333EA/FFFFFF?text=Story+Builder",
      category: "Story Time",
      difficulty: "Medium",
      time: "15 min",
      color: "bg-lms-purple"
    },
    {
      id: 6,
      title: "Shape Sorter",
      description: "Sort different shapes and learn their names",
      image: "https://placehold.co/300x200/F87171/FFFFFF?text=Shape+Sorter",
      category: "Maths",
      difficulty: "Easy",
      time: "6 min",
      color: "bg-lms-red"
    }
  ];

  const popularGames = games.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="school" density="medium" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Gamepad2 className="mr-3 h-8 w-8" />
            Learning Games
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Have fun while learning with these educational games
          </p>
        </div>
        
        {/* Featured Games */}
        <div className="relative">
          <h2 className="text-2xl font-bubbly font-bold flex items-center mb-4">
            <Star className="mr-2 h-5 w-5 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
            Popular Games
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <Card key={game.id} className="border-4 border-dashed hover:border-solid hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                <div className="relative">
                  <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                  <div className={`absolute top-4 right-4 ${game.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {game.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bubbly font-bold mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="font-round">
                      {game.difficulty}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {game.time}
                    </div>
                  </div>
                  <Button 
                    className={`w-full rounded-xl ${game.color}`}
                    onClick={() => {
                      // In a real app this would navigate to the game
                      alert(`Starting ${game.title} game!`);
                    }}
                  >
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* All Games */}
        <div>
          <h2 className="text-2xl font-bubbly font-bold flex items-center mb-4">
            <Gamepad2 className="mr-2 h-5 w-5" />
            All Games
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <div 
                key={game.id} 
                className="bg-white rounded-3xl border-2 p-4 shadow hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center"
                onClick={() => {
                  // In a real app this would navigate to the game
                  alert(`Starting ${game.title} game!`);
                }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${game.color} mr-4 text-white`}>
                  {game.category === 'English' ? (
                    <span className="text-xl font-bold">A</span>
                  ) : game.category === 'Maths' ? (
                    <span className="text-xl font-bold">123</span>
                  ) : game.category === 'EVS' ? (
                    <span className="text-xl font-bold">🌿</span>
                  ) : game.category === 'Art' ? (
                    <span className="text-xl font-bold">🎨</span>
                  ) : game.category === 'Story Time' ? (
                    <span className="text-xl font-bold">📚</span>
                  ) : (
                    <Gamepad2 className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bubbly font-bold">{game.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="mr-3">{game.difficulty}</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {game.time}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bubbly font-bold flex items-center mb-4">
            <Award className="mr-2 h-5 w-5 text-lms-yellow" />
            Your Game Achievements
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Alphabet Master', progress: 80, color: 'bg-lms-pink' },
              { title: 'Math Explorer', progress: 60, color: 'bg-lms-blue' },
              { title: 'Story Teller', progress: 40, color: 'bg-lms-purple' }
            ].map((achievement, i) => (
              <Card key={i} className="border-4 border-dashed rounded-3xl overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${achievement.color} text-white`}>
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="font-bubbly font-bold text-lg mb-2">{achievement.title}</h3>
                  <div className="w-full bg-muted rounded-full h-4 mb-2">
                    <div 
                      className={`${achievement.color} h-4 rounded-full transition-all duration-500`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium">{achievement.progress}% Complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGames;
