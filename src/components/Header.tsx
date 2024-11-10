import React from 'react';
import { Book, Moon, Sun, User, LogOut, FileText, GraduationCap, BookOpen, Calendar } from 'lucide-react';
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
            <Link to="/articles" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Makaleler' : 'Articles'}
            </Link>
            <Link to="/events" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Etkinlikler' : 'Events'}
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
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{user?.name}</span>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="py-2">
                    <Link 
                      to="/notes"
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <FileText size={16} className="text-blue-600" />
                      {currentLanguage === 'TR' ? 'Notlarım' : 'My Notes'}
                    </Link>
                    <Link 
                      to="/exams"
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <GraduationCap size={16} className="text-purple-600" />
                      {currentLanguage === 'TR' ? 'Sınavlarım' : 'My Exams'}
                    </Link>
                    <Link 
                      to="/articles"
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <BookOpen size={16} className="text-green-600" />
                      {currentLanguage === 'TR' ? 'Makalelerim' : 'My Articles'}
                    </Link>
                    <Link 
                      to="/events"
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <Calendar size={16} className="text-yellow-600" />
                      {currentLanguage === 'TR' ? 'Etkinliklerim' : 'My Events'}
                    </Link>
                    <Link 
                      to="/profile"
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <User size={16} className="text-indigo-600" />
                      {currentLanguage === 'TR' ? 'Profil' : 'Profile'}
                    </Link>
                    <div className={`h-px mx-4 my-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <button 
                      onClick={handleLogout}
                      className={`flex items-center gap-3 px-4 py-2 text-sm w-full text-left transition-colors
                        ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-red-600`}
                    >
                      <LogOut size={16} />
                      {currentLanguage === 'TR' ? 'Çıkış Yap' : 'Logout'}
                    </button>
                  </div>
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