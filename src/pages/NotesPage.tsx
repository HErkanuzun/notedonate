import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import { popularNotes } from '../data/sampleData';

interface NotesPageProps {
  isDark: boolean;
}

function NotesPage({ isDark }: NotesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredNotes = popularNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Notlarda ara..." 
            isDark={isDark}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Filter size={20} />
          Filtrele
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;