import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getNotes, deleteNote } from '../../../services/NoteService';
import NoteGrid from '../grids/NoteGrid';
import NoteForm from '../forms/NoteForm';
import { Note } from '../../../types';

interface ProfileContentProps {
  isDark: boolean;
}

export default function ProfileContent({ isDark }: ProfileContentProps) {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section') || 'notes';
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    if (user && section === 'notes') {
      loadNotes();
    }
  }, [user, section]);

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

  const handleAddNote = () => {
    setEditingNote(null);
    setShowNoteForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowNoteForm(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm('Bu notu silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteNote(noteId);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteSuccess = () => {
    loadNotes();
  };

  const renderContent = () => {
    switch (section) {
      case 'notes':
        return (
          <>
            <NoteGrid
              notes={notes}
              isDark={isDark}
              onAdd={handleAddNote}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              isLoading={isLoading}
            />
            {showNoteForm && (
              <NoteForm
                isDark={isDark}
                onClose={() => setShowNoteForm(false)}
                onSuccess={handleNoteSuccess}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}