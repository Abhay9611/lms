
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { GraduationCap, BookText, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

const RegistrationModal = ({ isOpen, onClose, role }: RegistrationModalProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);

  const grades = [
    'Pre-Nursery',
    'Nursery',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5'
  ];

  const getRoleIcon = () => {
    switch (role) {
      case UserRole.STUDENT:
        return <GraduationCap className="h-8 w-8 text-lms-blue" />;
      case UserRole.TEACHER:
        return <BookText className="h-8 w-8 text-lms-green" />;
      case UserRole.ADMIN:
        return <School className="h-8 w-8 text-lms-pink" />;
      default:
        return null;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case UserRole.STUDENT:
        return "bg-lms-blue";
      case UserRole.TEACHER:
        return "bg-lms-green";
      case UserRole.ADMIN:
        return "bg-lms-pink";
      default:
        return "bg-primary";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would call an API to register the user
      // For now, we just simulate with a timeout and use the demo login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Login the user
      await login(email || 'demo@example.com', password || 'password', role);
      
      toast({
        title: "Registration successful",
        description: "Welcome to BookWorm Academy!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-4 border-dashed">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {getRoleIcon()}
          </div>
          <DialogTitle className="text-2xl font-bubbly text-center">
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </DialogTitle>
          <DialogDescription className="text-center">
            Create your account to access personalized learning resources.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-round">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="rounded-xl"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-round">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-xl"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-round">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="rounded-xl"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grade" className="font-round">Grade Level</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {grades.map((g) => (
                  <SelectItem key={g} value={g} className="font-round">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className={`w-full rounded-xl ${getRoleColor()} font-bubbly text-white`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Create Account"}
            </Button>
          </DialogFooter>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-medium text-primary"
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              Sign In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
