import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ExamCard from '../components/ExamCard';
import FilterPanel from '../components/FilterPanel';
import { popularExams } from '../data/sampleData';
import { FilterOptions } from '../types';

interface ExamsPageProps {
  isDark: boolean;
}

function ExamsPage({ isDark }: ExamsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Extract unique values for filter options
  const universities = useMemo(() => 
    Array.from(new Set(popularExams.map(exam => exam.university))).sort(),
    []
  );

  const departments = useMemo(() => 
    Array.from(new Set(popularExams.map(exam => exam.department))).sort(),
    []
  );

  const years = useMemo(() => 
    Array.from(new Set(popularExams.map(exam => exam.year))).sort(),
    []
  );

  const terms = useMemo(() => 
    Array.from(new Set(popularExams.map(exam => exam.term))).sort(),
    []
  );

  // Filter and sort exams
  const filteredExams = useMemo(() => {
    let filtered = [...popularExams];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exam =>
        exam.title.toLowerCase().includes(query) ||
        exam.subject.toLowerCase().includes(query) ||
        exam.university.toLowerCase().includes(query) ||
        exam.department.toLowerCase().includes(query) ||
        exam.professor.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (filterOptions.university) {
      filtered = filtered.filter(exam => exam.university === filterOptions.university);
    }
    if (filterOptions.department) {
      filtered = filtered.filter(exam => exam.department === filterOptions.department);
    }
    if (filterOptions.year) {
      filtered = filtered.filter(exam => exam.year === filterOptions.year);
    }
    if (filterOptions.semester) {
      filtered = filtered.filter(exam => exam.term === filterOptions.semester);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const sortBy = filterOptions.sortBy || 'date';
      const sortOrder = filterOptions.sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'date') {
        return sortOrder * (b.year.localeCompare(a.year) || b.term.localeCompare(a.term));
      }
      return sortOrder * (b[sortBy] - a[sortBy]);
    });

    return filtered;
  }, [searchQuery, filterOptions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel
            isDark={isDark}
            options={filterOptions}
            onFilterChange={setFilterOptions}
            universities={universities}
            departments={departments}
            years={years}
            semesters={terms}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Sınavlarda ara..." 
                isDark={isDark}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border 
                border-gray-200 dark:border-gray-700 hover:bg-gray-100 
                dark:hover:bg-gray-800 transition-colors"
            >
              <Filter size={20} />
              Filtrele
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} isDark={isDark} />
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen sınav bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamsPage;