import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadNote } from '../../../services/NoteService';

const schema = yup.object({
  title: yup.string().required('Başlık gereklidir'),
  subject: yup.string().required('Ders adı gereklidir'),
  description: yup.string(),
  year: yup.string().required('Yıl gereklidir'),
  semester: yup.string().required('Dönem gereklidir'),
  file: yup.mixed().required('Dosya gereklidir')
}).required();

interface NoteFormProps {
  onClose: () => void;
  onSuccess: () => void;
  isDark: boolean;
}

export default function NoteForm({ onClose, onSuccess, isDark }: NoteFormProps) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    if (!user) return;

    try {
      const noteData = {
        ...data,
        authorId: user.id,
        author: user.name,
        university: user.university || '',
        department: user.department || '',
        date: new Date().toISOString(),
        likes: 0,
        downloads: 0
      };

      await uploadNote(noteData, data.file[0]);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Note upload error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-509">
      <div className="fixed inset-0 backdrop-blur-md bg-black/50" onClick={onClose} />
      
      <div className="fixed inset-0 z-[609] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className={`relative rounded-xl shadow-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Not Ekle</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Not Başlığı
                    </label>
                    <input
                      {...register('title')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ders
                    </label>
                    <input
                      {...register('subject')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Yıl
                      </label>
                      <input
                        type="number"
                        {...register('year')}
                        defaultValue={new Date().getFullYear()}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.year && (
                        <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dönem
                      </label>
                      <select
                        {...register('semester')}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="Güz">Güz</option>
                        <option value="Bahar">Bahar</option>
                        <option value="Yaz">Yaz</option>
                      </select>
                      {errors.semester && (
                        <p className="mt-1 text-sm text-red-500">{errors.semester.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Açıklama
                    </label>
                    <textarea
                      {...register('description')}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PDF Dosyası
                    </label>
                    <input
                      type="file"
                      {...register('file')}
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg 
                        cursor-pointer transition-all border-2 border-dashed
                        ${isDark 
                          ? 'border-gray-700 hover:border-gray-600' 
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <Upload size={20} />
                      PDF dosyası seçin
                    </label>
                    {errors.file && (
                      <p className="mt-1 text-sm text-red-500">{errors.file.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Notu Yükle
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}