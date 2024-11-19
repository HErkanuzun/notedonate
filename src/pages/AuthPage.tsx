import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="gaming-collage"></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/40 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full max-w-md">
          {isLogin ? (
            <LoginForm 
              onLogin={onLogin}
              onRegisterClick={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm 
              onRegister={() => setIsLogin(true)}
              onLoginClick={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}