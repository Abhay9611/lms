
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

// Types for quiz questions
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  subjectColor: string;
}

const Quiz = ({ title, description, questions, onComplete, subjectColor }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an answer",
        description: "You need to choose an option before checking your answer.",
        variant: "destructive",
      });
      return;
    }

    setIsAnswered(true);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      // Trigger confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = "";
    let resultIcon = null;
    
    if (percentage >= 80) {
      resultMessage = "Excellent job! You're a star!";
      resultIcon = <CheckCircle className="h-16 w-16 text-lms-green" />;
    } else if (percentage >= 60) {
      resultMessage = "Good work! Keep practicing!";
      resultIcon = <CheckCircle className="h-16 w-16 text-lms-yellow" />;
    } else {
      resultMessage = "Let's try again! You can do it!";
      resultIcon = <AlertCircle className="h-16 w-16 text-lms-pink" />;
    }

    return (
      <Card className="border-4 border-dashed rounded-3xl overflow-hidden shadow-lg">
        <CardHeader className={`${subjectColor} bg-opacity-20 text-center`}>
          <CardTitle className="text-2xl font-bubbly">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="mb-6 mt-2">{resultIcon}</div>
          <h3 className="text-2xl font-bubbly mb-4">{resultMessage}</h3>
          
          <div className="w-full max-w-xs bg-lms-purple/10 rounded-full h-6 mb-6">
            <div 
              className="bg-lms-purple h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ width: `${percentage}%` }}
            >
              {percentage}%
            </div>
          </div>
          
          <p className="text-lg font-round mb-6">
            You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span> questions
          </p>
          
          <Button 
            onClick={restartQuiz} 
            className={`${subjectColor} rounded-full px-8 py-2 text-white font-medium`}
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="border-4 border-dashed rounded-3xl overflow-hidden shadow-lg">
      <CardHeader className={`${subjectColor} bg-opacity-20`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bubbly">{title}</CardTitle>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-4 font-round">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${selectedOption === option ? 'border-primary shadow-md' : 'border-dashed border-muted-foreground/30'}
                    ${isAnswered && option === question.correctAnswer ? 'bg-lms-green/10 border-lms-green' : ''}
                    ${isAnswered && option === selectedOption && option !== question.correctAnswer 
                      ? 'bg-lms-pink/10 border-lms-pink' : ''}
                  `}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
                      {isAnswered && option === question.correctAnswer ? (
                        <CheckCircle className="h-4 w-4 text-lms-green" />
                      ) : isAnswered && option === selectedOption ? (
                        <XCircle className="h-4 w-4 text-lms-pink" />
                      ) : (
                        <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="font-round">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showExplanation && question.explanation && (
            <div className="mt-4 p-4 rounded-lg bg-lms-blue/10 border border-lms-blue/30">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-lms-blue mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold">Explanation:</p>
                  <p className="text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-border flex justify-between">
        {!isAnswered ? (
          <Button 
            onClick={checkAnswer} 
            disabled={!selectedOption}
            className={`${subjectColor} w-full`}
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={nextQuestion} 
            className={`${subjectColor} w-full`}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
