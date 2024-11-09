import React from 'react';
import { Book, Moon, Sun, User, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

function Header({ isDark, setIsDark }: HeaderProps) {
  const { isLoggedIn, user, logout } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 backdrop-blur-xl transition-colors duration-300 ${
      isDark ? 'bg-gray-900/80' : 'bg-white/80'
    } border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Book className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">UniNotes</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/notes" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Notlar' : 'Notes'}
            </Link>
            <Link to="/exams" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Sınavlar' : 'Exams'}
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Hakkında' : 'About'}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDark ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <LanguageSelector isDark={isDark} />
            
            {isLoggedIn ? (
              <div className="relative group">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                </div>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                  <Link 
                    to="/profile"
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User size={16} />
                    {currentLanguage === 'TR' ? 'Profil' : 'Profile'}
                  </Link>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                  >
                    <LogOut size={16} />
                    {currentLanguage === 'TR' ? 'Çıkış Yap' : 'Logout'}
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                <User size={18} />
                {currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;