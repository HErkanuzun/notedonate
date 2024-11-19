import React, { useState } from 'react';
import { X, Loader2, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileEditModalProps {
  isDark: boolean;
  onClose: () => void;
}

function ProfileEditModal({ isDark, onClose }: ProfileEditModalProps) {
  const { user, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    university: user?.university || '',
    department: user?.department || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await updateUserProfile(formData);
      onClose();
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <div className={`relative rounded-xl shadow-2xl backdrop-blur-xl border border-opacity-20 
              ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}>
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-200 
                  dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Profili Düzenle</h2>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-100/10 border border-red-600/20 
                    flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex justify-center">
                    <div className="relative group">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-24 h-24 rounded-xl object-cover border-2 border-blue-600 
                          group-hover:border-opacity-80 transition-all"
                      />
                      <button className="absolute bottom-0 right-0 p-2 rounded-xl bg-blue-600 
                        text-white opacity-0 group-hover:opacity-100 transition-all transform 
                        hover:scale-110 backdrop-blur-sm">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      İsim
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all
                        backdrop-blur-sm border border-opacity-20
                        ${isDark 
                          ? 'bg-gray-800/50 focus:bg-gray-700/50 border-gray-700' 
                          : 'bg-gray-50/50 focus:bg-white/50 border-gray-200'
                        } focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Biyografi
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all
                        backdrop-blur-sm border border-opacity-20
                        ${isDark 
                          ? 'bg-gray-800/50 focus:bg-gray-700/50 border-gray-700' 
                          : 'bg-gray-50/50 focus:bg-white/50 border-gray-200'
                        } focus:ring-2 focus:ring-blue-500`}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Üniversite
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all
                        backdrop-blur-sm border border-opacity-20
                        ${isDark 
                          ? 'bg-gray-800/50 focus:bg-gray-700/50 border-gray-700' 
                          : 'bg-gray-50/50 focus:bg-white/50 border-gray-200'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bölüm
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all
                        backdrop-blur-sm border border-opacity-20
                        ${isDark 
                          ? 'bg-gray-800/50 focus:bg-gray-700/50 border-gray-700' 
                          : 'bg-gray-50/50 focus:bg-white/50 border-gray-200'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                      transition-all transform hover:scale-105 disabled:opacity-50 
                      disabled:cursor-not-allowed disabled:hover:scale-100
                      backdrop-blur-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Güncelleniyor...
                      </>
                    ) : (
                      'Profili Güncelle'
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

export default ProfileEditModal;