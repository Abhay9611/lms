import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, School, Sparkles, Star, BookText, Award, Trophy, Heart, Check, Globe, Lightbulb, Building, MessageSquare } from 'lucide-react';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationModal from '@/components/auth/RegistrationModal';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
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
        <img src="/logo.png" alt="Aspiring Gems Logo" className="h-24 w-64 md:h-24 md:w-64 object-contain" />
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bubbly font-bold text-primary mb-6">
            <span className="text-lms-pink">Learn.</span> <span className="text-lms-green">Play.</span> <span className="text-lms-blue">Grow.</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-4 max-w-3xl font-round">
            Aspiring Gems makes learning fun for preschoolers with interactive lessons, 
            rhymes, stories, and games that inspire curiosity and creativity.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl font-round">
            We are a premier educational book distribution company dedicated to bringing high-quality learning materials
            to students across all grade levels. Our carefully curated content helps teachers create engaging lessons
            and enables students to explore subjects through interactive materials.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            <motion.div key={index} variants={itemVariants}>
              <Card className={`border-4 rounded-3xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${item.color}`}>
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
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4 bg-primary/5 backdrop-blur-sm" id="about">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bubbly font-bold mb-4">About Aspiring Gems</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Empowering young minds through innovative and engaging educational resources
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bubbly font-bold mb-4">Our Mission</h3>
              <p className="mb-4 text-muted-foreground">
                At Aspiring Gems, we believe every child deserves access to quality education that sparks 
                curiosity, fosters creativity, and builds confidence. Our mission is to create educational 
                resources that make learning a joyful experience for children worldwide.
              </p>
              <p className="mb-6 text-muted-foreground">
                Founded in 2020 by a team of passionate educators and child development experts, 
                we've grown to serve over 500 schools and countless families with our carefully 
                crafted learning materials and digital platform.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-lms-green mr-2" />
                  <span>Child-centered approach</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-lms-green mr-2" />
                  <span>Research-backed methods</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-lms-green mr-2" />
                  <span>Inclusive materials</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-lms-green mr-2" />
                  <span>Continuous innovation</span>
                </div>
              </div>
              <Button className="rounded-xl">Learn More About Us</Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="border-4 border-lms-pink/30 rounded-3xl p-5 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Trophy className="h-12 w-12 text-lms-pink mx-auto mb-4" />
                  <h4 className="font-bubbly font-bold">10+</h4>
                  <p className="text-sm text-muted-foreground">Industry Awards</p>
                </motion.div>
              </Card>
              
              <Card className="border-4 border-lms-blue/30 rounded-3xl p-5 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Building className="h-12 w-12 text-lms-blue mx-auto mb-4" />
                  <h4 className="font-bubbly font-bold">500+</h4>
                  <p className="text-sm text-muted-foreground">Partner Schools</p>
                </motion.div>
              </Card>
              
              <Card className="border-4 border-lms-green/30 rounded-3xl p-5 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <BookOpen className="h-12 w-12 text-lms-green mx-auto mb-4" />
                  <h4 className="font-bubbly font-bold">1000+</h4>
                  <p className="text-sm text-muted-foreground">Learning Resources</p>
                </motion.div>
              </Card>
              
              <Card className="border-4 border-lms-yellow/30 rounded-3xl p-5 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Heart className="h-12 w-12 text-lms-yellow mx-auto mb-4" />
                  <h4 className="font-bubbly font-bold">100K+</h4>
                  <p className="text-sm text-muted-foreground">Happy Students</p>
                </motion.div>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="bg-lms-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-lms-pink" />
              </div>
              <h3 className="text-xl font-bubbly font-bold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To revolutionize early childhood education through playful, engaging, and inclusive learning experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-lms-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-lms-blue" />
              </div>
              <h3 className="text-xl font-bubbly font-bold mb-2">Our Reach</h3>
              <p className="text-muted-foreground">
                With presence in 15 countries, we're making quality education accessible to children worldwide.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-lms-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-lms-green" />
              </div>
              <h3 className="text-xl font-bubbly font-bold mb-2">Our Community</h3>
              <p className="text-muted-foreground">
                Join our community of educators, parents, and learning enthusiasts sharing best practices.
              </p>
            </div>
          </motion.div>
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
      <motion.section 
        className="py-16 px-4 text-center bg-gradient-to-r from-primary/20 to-secondary/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bubbly font-bold mb-4">Ready to Start the Learning Adventure?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of happy students, teachers, and schools using Aspiring Gems today.
        </p>
        <Button 
          size="lg" 
          className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/80"
          onClick={() => navigate('/login')}
        >
          Get Started For Free
        </Button>
      </motion.section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bubbly font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Aspiring Gems has transformed how I teach my preschool class. The children are more engaged and excited about learning than ever before!",
                name: "Sarah Johnson",
                role: "Preschool Teacher",
                color: "border-lms-blue"
              },
              {
                quote: "As a parent, I love how the platform allows me to be involved in my child's education. The progress tracking features are invaluable.",
                name: "Michael Chen",
                role: "Parent",
                color: "border-lms-green"
              },
              {
                quote: "Implementing Aspiring Gems across our school has elevated our early education program. The curriculum alignment makes planning so much easier.",
                name: "Dr. Lisa Patel",
                role: "School Principal",
                color: "border-lms-pink"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`border-4 ${testimonial.color} rounded-3xl shadow-lg p-6`}>
                  <Star className="h-8 w-8 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
                  <p className="mt-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-sidebar text-sidebar-foreground">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-sidebar-primary" />
              <span className="ml-2 font-bold text-lg font-bubbly">Aspiring Gems</span>
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
          <p className="text-sm opacity-60">© 2025 Aspiring Gems. All rights reserved.</p>
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
