
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeCardProps {
  stats?: {
    label: string;
    value: string | number;
  }[];
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ stats }) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const getRoleSpecificMessage = () => {
    switch (user.role) {
      case 'admin':
        return 'Manage your schools, teachers, and content from your admin dashboard.';
      case 'teacher':
        return 'View your schedule, manage assignments, and track student progress.';
      case 'student':
        return 'Access your books, complete assignments, and track your learning progress.';
      case 'parent':
        return 'Monitor your child\'s progress and stay updated on their academic journey.';
      default:
        return 'Welcome to BookWorm Academy LMS.';
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {getGreeting()}, {user.name}!
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          {getRoleSpecificMessage()}
        </CardDescription>
      </CardHeader>
      {stats && (
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WelcomeCard;
