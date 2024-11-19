import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Note } from '../../../types';

interface NoteGridProps {
  notes: Note[];
  isDark: boolean;
  onAdd: () => void;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  isLoading?: boolean;
}

export default function NoteGrid({ notes, isDark, onAdd, onEdit, onDelete, isLoading }: NoteGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notlarım</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Not Ekle
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz not eklenmemiş</p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
              rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            İlk Notu Ekle
          </button>
        </div>
      ) : (
        <div className={`rounded-lg overflow-hidden border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Ders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Dönem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className={`${isDark ? 'bg-gray-900' : 'bg-white'} divide-y ${
              isDark ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {notes.map((note) => (
                <tr key={note.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {note.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {note.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {note.semester} {note.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(note.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(note)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => onDelete(note.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}