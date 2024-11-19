import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getArticles, deleteArticle } from '../../services/ArticleService';
import ArticleCard from '../../components/ArticleCard';
import ArticleUploadModal from '../../components/upload/ArticleUploadModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Article } from '../../types';

interface ProfileArticlesPageProps {
  isDark: boolean;
}

function ProfileArticlesPage({ isDark }: ProfileArticlesPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadArticles();
    }
  }, [user]);

  const loadArticles = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userArticles = await getArticles(user.id);
      setArticles(userArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!window.confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteArticle(articleId);
      await loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 hover:text-green-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Profile Dön
        </button>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Makale Ekle
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size={32} />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz makale eklenmemiş</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            İlk Makaleyi Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="relative group">
              <ArticleCard article={article} isDark={isDark} />
              <button
                onClick={() => handleDelete(article.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <ArticleUploadModal
          isDark={isDark}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            loadArticles();
          }}
        />
      )}
    </div>
  );
}

export default ProfileArticlesPage;