
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from '@/types';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col h-full">
      <div className="w-full flex justify-center p-4 bg-muted/20">
        <img 
          src={book.coverImageUrl || '/placeholder.svg'} 
          alt={book.title}
          className="h-40 object-contain"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">By {book.author}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          className="w-full"
          onClick={() => navigate(`/student/books/${book.id}`)}
        >
          View Topics
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
