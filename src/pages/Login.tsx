import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Gamepad2 } from 'lucide-react';

interface LoginProps {
  onRegisterClick: () => void;
  onLogin: () => void;
}

export default function Login({ onRegisterClick, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <>
      <div className="gaming-collage"></div>
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md glass-effect-strong p-8 rounded-2xl cyberpunk-border">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl gaming-gradient flex items-center justify-center">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Game Hub</h1>
            <p className="text-accent-cyan">Your gaming journey starts here</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-purple w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-xl py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-purple w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input rounded-xl py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gaming-gradient text-white rounded-xl py-3 px-4 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 transition-all duration-200"
            >
              Start Gaming
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onRegisterClick}
              className="text-accent-cyan hover:text-accent-gold flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              New to Game Hub? Join now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}