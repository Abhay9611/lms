
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, School, Sparkles, Star, BookText } from 'lucide-react';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationModal from '@/components/auth/RegistrationModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleLogin = async (role: UserRole) => {
    await login('demo@example.com', 'password', role);
    navigate('/');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRegistration(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="cloud top-[5%] left-[10%] opacity-30">
          <div className="h-24 w-36 bg-white rounded-full"></div>
        </div>
        <div className="cloud top-[15%] right-[15%] opacity-30">
          <div className="h-16 w-24 bg-white rounded-full"></div>
        </div>
        <div className="star top-[25%] right-[25%] opacity-50">
          <Star className="h-8 w-8 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        <div className="star top-[40%] left-[20%] opacity-50">
          <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        <div className="bubble h-12 w-12 top-[60%] right-[30%] opacity-30"></div>
        <div className="bubble h-8 w-8 top-[70%] right-[40%] opacity-30"></div>
        <div className="bubble h-16 w-16 bottom-[10%] right-[20%] opacity-30"></div>
      </div>
      
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <BookOpen className="h-10 w-10 text-primary" />
          <span className="ml-2 text-2xl font-bubbly font-bold text-primary">BookWorm Academy</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/login')}
          className="rounded-full px-6 text-foreground"
        >
          Sign In
        </Button>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bubbly font-bold text-primary mb-6 animate-bounce">
          <span className="text-lms-pink">Learn.</span> <span className="text-lms-green">Play.</span> <span className="text-lms-blue">Grow.</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-4 max-w-3xl font-round">
          BookWorm Academy makes learning fun for preschoolers with interactive lessons, 
          rhymes, stories, and games that inspire curiosity and creativity.
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl font-round">
          We are a premier educational book distribution company dedicated to bringing high-quality learning materials
          to students across all grade levels. Our carefully curated content helps teachers create engaging lessons
          and enables students to explore subjects through interactive materials.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
          {[
            {
              title: "For Students",
              icon: <GraduationCap className="h-12 w-12 text-lms-blue" />,
              description: "Explore fun lessons, rhymes, stories, and games",
              color: "border-lms-blue/50 bg-lms-blue/5",
              buttonColor: "bg-lms-blue hover:bg-lms-blue/80",
              role: UserRole.STUDENT
            },
            {
              title: "For Teachers",
              icon: <BookText className="h-12 w-12 text-lms-green" />,
              description: "Access lesson plans, activities, and classroom resources",
              color: "border-lms-green/50 bg-lms-green/5",
              buttonColor: "bg-lms-green hover:bg-lms-green/80",
              role: UserRole.TEACHER
            },
            {
              title: "For Admins",
              icon: <School className="h-12 w-12 text-lms-pink" />,
              description: "Manage schools, users, and educational content",
              color: "border-lms-pink/50 bg-lms-pink/5",
              buttonColor: "bg-lms-pink hover:bg-lms-pink/80",
              role: UserRole.ADMIN
            }
          ].map((item, index) => (
            <Card key={index} className={`border-4 rounded-3xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${item.color}`}>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bubbly font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-center mb-4">{item.description}</p>
                <div className="flex flex-col w-full space-y-2">
                  <Button 
                    className={`w-full rounded-xl ${item.buttonColor}`}
                    onClick={() => handleRoleSelect(item.role)}
                  >
                    Sign Up
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => handleRoleLogin(item.role)}
                  >
                    Demo Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bubbly font-bold text-center mb-12">
            Why Parents & Educators Love Us
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-lms-yellow" />,
                title: "Engaging Learning",
                description: "Colorful animations and interactive activities keep children excited about learning"
              },
              {
                icon: <BookText className="h-8 w-8 text-lms-blue" />,
                title: "Curriculum Aligned",
                description: "Content follows educational standards for preschool and early primary grades"
              },
              {
                icon: <Users className="h-8 w-8 text-lms-green" />,
                title: "Parental Controls",
                description: "Set screen time limits and monitor your child's learning progress"
              },
              {
                icon: <Star className="h-8 w-8 text-lms-pink" />,
                title: "Achievement System",
                description: "Rewards and badges motivate children to continue their learning journey"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md border-2 border-muted">
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bubbly font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-primary/20 to-secondary/20">
        <h2 className="text-3xl font-bubbly font-bold mb-4">Ready to Start the Learning Adventure?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of happy students, teachers, and schools using BookWorm Academy today.
        </p>
        <Button 
          size="lg" 
          className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/80"
          onClick={() => navigate('/login')}
        >
          Get Started For Free
        </Button>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-sidebar text-sidebar-foreground">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-sidebar-primary" />
              <span className="ml-2 font-bold text-lg font-bubbly">BookWorm Academy</span>
            </div>
            <p className="text-sm opacity-80 max-w-xs">
              Making learning fun and accessible for preschoolers around the world.
            </p>
          </div>
          
          <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bubbly font-bold mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">For Students</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">For Teachers</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">For Admins</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">For Parents</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bubbly font-bold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">Learning Materials</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">Activity Guides</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">Help Center</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bubbly font-bold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-sidebar-foreground/80 hover:text-sidebar-foreground">Terms of Service</Button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-sidebar-border text-center">
          <p className="text-sm opacity-60">© 2025 BookWorm Academy. All rights reserved.</p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegistration && selectedRole && (
        <RegistrationModal 
          isOpen={showRegistration} 
          onClose={() => setShowRegistration(false)}
          role={selectedRole}
        />
      )}
    </div>
  );
};

export default LandingPage;
