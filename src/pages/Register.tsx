import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onLoginClick: () => void;
  onRegister: () => void;
}

export default function Register({ onLoginClick, onRegister }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Kayıt Ol</h1>
          <p className="text-gray-200">Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-200 text-sm font-medium">Kullanıcı Adı</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Kullanıcı adınız"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-200 text-sm font-medium">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-200 text-sm font-medium">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-200 text-sm font-medium">Şifre Tekrar</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
          >
            Kayıt Ol
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onLoginClick}
            className="text-gray-200 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Giriş sayfasına dön
          </button>
        </div>
      </div>
    </div>
  );
}