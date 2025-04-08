
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Star, Cloud, Sun, Moon } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/10 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Clouds */}
        <div className="cloud top-[10%] left-[10%]">
          <Cloud className="h-16 w-16 text-white" />
        </div>
        <div className="cloud top-[15%] right-[15%]">
          <Cloud className="h-12 w-12 text-white" />
        </div>
        <div className="cloud bottom-[20%] left-[5%]">
          <Cloud className="h-14 w-14 text-white" />
        </div>
        
        {/* Stars */}
        <div className="star top-[25%] right-[25%]">
          <Star className="h-8 w-8 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        <div className="star top-[40%] left-[20%]">
          <Star className="h-6 w-6 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        <div className="star bottom-[30%] right-[15%]">
          <Star className="h-10 w-10 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        
        {/* Sun */}
        <div className="animated-character top-[5%] right-[5%] animate-float">
          <Sun className="h-20 w-20 text-lms-yellow fill-lms-yellow" strokeWidth={1} />
        </div>
        
        {/* Moon */}
        <div className="animated-character bottom-[5%] left-[5%] animate-float">
          <Moon className="h-16 w-16 text-blue-300 fill-blue-200" strokeWidth={1} />
        </div>
        
        {/* Bubbles */}
        <div className="bubble h-12 w-12 top-[60%] right-[30%]"></div>
        <div className="bubble h-8 w-8 top-[70%] right-[40%]"></div>
        <div className="bubble h-16 w-16 bottom-[10%] right-[20%]"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bubbly font-bold text-primary mb-2 animate-bounce">BookWorm Academy</h1>
          <p className="text-lg text-foreground/80 font-round">Let's start our learning adventure!</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-secondary p-8 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
