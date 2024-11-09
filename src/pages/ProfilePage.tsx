import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pencil, MapPin, Building2, GraduationCap, Users, Calendar } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import ExamCard from '../components/ExamCard';
import ProfileEditModal from '../components/profile/ProfileEditModal';

interface ProfilePageProps {
  isDark: boolean;
}

function ProfilePage({ isDark }: ProfilePageProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'notes' | 'exams'>('notes');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Lütfen giriş yapın</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className={`rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl p-6 mb-8`}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Pencil size={18} />
                Profili Düzenle
              </button>
            </div>

            <p className="text-lg mb-4 opacity-90">{user.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {user.university && (
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-blue-600" />
                  <span>{user.university}</span>
                </div>
              )}
              {user.department && (
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-blue-600" />
                  <span>{user.department}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                <span>{user.followers} takipçi · {user.following} takip</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                <span>{new Date(user.joinDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'notes'
              ? 'bg-blue-600 text-white'
              : isDark
              ? 'hover:bg-gray-800'
              : 'hover:bg-gray-100'
          }`}
        >
          Notlar ({user.notes.length})
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'exams'
              ? 'bg-blue-600 text-white'
              : isDark
              ? 'hover:bg-gray-800'
              : 'hover:bg-gray-100'
          }`}
        >
          Sınavlar ({user.exams.length})
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'notes'
          ? user.notes.map(note => (
              <NoteCard key={note.id} note={note} isDark={isDark} />
            ))
          : user.exams.map(exam => (
              <ExamCard key={exam.id} exam={exam} isDark={isDark} />
            ))}
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