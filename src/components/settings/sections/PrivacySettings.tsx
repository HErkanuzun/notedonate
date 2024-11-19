import React from 'react';

export function PrivacySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Privacy Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Online Status</h3>
            <p className="text-passive text-sm">Show when you're online</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-passive/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-neon"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Friend Requests</h3>
            <p className="text-passive text-sm">Allow friend requests</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-passive/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-neon"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Profile Visibility</h3>
            <p className="text-passive text-sm">Who can see your profile</p>
          </div>
          <select className="glass-input rounded-lg px-4 py-2 text-white">
            <option>Everyone</option>
            <option>Friends Only</option>
            <option>Private</option>
          </select>
        </div>
      </div>
    </div>
  );
}