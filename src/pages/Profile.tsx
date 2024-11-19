import React, { useState } from 'react';
import { Camera, ArrowLeft, LogOut, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function Profile({ onBack, onLogout }: ProfileProps) {
  const [profile, setProfile] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@email.com',
    phone: '+90 555 123 4567',
    location: 'İstanbul, Türkiye',
    website: 'ahmetyilmaz.com',
    bio: 'Yazılım geliştirici ve teknoloji meraklısı',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 bg-gray-750/50 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Geri Dön
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Çıkış Yap
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-lg border border-white/10">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-gray-300">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>{profile.phone}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe className="w-5 h-5" />
                  <span>{profile.website}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" /> Değişiklikleri Kaydet
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Profili Düzenle
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}