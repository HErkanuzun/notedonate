import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: string;
  userId: string;
}

interface NoteManagementProps {
  isDark: boolean;
}

export default function NoteManagement({ isDark }: NoteManagementProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: ''
  });

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const q = query(collection(db, 'notes'), where('userId', '==', user.id));
      const notesSnapshot = await getDocs(q);
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
      
      setNotes(notesList);
    } catch (err) {
      setError('Notlar yüklenirken bir hata oluştu');
      console.error('Error loading notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      if (editingNote) {
        await updateDoc(doc(db, 'notes', editingNote.id), {
          ...formData,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'notes'), {
          ...formData,
          userId: user.id,
          createdAt: new Date().toISOString()
        });
      }

      await loadNotes();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(editingNote ? 'Not güncellenirken bir hata oluştu' : 'Not eklenirken bir hata oluştu');
      console.error('Error saving note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!window.confirm('Bu notu silmek istediğinizden emin misiniz?')) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      await loadNotes();
    } catch (err) {
      setError('Not silinirken bir hata oluştu');
      console.error('Error deleting note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      subject: note.subject,
      content: note.content
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ title: '', subject: '', content: '' });
    setEditingNote(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notlarım</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Yeni Not Ekle
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-100/10 border border-red-600/20 flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz not eklenmemiş</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
              rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            İlk Notu Ekle
          </button>
        </div>
      ) : (
        <div className={`rounded-lg overflow-hidden border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Ders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className={`${isDark ? 'bg-gray-900' : 'bg-white'} divide-y ${
              isDark ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {notes.map((note) => (
                <tr key={note.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {note.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {note.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 backdrop-blur-md bg-black/50" onClick={() => setShowModal(false)} />
          
          <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-2xl">
                <div className={`relative rounded-xl shadow-2xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      {editingNote ? 'Notu Düzenle' : 'Yeni Not Ekle'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Başlık
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                            ${isDark 
                              ? 'bg-gray-800 focus:bg-gray-700' 
                              : 'bg-gray-50 focus:bg-white'
                            } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                            focus:ring-2 focus:ring-blue-500`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ders
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                            ${isDark 
                              ? 'bg-gray-800 focus:bg-gray-700' 
                              : 'bg-gray-50 focus:bg-white'
                            } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                            focus:ring-2 focus:ring-blue-500`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          İçerik
                        </label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                            ${isDark 
                              ? 'bg-gray-800 focus:bg-gray-700' 
                              : 'bg-gray-50 focus:bg-white'
                            } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                            focus:ring-2 focus:ring-blue-500`}
                          rows={6}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                          transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            {editingNote ? 'Güncelleniyor...' : 'Ekleniyor...'}
                          </>
                        ) : (
                          <>
                            {editingNote ? 'Notu Güncelle' : 'Not Ekle'}
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}