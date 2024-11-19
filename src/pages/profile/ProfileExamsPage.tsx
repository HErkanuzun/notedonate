import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getExams, deleteExam } from '../../services/ExamService';
import ExamCard from '../../components/ExamCard';
import ExamUploadModal from '../../components/upload/ExamUploadModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Exam } from '../../types';

interface ProfileExamsPageProps {
  isDark: boolean;
}

function ProfileExamsPage({ isDark }: ProfileExamsPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadExams();
    }
  }, [user]);

  const loadExams = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userExams = await getExams(user.id);
      setExams(userExams);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (examId: string) => {
    if (!window.confirm('Bu sınavı silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteExam(examId);
      await loadExams();
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Profile Dön
        </button>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Sınav Ekle
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size={32} />
        </div>
      ) : exams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz sınav eklenmemiş</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            İlk Sınavı Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="relative group">
              <ExamCard exam={exam} isDark={isDark} />
              <button
                onClick={() => handleDelete(exam.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <ExamUploadModal
          isDark={isDark}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            loadExams();
          }}
        />
      )}
    </div>
  );
}

export default ProfileExamsPage;