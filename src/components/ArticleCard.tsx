import React from 'react';
import { Heart, Download, Share2, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isDark: boolean;
  onToggleFavorite?: (id: number) => void;
}

function ArticleCard({ article, isDark, onToggleFavorite }: ArticleCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 
      transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
      backdrop-blur-xl border border-opacity-20 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } shadow-lg hover:shadow-xl`}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
          {article.tags.map((tag, index) => (
            <span key={index} className={`flex items-center gap-1 px-3 py-1 rounded-full 
              ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} text-blue-600`}>
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm opacity-75 mb-4">
          <Calendar size={16} />
          <span>{new Date(article.date).toLocaleDateString('tr-TR')}</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
        
        <p className="text-sm opacity-75 mb-4 line-clamp-3">
          {article.content}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(article.id);
            }}
            className={`flex items-center gap-1 transition-colors ${
              article.isFavorite ? 'text-red-500' : 'hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={article.isFavorite ? 'currentColor' : 'none'} />
            <span>{article.likes}</span>
          </button>
          
          <div className="flex items-center gap-1 text-sm">
            <Download size={16} />
            <span>{article.downloads}</span>
          </div>
          
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Share2 size={16} />
            <span>Paylaş</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;