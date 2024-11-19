import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ProfileGrid from '../grids/ProfileGrid';
import NoteUploadModal from '../../upload/NoteUploadModal';
import ExamUploadModal from '../../upload/ExamUploadModal';
import ArticleUploadModal from '../../upload/ArticleUploadModal';
import { getNotes, deleteNote } from '../../../services/NoteService';
import { getExams, deleteExam } from '../../../services/ExamService';
import { getArticles, deleteArticle } from '../../../services/ArticleService';
import { toast } from 'react-toastify';
import { Note, Exam, Article } from '../../../types';

interface ProfileContentProps {
  isDark: boolean;
}

export default function ProfileContent({ isDark }: ProfileContentProps) {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section') || 'notes';
  const { user } = useAuth();
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadContent();
    }
  }, [user, section]);

  const loadContent = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      switch (section) {
        case 'notes':
          const userNotes = await getNotes(user.id);
          setNotes(userNotes);
          break;
        case 'exams':
          const userExams = await getExams(user.id);
          setExams(userExams);
          break;
        case 'articles':
          const userArticles = await getArticles(user.id);
          setArticles(userArticles);
          break;
      }
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('İçerik yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!window.confirm('Bu içeriği silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      switch (type) {
        case 'notes':
          await deleteNote(id.toString());
          setNotes(notes.filter(note => note.id !== id));
          break;
        case 'exams':
          await deleteExam(id.toString());
          setExams(exams.filter(exam => exam.id !== id));
          break;
        case 'articles':
          await deleteArticle(id.toString());
          setArticles(articles.filter(article => article.id !== id));
          break;
      }
      toast.success('İçerik başarıyla silindi');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('İçerik silinirken bir hata oluştu');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-12">Yükleniyor...</div>;
    }

    switch (section) {
      case 'notes':
        return (
          <>
            <ProfileGrid
              type="notes"
              items={notes}
              isDark={isDark}
              onAdd={() => setShowNoteModal(true)}
              onDelete={(id) => handleDelete('notes', id)}
            />
            {showNoteModal && (
              <NoteUploadModal
                isDark={isDark}
                onClose={() => setShowNoteModal(false)}
                onSuccess={() => {
                  loadContent();
                  setShowNoteModal(false);
                  toast.success('Not başarıyla eklendi');
                }}
              />
            )}
          </>
        );
      case 'exams':
        return (
          <>
            <ProfileGrid
              type="exams"
              items={exams}
              isDark={isDark}
              onAdd={() => setShowExamModal(true)}
              onDelete={(id) => handleDelete('exams', id)}
            />
            {showExamModal && (
              <ExamUploadModal
                isDark={isDark}
                onClose={() => setShowExamModal(false)}
                onSuccess={() => {
                  loadContent();
                  setShowExamModal(false);
                  toast.success('Sınav başarıyla eklendi');
                }}
              />
            )}
          </>
        );
      case 'articles':
        return (
          <>
            <ProfileGrid
              type="articles"
              items={articles}
              isDark={isDark}
              onAdd={() => setShowArticleModal(true)}
              onDelete={(id) => handleDelete('articles', id)}
            />
            {showArticleModal && (
              <ArticleUploadModal
                isDark={isDark}
                onClose={() => setShowArticleModal(false)}
                onSuccess={() => {
                  loadContent();
                  setShowArticleModal(false);
                  toast.success('Makale başarıyla eklendi');
                }}
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