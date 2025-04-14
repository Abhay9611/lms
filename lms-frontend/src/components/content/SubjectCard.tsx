
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Subject } from '@/types';
import { useNavigate } from 'react-router-dom';

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="h-32 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${subject.imageUrl || '/placeholder.svg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{subject.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-2">
          {subject.description}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          className="w-full"
          onClick={() => navigate(`/student/subjects/${subject.id}`)}
        >
          Explore Books
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
