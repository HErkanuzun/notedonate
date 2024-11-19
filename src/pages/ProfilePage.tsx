import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Star,
  Users,
  Calendar,
  Building2,
  ChevronRight,
  Plus
} from 'lucide-react';
import NoteCard from '../components/NoteCard';
import ExamCard from '../components/ExamCard';
import ArticleCard from '../components/ArticleCard';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import ProfileSkeleton from '../components/profile/ProfileSkeleton';
import EmptyState from '../components/EmptyState';
import FavoriteToggle from '../components/FavoriteToggle';
import { popularNotes, popularExams, popularArticles } from '../data/sampleData';

interface ProfilePageProps {
  isDark: boolean;
}

type Section = 'notes' | 'exams' | 'articles' | 'favorites';

function ProfilePage({ isDark }: ProfilePageProps) {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('notes');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) {
    return <ProfileSkeleton isDark={isDark} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`max-w-md w-full p-8 rounded-xl text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-xl`}>
          <div className="mb-6">
            <Users className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Giriş Yapın</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bu sayfayı görüntülemek için lütfen giriş yapın veya hesap oluşturun.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="/login"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </a>
            <a
              href="/register"
              className="block w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Hesap Oluştur
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'notes':
        return (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Notlarım</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={20} />
                Not Ekle
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularNotes.map((note) => (
                <div key={note.id} className="relative">
                  <FavoriteToggle
                    isFavorite={false}
                    onToggle={() => {}}
                  />
                  <NoteCard note={note} isDark={isDark} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sınavlarım</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus size={20} />
                Sınav Ekle
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularExams.map((exam) => (
                <div key={exam.id} className="relative">
                  <FavoriteToggle
                    isFavorite={false}
                    onToggle={() => {}}
                  />
                  <ExamCard exam={exam} isDark={isDark} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Makalelerim</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus size={20} />
                Makale Ekle
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article) => (
                <div key={article.id} className="relative">
                  <FavoriteToggle
                    isFavorite={false}
                    onToggle={() => {}}
                  />
                  <ArticleCard article={article} isDark={isDark} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'favorites':
        return <EmptyState type="favorites" isDark={isDark} />;
      default:
        return null;
    }
  };

  const sidebarSections = [
    { id: 'notes', icon: FileText, label: 'Notlarım', count: popularNotes.length },
    { id: 'exams', icon: GraduationCap, label: 'Sınavlarım', count: popularExams.length },
    { id: 'articles', icon: BookOpen, label: 'Makalelerim', count: popularArticles.length },
    { id: 'favorites', icon: Star, label: 'Favorilerim', count: 0 },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`w-64 flex-shrink-0 border-r ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        {/* User Profile Summary */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm opacity-75">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg 
              bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Profili Düzenle
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4">
          {sidebarSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as Section)}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : `hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} />
                <span>{section.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-75">{section.count}</span>
                <ChevronRight size={16} />
              </div>
            </button>
          ))}
        </nav>

        {/* User Stats */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
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