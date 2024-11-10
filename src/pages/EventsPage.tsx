import React, { useState, useMemo } from 'react';
import { Filter, Calendar } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import FilterPanel from '../components/FilterPanel';
import { events } from '../data/sampleData';
import { FilterOptions } from '../types';
import { format, isWithinInterval, parseISO } from 'date-fns';

interface EventsPageProps {
  isDark: boolean;
}

function EventsPage({ isDark }: EventsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'asc',
    type: 'all'
  });

  // Extract unique values for filter options
  const universities = useMemo(() => 
    Array.from(new Set(events.map(event => event.university))).sort(),
    []
  );

  const departments = useMemo(() => 
    Array.from(new Set(events.map(event => event.department).filter(Boolean))).sort(),
    []
  );

  const eventTypes = [
    { value: 'all', label: 'Tüm Etkinlikler' },
    { value: 'academic', label: 'Akademik' },
    { value: 'social', label: 'Sosyal' },
    { value: 'career', label: 'Kariyer' },
    { value: 'other', label: 'Diğer' }
  ];

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.university.toLowerCase().includes(query) ||
        (event.department && event.department.toLowerCase().includes(query))
      );
    }

    // Apply other filters
    if (filterOptions.university) {
      filtered = filtered.filter(event => event.university === filterOptions.university);
    }
    if (filterOptions.department) {
      filtered = filtered.filter(event => event.department === filterOptions.department);
    }
    if (filterOptions.type && filterOptions.type !== 'all') {
      filtered = filtered.filter(event => event.type === filterOptions.type);
    }
    if (filterOptions.startDate && filterOptions.endDate) {
      filtered = filtered.filter(event => 
        isWithinInterval(parseISO(event.startDate), {
          start: parseISO(filterOptions.startDate!),
          end: parseISO(filterOptions.endDate!)
        })
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const sortOrder = filterOptions.sortOrder === 'asc' ? 1 : -1;
      return sortOrder * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    });

    return filtered;
  }, [searchQuery, filterOptions]);

  // Group events by month
  const groupedEvents = useMemo(() => {
    const groups = new Map<string, typeof events>();
    
    filteredEvents.forEach(event => {
      const monthYear = format(parseISO(event.startDate), 'MMMM yyyy');
      if (!groups.has(monthYear)) {
        groups.set(monthYear, []);
      }
      groups.get(monthYear)!.push(event);
    });
    
    return groups;
  }, [filteredEvents]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-blue-600" />
              <h3 className="font-semibold">Filtrele</h3>
            </div>

            <div className="space-y-4">
              {/* Event Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Etkinlik Türü</label>
                <select
                  value={filterOptions.type || 'all'}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, type: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
                <input
                  type="date"
                  value={filterOptions.startDate || ''}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, startDate: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={filterOptions.endDate || ''}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, endDate: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                />
              </div>

              {/* University Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Üniversite</label>
                <select
                  value={filterOptions.university || ''}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, university: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                >
                  <option value="">Tüm Üniversiteler</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Bölüm</label>
                <select
                  value={filterOptions.department || ''}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, department: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                >
                  <option value="">Tüm Bölümler</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Etkinliklerde ara..." 
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

          {Array.from(groupedEvents.entries()).map(([monthYear, monthEvents]) => (
            <div key={monthYear} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{monthYear}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthEvents.map((event) => (
                  <EventCard key={event.id} event={event} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen etkinlik bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;