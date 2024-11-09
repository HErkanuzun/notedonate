import React from 'react';
import { ThumbsUp, Download, Share2, Building2, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Exam } from '../types';

interface ExamCardProps {
  exam: Exam;
  isDark: boolean;
}

function ExamCard({ exam, isDark }: ExamCardProps) {
  return (
    <Link to={`/exams/${exam.id}`}>
      <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 
        transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
        backdrop-blur-xl border border-opacity-20 
        ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg hover:shadow-xl`}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            <span className={`px-3 py-1 rounded-full 
              ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} text-purple-600`}>
              {exam.subject}
            </span>
            <span className={`px-3 py-1 rounded-full 
              ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} text-blue-600`}>
              {exam.term} {exam.year}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {exam.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Building2 size={16} />
              <span>{exam.university}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <GraduationCap size={16} />
              <span>{exam.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <User size={16} />
              <span>{exam.professor}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-sm">
              <ThumbsUp size={16} />
              <span>{exam.likes}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Download size={16} />
              <span>{exam.downloads}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Share2 size={16} />
              <span>Paylaş</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ExamCard;