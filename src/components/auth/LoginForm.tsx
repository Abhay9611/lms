
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { BookOpen, User, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      
      // Redirect based on role
      switch (role) {
        case UserRole.ADMIN:
          navigate('/admin');
          break;
        case UserRole.TEACHER:
          navigate('/teacher/grade-selection');
          break;
        case UserRole.STUDENT:
          navigate('/student');
          break;
        case UserRole.PARENT:
          navigate('/parent');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const roleOptions = [
    { value: UserRole.ADMIN, label: "Administrator", icon: <CheckCircle className="h-4 w-4 text-lms-pink" /> },
    { value: UserRole.TEACHER, label: "Teacher", icon: <CheckCircle className="h-4 w-4 text-lms-green" /> },
    { value: UserRole.STUDENT, label: "Student", icon: <CheckCircle className="h-4 w-4 text-lms-blue" /> },
    { value: UserRole.PARENT, label: "Parent", icon: <CheckCircle className="h-4 w-4 text-lms-yellow" /> },
  ];

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90 shadow-xl border-none">
      <CardHeader className="space-y-2">
        <motion.div 
          className="flex items-center justify-center mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="h-16 w-16 text-primary" />
        </motion.div>
        <CardTitle className="text-2xl font-bold text-center font-bubbly">Welcome to Aspiring Gems</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your learning adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label htmlFor="email" className="flex items-center text-sm font-medium">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-muted bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="password" className="flex items-center text-sm font-medium">
              <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-muted bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="role" className="flex items-center text-sm font-medium">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              Login as
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <SelectTrigger id="role" className="bg-white/80 rounded-xl border-muted focus:border-primary focus:ring-1 focus:ring-primary">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl">
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="flex items-center focus:bg-primary/10">
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          
          {error && (
            <motion.p 
              className="text-sm text-destructive p-2 rounded-lg bg-destructive/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </motion.div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-muted-foreground">
          <span>For demo purposes, any email and password will work</span>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-2 h-2 rounded-full bg-lms-pink"
          />
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-2 h-2 rounded-full bg-lms-blue"
          />
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-2 h-2 rounded-full bg-lms-green"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
