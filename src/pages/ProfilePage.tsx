import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Star,
  Users,
  Calendar,
  Building2,
  ChevronRight,
  Plus,
  Menu,
  X,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import ProfileSkeleton from '../components/profile/ProfileSkeleton';
import EmptyState from '../components/EmptyState';

interface ProfilePageProps {
  isDark: boolean;
}

function ProfilePage({ isDark }: ProfilePageProps) {
  const { user, loading } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <ProfileSkeleton isDark={isDark} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-md w-full backdrop-blur-xl p-8 rounded-xl border border-opacity-20 
          ${isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white/30 border-gray-200'} 
          shadow-xl`}>
          <div className="mb-6">
            <Users className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Giriş Yapın</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Bu sayfayı görüntülemek için lütfen giriş yapın veya hesap oluşturun.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                transition-all transform hover:scale-105 backdrop-blur-xl"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => navigate('/register')}
              className={`w-full py-3 px-4 rounded-xl transition-all transform hover:scale-105 
                backdrop-blur-xl border border-opacity-20 
                ${isDark 
                  ? 'bg-gray-700/30 border-gray-600 text-white' 
                  : 'bg-gray-100/30 border-gray-300 text-gray-900'}`}
            >
              Hesap Oluştur
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sidebarSections = [
    { id: 'notes', icon: FileText, label: 'Notlarım', path: '/profile/notes', color: 'text-blue-600' },
    { id: 'exams', icon: GraduationCap, label: 'Sınavlarım', path: '/profile/exams', color: 'text-purple-600' },
    { id: 'articles', icon: BookOpen, label: 'Makalelerim', path: '/profile/articles', color: 'text-green-600' },
    { id: 'favorites', icon: Star, label: 'Favorilerim', count: user.favorites?.notes.length || 0, color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className={`lg:w-80 flex-shrink-0 transition-all duration-300 
        ${isMobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden lg:block'}`}>
        <div className={`h-full backdrop-blur-xl border-r border-opacity-20 
          ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
          {/* Mobile Menu Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-xl 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          {/* User Profile Summary */}
          <div className="p-6 border-b border-opacity-20 
            ${isDark ? 'border-gray-800' : 'border-gray-200'}">
            <div className="relative group mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-xl object-cover mx-auto 
                  border-2 border-blue-600 group-hover:border-opacity-80 transition-all"
              />
              <button className="absolute bottom-0 right-1/2 translate-x-8 translate-y-2 
                p-2 rounded-xl bg-blue-600 text-white opacity-0 group-hover:opacity-100 
                transition-all transform hover:scale-110 backdrop-blur-sm">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.email}
              </p>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all 
                transform hover:scale-105 backdrop-blur-sm"
            >
              Profili Düzenle
            </button>
          </div>

          {/* Navigation Sections */}
          <nav className="p-4">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  if (section.path) {
                    navigate(section.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 
                  backdrop-blur-sm transition-all transform hover:scale-105 
                  ${isDark 
                    ? 'hover:bg-gray-800/50' 
                    : 'hover:bg-gray-100/50'}`}
              >
                <div className="flex items-center gap-3">
                  <section.icon size={20} className={section.color} />
                  <span className="font-medium">{section.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {section.count !== undefined && (
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {section.count}
                    </span>
                  )}
                  <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </div>
              </button>
            ))}
          </nav>

          {/* User Stats */}
          <div className={`p-4 mt-auto border-t border-opacity-20 
            ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Users size={16} />
                <span>{user.followers} takipçi · {user.following} takip</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Building2 size={16} />
                <span>{user.university || 'Üniversite belirtilmedi'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Calendar size={16} />
                <span>Katılım: {new Date(user.joinDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 backdrop-blur-xl border-b border-opacity-20 
          ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">Profilim</h1>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 
                transition-colors transform hover:scale-105"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <EmptyState type="notes" isDark={isDark} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <ProfileEditModal
          isDark={isDark}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;