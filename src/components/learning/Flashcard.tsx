
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  image?: string;
}

interface FlashcardProps {
  cards: FlashcardItem[];
  subjectColor: string;
}

const Flashcard = ({ cards, subjectColor }: FlashcardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleFlip = () => {
    setAnimating(true);
    setFlipped(!flipped);
    setTimeout(() => setAnimating(false), 300);
  };

  const nextCard = () => {
    if (flipped) setFlipped(false);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      setAnimating(false);
    }, 300);
  };

  const prevCard = () => {
    if (flipped) setFlipped(false);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
      setAnimating(false);
    }, 300);
  };

  if (!cards.length) {
    return <div>No flashcards available.</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bubbly">Flashcards</h3>
        <p className="text-sm font-round">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <div className="perspective-1000 h-64 sm:h-80">
        <div
          className={`relative w-full h-full rounded-3xl transition-all duration-300 transform preserve-3d cursor-pointer
            ${flipped ? 'rotate-y-180' : ''} 
            ${animating ? 'scale-95' : 'scale-100'}`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <Card className={`absolute w-full h-full backface-hidden rounded-3xl border-4 border-dashed ${subjectColor} ${subjectColor.replace('bg-', 'border-')}`}>
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              {currentCard.image && (
                <div className="mb-4 w-24 h-24 rounded-full overflow-hidden">
                  <img src={currentCard.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="text-xl font-bubbly text-center">{currentCard.front}</h3>
              <div className="absolute bottom-2 right-2 text-xs opacity-50">Tap to flip</div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className={`absolute w-full h-full backface-hidden rounded-3xl border-4 border-dashed rotate-y-180 ${subjectColor} ${subjectColor.replace('bg-', 'border-')}`}>
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <p className="text-center font-round">{currentCard.back}</p>
              <div className="absolute bottom-2 right-2 text-xs opacity-50">Tap to flip</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={prevCard}
          disabled={cards.length <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleFlip}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={nextCard}
          disabled={cards.length <= 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;
