import React from 'react';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
            alt="Profile"
            className="w-24 h-24 rounded-xl object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-accent-neon p-2 rounded-lg hover:bg-accent-purple transition-colors">
            <Camera className="w-4 h-4 text-black" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Profile Picture</h3>
          <p className="text-passive text-sm">Upload a new avatar</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Display Name</label>
          <input
            type="text"
            className="w-full glass-input rounded-lg px-4 py-2 text-white"
            placeholder="Your display name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Email</label>
          <input
            type="email"
            className="w-full glass-input rounded-lg px-4 py-2 text-white"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Bio</label>
          <textarea
            className="w-full glass-input rounded-lg px-4 py-2 text-white h-24 resize-none"
            placeholder="Tell us about yourself"
          />
        </div>
      </div>

      <div className="pt-4">
        <button className="neon-button px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}