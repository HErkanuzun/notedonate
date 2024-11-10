import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import FilterPanel from '../components/FilterPanel';
import LoadingCard from '../components/LoadingCard';
import { popularNotes } from '../data/sampleData';
import { FilterOptions } from '../types';

interface NotesPageProps {
  isDark: boolean;
}

function NotesPage({ isDark }: NotesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Extract unique values for filter options
  const universities = useMemo(() => 
    Array.from(new Set(popularNotes.map(note => note.university))).sort(),
    []
  );

  const departments = useMemo(() => 
    Array.from(new Set(popularNotes.map(note => note.department))).sort(),
    []
  );

  const years = useMemo(() => 
    Array.from(new Set(popularNotes.map(note => note.year))).sort(),
    []
  );

  const semesters = useMemo(() => 
    Array.from(new Set(popularNotes.map(note => note.semester))).sort(),
    []
  );

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = [...popularNotes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.subject.toLowerCase().includes(query) ||
        note.university.toLowerCase().includes(query) ||
        note.department.toLowerCase().includes(query)
      );
    }

    if (filterOptions.university) {
      filtered = filtered.filter(note => note.university === filterOptions.university);
    }
    if (filterOptions.department) {
      filtered = filtered.filter(note => note.department === filterOptions.department);
    }
    if (filterOptions.year) {
      filtered = filtered.filter(note => note.year === filterOptions.year);
    }
    if (filterOptions.semester) {
      filtered = filtered.filter(note => note.semester === filterOptions.semester);
    }

    filtered.sort((a, b) => {
      const sortBy = filterOptions.sortBy || 'date';
      const sortOrder = filterOptions.sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'date') {
        return sortOrder * (new Date(b.date).getTime() - new Date(a.date).getTime());
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
            semesters={semesters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Notlarda ara..." 
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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} isDark={isDark} />
              ))
            ) : (
              filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} isDark={isDark} />
              ))
            )}
          </div>

          {!isLoading && filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen not bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesPage;