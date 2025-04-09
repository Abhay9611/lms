
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Award, Star, Clock, ArrowRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const StudentGames = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<any>(null);

  const games = [
    {
      id: 1,
      title: "Alphabet Adventure",
      description: "Learn alphabet letters through a fun adventure game",
      image: "https://placehold.co/300x200/FCD34D/1F2937?text=Alphabet+Adventure",
      category: "English",
      difficulty: "Easy",
      time: "10 min",
      color: "bg-lms-yellow",
      gameContent: {
        type: "memory",
        cards: [
          { id: 1, value: "A", match: "Apple" },
          { id: 2, value: "Apple", match: "A" },
          { id: 3, value: "B", match: "Banana" },
          { id: 4, value: "Banana", match: "B" },
          { id: 5, value: "C", match: "Cat" },
          { id: 6, value: "Cat", match: "C" },
          { id: 7, value: "D", match: "Dog" },
          { id: 8, value: "Dog", match: "D" }
        ]
      }
    },
    {
      id: 2,
      title: "Counting Stars",
      description: "Count stars and other objects in this interactive math game",
      image: "https://placehold.co/300x200/60A5FA/FFFFFF?text=Counting+Stars",
      category: "Maths",
      difficulty: "Easy",
      time: "5 min",
      color: "bg-lms-blue",
      gameContent: {
        type: "counting",
        questions: [
          { id: 1, image: "⭐⭐⭐", answer: 3 },
          { id: 2, image: "⭐⭐⭐⭐⭐", answer: 5 },
          { id: 3, image: "⭐⭐", answer: 2 },
          { id: 4, image: "⭐⭐⭐⭐", answer: 4 }
        ]
      }
    },
    {
      id: 3,
      title: "Animal Sounds",
      description: "Match animals with their sounds in this fun memory game",
      image: "https://placehold.co/300x200/4ADE80/1F2937?text=Animal+Sounds",
      category: "EVS",
      difficulty: "Medium",
      time: "8 min",
      color: "bg-lms-green",
      gameContent: {
        type: "match",
        pairs: [
          { id: 1, value: "Dog", match: "Woof" },
          { id: 2, value: "Cat", match: "Meow" },
          { id: 3, value: "Cow", match: "Moo" },
          { id: 4, value: "Bird", match: "Tweet" }
        ]
      }
    },
    {
      id: 4,
      title: "Color Mixer",
      description: "Learn about colors by mixing them in this interactive game",
      image: "https://placehold.co/300x200/EC4899/FFFFFF?text=Color+Mixer",
      category: "Art",
      difficulty: "Easy",
      time: "7 min",
      color: "bg-lms-pink",
      gameContent: {
        type: "colorMixer",
        combinations: [
          { id: 1, color1: "Yellow", color2: "Blue", result: "Green" },
          { id: 2, color1: "Red", color2: "Blue", result: "Purple" },
          { id: 3, color1: "Red", color2: "Yellow", result: "Orange" },
          { id: 4, color1: "White", color2: "Red", result: "Pink" }
        ]
      }
    },
    {
      id: 5,
      title: "Story Builder",
      description: "Create your own story by arranging pictures in sequence",
      image: "https://placehold.co/300x200/9333EA/FFFFFF?text=Story+Builder",
      category: "Story Time",
      difficulty: "Medium",
      time: "15 min",
      color: "bg-lms-purple",
      gameContent: {
        type: "sequence",
        scenes: [
          { id: 1, description: "1. Once upon a time..." },
          { id: 2, description: "2. The character found a magical item..." },
          { id: 3, description: "3. An obstacle appeared..." },
          { id: 4, description: "4. Friends helped solve the problem..." },
          { id: 5, description: "5. Everyone lived happily ever after..." }
        ]
      }
    },
    {
      id: 6,
      title: "Shape Sorter",
      description: "Sort different shapes and learn their names",
      image: "https://placehold.co/300x200/F87171/FFFFFF?text=Shape+Sorter",
      category: "Maths",
      difficulty: "Easy",
      time: "6 min",
      color: "bg-lms-red",
      gameContent: {
        type: "drag",
        shapes: [
          { id: 1, name: "Circle", box: "Round" },
          { id: 2, name: "Square", box: "Four equal sides" },
          { id: 3, name: "Triangle", box: "Three sides" },
          { id: 4, name: "Rectangle", box: "Four sides, two long and two short" }
        ]
      }
    }
  ];

  const popularGames = games.slice(0, 3);
  
  // Memory Game Component
  const MemoryGame = ({ cards }: { cards: any[] }) => {
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [shuffledCards, setShuffledCards] = useState(() => [...cards].sort(() => Math.random() - 0.5));
    
    const handleCardClick = (id: number, value: string, match: string) => {
      if (flipped.length === 0) {
        setFlipped([id]);
      } else if (flipped.length === 1) {
        const firstCard = shuffledCards.find(card => card.id === flipped[0]);
        
        if (firstCard && ((firstCard.value === match && firstCard.match === value) || 
           (firstCard.match === value && firstCard.value === match))) {
          setMatched([...matched, value, match]);
        }
        
        setFlipped([...flipped, id]);
        
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    };
    
    const resetGame = () => {
      setFlipped([]);
      setMatched([]);
      setShuffledCards([...cards].sort(() => Math.random() - 0.5));
    };
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Memory Game</h3>
          <Button onClick={resetGame} variant="outline">Reset Game</Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {shuffledCards.map(card => (
            <div 
              key={card.id}
              className={`h-24 flex items-center justify-center rounded-lg text-lg font-bold cursor-pointer transition-all transform hover:scale-105 
                ${flipped.includes(card.id) || matched.includes(card.value) ? 
                  "bg-primary text-white" : "bg-secondary"}`}
              onClick={() => {
                if (!flipped.includes(card.id) && !matched.includes(card.value)) {
                  handleCardClick(card.id, card.value, card.match);
                }
              }}
            >
              {flipped.includes(card.id) || matched.includes(card.value) ? card.value : "?"}
            </div>
          ))}
        </div>
        
        {matched.length === shuffledCards.length && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-700">You Win! 🎉</h3>
            <p className="mb-4">You've matched all the cards!</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    );
  };
  
  // Counting Game Component
  const CountingGame = ({ questions }: { questions: any[] }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    const handleAnswer = () => {
      const correct = parseInt(answer) === questions[currentQuestion].answer;
      setIsCorrect(correct);
      setShowFeedback(true);
      
      if (correct) {
        setScore(score + 1);
      }
      
      setTimeout(() => {
        setShowFeedback(false);
        setAnswer("");
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 1500);
    };
    
    const resetGame = () => {
      setCurrentQuestion(0);
      setAnswer("");
      setScore(0);
      setShowFeedback(false);
    };
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Counting Game</h3>
          <div>Score: {score}/{questions.length}</div>
        </div>
        
        {currentQuestion < questions.length ? (
          <div className="text-center">
            <div className="text-6xl mb-6">{questions[currentQuestion].image}</div>
            <p className="mb-4">How many stars do you see?</p>
            
            <div className="flex max-w-xs mx-auto">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
                min="1"
                max="10"
              />
              <Button 
                onClick={handleAnswer}
                className="rounded-l-none"
                disabled={!answer}
              >
                Submit
              </Button>
            </div>
            
            {showFeedback && (
              <div className={`mt-4 p-2 rounded ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {isCorrect ? "Correct! 🎉" : `Oops! The answer is ${questions[currentQuestion].answer}`}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-bold text-green-700">Game Complete! 🎉</h3>
            <p className="mb-4">Your final score: {score}/{questions.length}</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    );
  };
  
  // Matching Game Component
  const MatchingGame = ({ pairs }: { pairs: any[] }) => {
    const [leftSide, setLeftSide] = useState(() => 
      [...pairs].sort(() => Math.random() - 0.5).map(p => p.value)
    );
    const [rightSide, setRightSide] = useState(() => 
      [...pairs].sort(() => Math.random() - 0.5).map(p => p.match)
    );
    const [selected, setSelected] = useState<{left: number | null, right: number | null}>({
      left: null, right: null
    });
    const [matched, setMatched] = useState<number[]>([]);
    
    const checkMatch = () => {
      if (selected.left !== null && selected.right !== null) {
        const leftValue = leftSide[selected.left];
        const rightValue = rightSide[selected.right];
        
        const matchFound = pairs.some(p => 
          (p.value === leftValue && p.match === rightValue) ||
          (p.match === leftValue && p.value === rightValue)
        );
        
        if (matchFound) {
          setMatched([...matched, selected.left, selected.right]);
        }
        
        setTimeout(() => {
          setSelected({left: null, right: null});
        }, 1000);
      }
    };
    
    React.useEffect(() => {
      checkMatch();
    }, [selected.left, selected.right]);
    
    const resetGame = () => {
      setLeftSide([...pairs].sort(() => Math.random() - 0.5).map(p => p.value));
      setRightSide([...pairs].sort(() => Math.random() - 0.5).map(p => p.match));
      setSelected({left: null, right: null});
      setMatched([]);
    };
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Matching Game</h3>
          <Button onClick={resetGame} variant="outline">Reset Game</Button>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            {leftSide.map((item, index) => (
              <div 
                key={`left-${index}`}
                className={`p-4 rounded-lg text-center cursor-pointer transition-all
                  ${matched.includes(index) ? "bg-green-100 text-green-700" : 
                    selected.left === index ? "bg-primary text-white" : "bg-secondary hover:bg-secondary/80"}`}
                onClick={() => {
                  if (!matched.includes(index)) {
                    setSelected({...selected, left: index});
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {rightSide.map((item, index) => (
              <div 
                key={`right-${index}`}
                className={`p-4 rounded-lg text-center cursor-pointer transition-all
                  ${matched.includes(index) ? "bg-green-100 text-green-700" : 
                    selected.right === index ? "bg-primary text-white" : "bg-secondary hover:bg-secondary/80"}`}
                onClick={() => {
                  if (!matched.includes(index)) {
                    setSelected({...selected, right: index});
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {matched.length === leftSide.length * 2 && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-700">You Win! 🎉</h3>
            <p className="mb-4">You've matched all pairs correctly!</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    );
  };
  
  // Color Mixer Game Component
  const ColorMixerGame = ({ combinations }: { combinations: any[] }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);
    const [correct, setCorrect] = useState(0);
    
    const colors = ["Red", "Blue", "Yellow", "White", "Black"];
    
    const handleColorSelect = (color: string) => {
      if (selectedColors.length < 2) {
        setSelectedColors([...selectedColors, color]);
      }
    };
    
    const mixColors = () => {
      if (selectedColors.length === 2) {
        const currentCombination = combinations[currentLevel];
        const isCorrect = (
          (selectedColors.includes(currentCombination.color1) && 
           selectedColors.includes(currentCombination.color2))
        );
        
        setResult(currentCombination.result);
        
        if (isCorrect) {
          setCorrect(prev => prev + 1);
        }
        
        setTimeout(() => {
          if (currentLevel < combinations.length - 1) {
            setCurrentLevel(currentLevel + 1);
          }
          setSelectedColors([]);
          setResult(null);
        }, 2000);
      }
    };
    
    React.useEffect(() => {
      if (selectedColors.length === 2) {
        mixColors();
      }
    }, [selectedColors]);
    
    const resetGame = () => {
      setCurrentLevel(0);
      setSelectedColors([]);
      setResult(null);
      setCorrect(0);
    };
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Color Mixer</h3>
          <div>Score: {correct}/{combinations.length}</div>
        </div>
        
        {currentLevel < combinations.length ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg mb-2">Mix two colors to make:</p>
              <h4 className="text-3xl font-bold">{combinations[currentLevel].result}</h4>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {colors.map(color => (
                <button
                  key={color}
                  className={`w-16 h-16 rounded-full transition-transform ${
                    selectedColors.includes(color) ? "scale-90 opacity-50" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                    color: ['White', 'Yellow'].includes(color) ? 'black' : 'white'
                  }}
                  onClick={() => handleColorSelect(color)}
                  disabled={selectedColors.includes(color) || selectedColors.length >= 2}
                >
                  {color}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <p className="mb-2">Selected:</p>
              <div className="flex justify-center gap-4 mb-4">
                {selectedColors.map((color, i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      color: ['White', 'Yellow'].includes(color) ? 'black' : 'white'
                    }}
                  >
                    {color}
                  </div>
                ))}
                {selectedColors.length < 2 && Array(2 - selectedColors.length).fill(0).map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gray-200"></div>
                ))}
              </div>
              
              {result && (
                <div className="p-4 rounded-lg text-center animation-fade-in">
                  <p className="mb-2">Result:</p>
                  <div 
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{
                      backgroundColor: result.toLowerCase(),
                      color: ['White', 'Yellow', 'Pink'].includes(result) ? 'black' : 'white'
                    }}
                  >
                    {result}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-bold text-green-700">Game Complete! 🎉</h3>
            <p className="mb-4">You got {correct} out of {combinations.length} correct!</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    );
  };
  
  // Sequence Game Component
  const SequenceGame = ({ scenes }: { scenes: any[] }) => {
    const [storyOrder, setStoryOrder] = useState(() => 
      [...scenes].sort(() => Math.random() - 0.5)
    );
    const [isCorrect, setIsCorrect] = useState(false);
    
    const moveScene = (index: number, direction: 'up' | 'down') => {
      const newOrder = [...storyOrder];
      if (direction === 'up' && index > 0) {
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      } else if (direction === 'down' && index < newOrder.length - 1) {
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      }
      setStoryOrder(newOrder);
    };
    
    const checkOrder = () => {
      const correctOrder = storyOrder.every((scene, index) => {
        return scene.description.startsWith(`${index + 1}.`);
      });
      
      setIsCorrect(correctOrder);
    };
    
    const resetGame = () => {
      setStoryOrder([...scenes].sort(() => Math.random() - 0.5));
      setIsCorrect(false);
    };
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Story Builder</h3>
          <div className="space-x-2">
            <Button onClick={checkOrder} variant="outline">Check Story</Button>
            <Button onClick={resetGame} variant="outline">Reset</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {storyOrder.map((scene, index) => (
            <div key={scene.id} className="bg-secondary p-4 rounded-lg flex items-center">
              <div className="flex-1">
                <p>{scene.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveScene(index, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveScene(index, 'down')}
                  disabled={index === storyOrder.length - 1}
                >
                  ↓
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {isCorrect && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-700">Perfect! 🎉</h3>
            <p className="mb-4">You ordered the story correctly!</p>
            <Button onClick={resetGame}>Create a New Story</Button>
          </div>
        )}
      </div>
    );
  };
  
  // Drag and Drop Game Component
  const DragDropGame = ({ shapes }: { shapes: any[] }) => {
    const [sortedShapes, setSortedShapes] = useState<{[key: string]: any[]}>({});
    const [remainingShapes, setRemainingShapes] = useState(() => [...shapes].sort(() => Math.random() - 0.5));
    
    const handleDrop = (shape: any, box: string) => {
      // Add shape to the correct box
      setSortedShapes({
        ...sortedShapes,
        [box]: [...(sortedShapes[box] || []), shape]
      });
      
      // Remove from remaining shapes
      setRemainingShapes(remainingShapes.filter(s => s.id !== shape.id));
    };
    
    const resetGame = () => {
      setSortedShapes({});
      setRemainingShapes([...shapes].sort(() => Math.random() - 0.5));
    };
    
    const boxes = [...new Set(shapes.map(s => s.box))];
    
    return (
      <div className="p-4">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Shape Sorter</h3>
          <Button onClick={resetGame} variant="outline">Reset</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {boxes.map(box => (
            <div key={box} className="border-2 border-dashed p-4 rounded-lg min-h-32">
              <h4 className="text-center mb-4 font-bold">{box}</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {(sortedShapes[box] || []).map(shape => (
                  <div key={shape.id} className="bg-primary text-white px-3 py-1 rounded-full">
                    {shape.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="mb-4 font-bold text-center">Drag shapes to their correct boxes</h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {remainingShapes.map(shape => (
              <div 
                key={shape.id} 
                className="bg-secondary px-3 py-1 rounded-full cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleDrop(shape, shape.box)}
              >
                {shape.name}
              </div>
            ))}
          </div>
        </div>
        
        {remainingShapes.length === 0 && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-700">Great Job! 🎉</h3>
            <p className="mb-4">You've sorted all the shapes correctly!</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    );
  };

  // Render game content based on type
  const renderGameContent = () => {
    if (!activeGame) return null;
    
    switch (activeGame.gameContent.type) {
      case 'memory':
        return <MemoryGame cards={activeGame.gameContent.cards} />;
      case 'counting':
        return <CountingGame questions={activeGame.gameContent.questions} />;
      case 'match':
        return <MatchingGame pairs={activeGame.gameContent.pairs} />;
      case 'colorMixer':
        return <ColorMixerGame combinations={activeGame.gameContent.combinations} />;
      case 'sequence':
        return <SequenceGame scenes={activeGame.gameContent.scenes} />;
      case 'drag':
        return <DragDropGame shapes={activeGame.gameContent.shapes} />;
      default:
        return <p>Game type not supported</p>;
    }
  };

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
                    onClick={() => setActiveGame(game)}
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
                onClick={() => setActiveGame(game)}
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
      
      {/* Game Dialog */}
      <Dialog open={!!activeGame} onOpenChange={(open) => !open && setActiveGame(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bubbly">{activeGame?.title}</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          {renderGameContent()}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentGames;
