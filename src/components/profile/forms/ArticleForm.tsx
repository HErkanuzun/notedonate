import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadArticle } from '../../../services/ArticleService';

const schema = yup.object({
  title: yup.string().required('Başlık gereklidir'),
  abstract: yup.string().required('Özet gereklidir'),
  content: yup.string().required('İçerik gereklidir'),
  tags: yup.string().required('Etiketler gereklidir'),
  imageUrl: yup.string().url('Geçerli bir URL giriniz'),
  file: yup.mixed().required('Dosya gereklidir')
}).required();

interface ArticleFormProps {
  onClose: () => void;
  onSuccess: () => void;
  isDark: boolean;
}

export default function ArticleForm({ onClose, onSuccess, isDark }: ArticleFormProps) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    if (!user) return;

    try {
      const articleData = {
        ...data,
        authorId: user.id,
        author: user.name,
        university: user.university || '',
        department: user.department || '',
        date: new Date().toISOString(),
        likes: 0,
        downloads: 0,
        tags: data.tags.split(',').map((tag: string) => tag.trim())
      };

      await uploadArticle(articleData, data.file[0]);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Article upload error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 backdrop-blur-md bg-black/50" onClick={onClose} />
      
      <div className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className={`relative rounded-xl shadow-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-blue-600" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Makale Ekle</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Makale Başlığı
                    </label>
                    <input
                      {...register('title')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Özet
                    </label>
                    <textarea
                      {...register('abstract')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-green-500`}
                      rows={3}
                    />
                    {errors.abstract && (
                      <p className="mt-1 text-sm text-red-500">{errors.abstract.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      İçerik (Markdown)
                    </label>
                    <textarea
                      {...register('content')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-green-500`}
                      rows={6}
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Etiketler (virgülle ayırın)
                    </label>
                    <input
                      {...register('tags')}
                      placeholder="yapay zeka, eğitim, teknoloji"
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.tags && (
                      <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kapak Görseli URL (opsiyonel)
                    </label>
                    <input
                      {...register('imageUrl')}
                      placeholder="https://example.com/image.jpg"
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.imageUrl && (
                      <p className="mt-1 text-sm text-red-500">{errors.imageUrl.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PDF Dosyası
                    </label>
                    <input
                      type="file"
                      {...register('file')}
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg 
                        cursor-pointer transition-all border-2 border-dashed
                        ${isDark 
                          ? 'border-gray-700 hover:border-gray-600' 
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <Upload size={20} /> <boltAction type="file" filePath="src/components/profile/grids/ProfileGrid.tsx">import React from 'react';
import { Plus } from 'lucide-react';
import NoteCard from '../../NoteCard';
import ExamCard from '../../ExamCard';
import ArticleCard from '../../ArticleCard';
import { Note, Exam, Article } from '../../../types';

interface ProfileGridProps {
  type: 'notes' | 'exams' | 'articles';
  items: (Note | Exam | Article)[];
  isDark: boolean;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export default function ProfileGrid({ type, items, isDark, onAdd, onDelete }: ProfileGridProps) {
  const renderItem = (item: Note | Exam | Article) => {
    switch (type) {
      case 'notes':
        return <NoteCard note={item as Note} isDark={isDark} />;
      case 'exams':
        return <ExamCard exam={item as Exam} isDark={isDark} />;
      case 'articles':
        return <ArticleCard article={item as Article} isDark={isDark} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type === 'notes' && 'Notlarım'}
          {type === 'exams' && 'Sınavlarım'}
          {type === 'articles' && 'Makalelerim'}
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Yeni Ekle
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz içerik eklenmemiş</p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
              rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            İlk İçeriği Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              {renderItem(item)}
              <button
                onClick={() => onDelete(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}