import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { popularArticles } from '../data/sampleData';
import ArticleCard from '../components/ArticleCard';
import FilterPanel from '../components/FilterPanel';
import { FilterOptions } from '../types';

interface ArticlesPageProps {
  isDark: boolean;
}

function ArticlesPage({ isDark }: ArticlesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Extract unique values for filter options
  const universities = useMemo(() => 
    Array.from(new Set(popularArticles.map(article => article.university))).sort(),
    []
  );

  const departments = useMemo(() => 
    Array.from(new Set(popularArticles.map(article => article.department))).sort(),
    []
  );

  const tags = useMemo(() => 
    Array.from(new Set(popularArticles.flatMap(article => article.tags))).sort(),
    []
  );

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = [...popularArticles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.abstract.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply other filters
    if (filterOptions.university) {
      filtered = filtered.filter(article => article.university === filterOptions.university);
    }
    if (filterOptions.department) {
      filtered = filtered.filter(article => article.department === filterOptions.department);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const sortOrder = filterOptions.sortOrder === 'asc' ? 1 : -1;
      
      switch (filterOptions.sortBy) {
        case 'date':
          return sortOrder * (new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'likes':
          return sortOrder * (b.likes - a.likes);
        case 'downloads':
          return sortOrder * (b.downloads - a.downloads);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterOptions]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&auto=format&fit=crop"
            alt="Library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        
        <div className="relative px-8 py-16 text-white">
          <h1 className="text-4xl font-bold mb-4 max-w-2xl">
            Akademik Makaleler ve Araştırmalar
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mb-8">
            Öğrenciler ve akademisyenler tarafından paylaşılan en güncel araştırma ve makaleleri keşfedin.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Makalelerde ara..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                  border border-white/20 text-white placeholder-white/70 outline-none
                  focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border border-opacity-20 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} className="text-blue-600" />
              <h3 className="font-semibold">Filtrele</h3>
            </div>

            {/* University Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Üniversite</label>
              <select
                value={filterOptions.university || ''}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, university: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                  ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                  ${isDark ? 'border-gray-600' : 'border-gray-200'}
                  focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                <option value="">Tümü</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bölüm</label>
              <select
                value={filterOptions.department || ''}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, department: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg appearance-none cursor-pointer
                  ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                  ${isDark ? 'border-gray-600' : 'border-gray-200'}
                  focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                <option value="">Tümü</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sıralama</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterOptions.sortBy || 'date'}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, sortBy: e.target.value }))}
                  className={`px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                >
                  <option value="date">Tarih</option>
                  <option value="likes">Beğeni</option>
                  <option value="downloads">İndirme</option>
                </select>
                <select
                  value={filterOptions.sortOrder || 'desc'}
                  onChange={(e) => setFilterOptions(prev => ({ ...prev, sortOrder: e.target.value }))}
                  className={`px-3 py-2 rounded-lg appearance-none cursor-pointer
                    ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                    ${isDark ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500 outline-none`}
                >
                  <option value="desc">Azalan</option>
                  <option value="asc">Artan</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Popüler Etiketler</label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm transition-colors
                      ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery 
                ? `Arama Sonuçları: "${searchQuery}"`
                : 'Tüm Makaleler'}
              <span className="text-sm font-normal opacity-75 ml-2">
                ({filteredArticles.length} makale)
              </span>
            </h2>
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

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} isDark={isDark} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">
                Aramanızla eşleşen makale bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;