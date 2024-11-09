import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ExamCard from '../components/ExamCard';
import { popularExams } from '../data/sampleData';

interface ExamsPageProps {
  isDark: boolean;
}

function ExamsPage({ isDark }: ExamsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = popularExams.filter(exam =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Sınavlarda ara..." 
            isDark={isDark}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Filter size={20} />
          Filtrele
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

export default ExamsPage;