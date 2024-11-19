import React from 'react';
import { Volume2, Mic, Speaker } from 'lucide-react';

export function AudioSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Audio Settings</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-accent-neon" />
            <label className="text-white font-medium">Output Volume</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="w-full h-2 bg-passive/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-5 h-5 text-accent-neon" />
            <label className="text-white font-medium">Input Volume</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="60"
            className="w-full h-2 bg-passive/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Speaker className="w-5 h-5 text-accent-neon" />
            <label className="text-white font-medium">Output Device</label>
          </div>
          <select className="w-full glass-input rounded-lg px-4 py-2 text-white">
            <option>System Default</option>
            <option>Headphones</option>
            <option>Speakers</option>
          </select>
        </div>
      </div>
    </div>
  );
}