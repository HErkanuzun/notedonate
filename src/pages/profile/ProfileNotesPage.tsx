import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getNotes, deleteNote } from '../../services/NoteService';
import NoteCard from '../../components/NoteCard';
import NoteUploadModal from '../../components/upload/NoteUploadModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Note } from '../../types';

interface ProfileNotesPageProps {
  isDark: boolean;
}

function ProfileNotesPage({ isDark }: ProfileNotesPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userNotes = await getNotes(user.id);
      setNotes(userNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!window.confirm('Bu notu silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteNote(noteId);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Profile Dön
        </button>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Not Ekle
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size={32} />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz not eklenmemiş</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            İlk Notu Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="relative group">
              <NoteCard note={note} isDark={isDark} />
              <button
                onClick={() => handleDelete(note.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <NoteUploadModal
          isDark={isDark}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            loadNotes();
          }}
        />
      )}
    </div>
  );
}

export default ProfileNotesPage;