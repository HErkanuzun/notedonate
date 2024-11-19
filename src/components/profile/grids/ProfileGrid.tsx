import React from 'react';
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