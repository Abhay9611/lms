
import React from 'react';
import { Star, Cloud, Sun, Moon, Book, Pencil, Rocket, Heart } from 'lucide-react';

interface AnimatedCharactersProps {
  variant?: 'space' | 'school' | 'minimal' | 'forest';
  density?: 'low' | 'medium' | 'high';
}

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({ 
  variant = 'school',
  density = 'medium'
}) => {
  // Determine number of elements based on density
  const getElementCount = () => {
    switch (density) {
      case 'low': return 5;
      case 'medium': return 10;
      case 'high': return 15;
      default: return 10;
    }
  };
  
  const count = getElementCount();
  
  // Create random positions
  const createRandomPositions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      size: Math.floor(Math.random() * 10) + 10, // 10px to 20px
      delay: Math.random() * 2, // 0 to 2s delay
      duration: Math.random() * 3 + 2, // 2 to 5s duration
    }));
  };
  
  const positions = createRandomPositions(count);
  
  // Space theme elements
  const renderSpaceElements = () => {
    return positions.map(pos => {
      const element = Math.floor(Math.random() * 3);
      return (
        <div 
          key={pos.id}
          className="animated-character"
          style={{ 
            top: pos.top, 
            left: pos.left,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            zIndex: -1 // Keep animated elements behind content
          }}
        >
          {element === 0 && (
            <Star className={`h-${pos.size} w-${pos.size} text-lms-yellow fill-lms-yellow animate-spin-slow`} />
          )}
          {element === 1 && (
            <Moon className={`h-${pos.size} w-${pos.size} text-blue-300 fill-blue-200 animate-float`} />
          )}
          {element === 2 && (
            <Rocket className={`h-${pos.size} w-${pos.size} text-lms-red fill-lms-red animate-float`} />
          )}
        </div>
      );
    });
  };
  
  // School theme elements
  const renderSchoolElements = () => {
    return positions.map(pos => {
      const element = Math.floor(Math.random() * 3);
      return (
        <div 
          key={pos.id}
          className="animated-character"
          style={{ 
            top: pos.top, 
            left: pos.left,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            zIndex: -1 // Keep animated elements behind content
          }}
        >
          {element === 0 && (
            <Book className={`h-${pos.size} w-${pos.size} text-lms-blue fill-lms-blue/30 animate-float`} />
          )}
          {element === 1 && (
            <Pencil className={`h-${pos.size} w-${pos.size} text-lms-yellow fill-lms-yellow/30 animate-wiggle`} />
          )}
          {element === 2 && (
            <div className={`h-${pos.size} w-${pos.size} rounded-full bg-lms-green/50 animate-bounce`}></div>
          )}
        </div>
      );
    });
  };
  
  // Minimal theme - just some simple shapes
  const renderMinimalElements = () => {
    return positions.map(pos => {
      const shape = Math.floor(Math.random() * 3);
      const colors = ['bg-lms-pink/30', 'bg-lms-yellow/30', 'bg-lms-blue/30', 'bg-lms-green/30', 'bg-lms-purple/30'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <div 
          key={pos.id}
          className="animated-character"
          style={{ 
            top: pos.top, 
            left: pos.left,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            zIndex: -1 // Keep animated elements behind content
          }}
        >
          {shape === 0 && (
            <div className={`h-${pos.size} w-${pos.size} rounded-full ${randomColor} animate-float`}></div>
          )}
          {shape === 1 && (
            <div className={`h-${pos.size} w-${pos.size} rotate-45 ${randomColor} animate-wiggle`}></div>
          )}
          {shape === 2 && (
            <Star className={`h-${pos.size} w-${pos.size} text-lms-yellow animate-spin-slow`} />
          )}
        </div>
      );
    });
  };
  
  // Forest theme elements
  const renderForestElements = () => {
    return positions.map(pos => {
      const element = Math.floor(Math.random() * 3);
      return (
        <div 
          key={pos.id}
          className="animated-character"
          style={{ 
            top: pos.top, 
            left: pos.left,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            zIndex: -1 // Keep animated elements behind content
          }}
        >
          {element === 0 && (
            <Cloud className={`h-${pos.size} w-${pos.size} text-white/70 animate-float`} />
          )}
          {element === 1 && (
            <Heart className={`h-${pos.size} w-${pos.size} text-lms-pink fill-lms-pink/30 animate-float`} />
          )}
          {element === 2 && (
            <div className={`h-${pos.size} w-${pos.size} rounded-full bg-lms-green/40 animate-bounce`}></div>
          )}
        </div>
      );
    });
  };
  
  // Select the right renderer based on variant
  const renderElements = () => {
    switch (variant) {
      case 'space': return renderSpaceElements();
      case 'school': return renderSchoolElements();
      case 'minimal': return renderMinimalElements();
      case 'forest': return renderForestElements();
      default: return renderSchoolElements();
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {renderElements()}
    </div>
  );
};

export default AnimatedCharacters;
