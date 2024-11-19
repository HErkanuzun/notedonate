import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Appearance</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            <button className="glass-effect p-4 rounded-lg flex flex-col items-center gap-2 hover:neon-border">
              <Sun className="w-6 h-6 text-accent-neon" />
              <span className="text-white text-sm">Light</span>
            </button>
            <button className="glass-effect p-4 rounded-lg flex flex-col items-center gap-2 neon-border">
              <Moon className="w-6 h-6 text-accent-neon" />
              <span className="text-white text-sm">Dark</span>
            </button>
            <button className="glass-effect p-4 rounded-lg flex flex-col items-center gap-2 hover:neon-border">
              <Monitor className="w-6 h-6 text-accent-neon" />
              <span className="text-white text-sm">System</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Font Size</label>
          <input
            type="range"
            min="12"
            max="20"
            defaultValue="16"
            className="w-full h-2 bg-passive/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Message Display</label>
          <select className="w-full glass-input rounded-lg px-4 py-2 text-white">
            <option>Cozy</option>
            <option>Compact</option>
          </select>
        </div>
      </div>
    </div>
  );
}