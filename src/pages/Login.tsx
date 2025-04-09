
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Star, Cloud, Sun, Moon, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-primary/20 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        {/* Floating Clouds */}
        <motion.div 
          className="absolute top-[10%] left-[10%]"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: "easeInOut" 
          }}
        >
          <Cloud className="h-20 w-20 text-white/70" />
        </motion.div>
        
        <motion.div 
          className="absolute top-[15%] right-[15%]"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 26, 
            ease: "easeInOut" 
          }}
        >
          <Cloud className="h-16 w-16 text-white/60" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[20%] left-[5%]"
          animate={{ 
            x: [0, 35, 0], 
            y: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 22, 
            ease: "easeInOut" 
          }}
        >
          <Cloud className="h-24 w-24 text-white/50" />
        </motion.div>
        
        {/* Twinkling Stars */}
        <motion.div 
          className="absolute top-[25%] right-[25%]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
        >
          <Star className="h-8 w-8 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[40%] left-[20%]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[30%] right-[15%]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3.5, 
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Star className="h-10 w-10 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </motion.div>
        
        {/* Sun */}
        <motion.div 
          className="absolute top-[5%] right-[5%]"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8, 
            ease: "easeInOut" 
          }}
        >
          <Sun className="h-28 w-28 text-lms-yellow fill-lms-yellow/50" strokeWidth={1} />
        </motion.div>
        
        {/* Moon */}
        <motion.div 
          className="absolute bottom-[5%] left-[5%]"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10, 
            ease: "easeInOut" 
          }}
        >
          <Moon className="h-24 w-24 text-blue-300 fill-blue-200/70" strokeWidth={1} />
        </motion.div>
        
        {/* Floating Bubbles */}
        <motion.div 
          className="absolute h-12 w-12 top-[60%] right-[30%] rounded-full bg-primary/10"
          animate={{ 
            y: [0, -100],
            opacity: [0, 0.7, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute h-8 w-8 top-[70%] right-[40%] rounded-full bg-lms-pink/20"
          animate={{ 
            y: [0, -80],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12, 
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.div 
          className="absolute h-16 w-16 bottom-[10%] right-[20%] rounded-full bg-lms-blue/20"
          animate={{ 
            y: [0, -120],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18, 
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>
      
      <motion.div 
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center items-center mb-4"
          >
            <BookOpen className="h-16 w-16 text-primary" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bubbly font-bold text-primary mb-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Aspiring Gems
          </motion.h1>
          
          <motion.p 
            className="text-xl text-foreground/80 font-round"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Unlock your learning potential today!
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-primary/20 p-8 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
