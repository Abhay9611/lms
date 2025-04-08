
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 p-4">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
