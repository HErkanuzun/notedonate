import React from 'react';
import { User, Bell, Monitor, Shield, Palette, Headphones } from 'lucide-react';

interface SettingsNavProps {
  activeSection: string;
  onSelect: (section: string) => void;
}

const navItems = [
  { id: 'profile', icon: User, label: 'My Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'audio', icon: Headphones, label: 'Audio' },
  { id: 'privacy', icon: Shield, label: 'Privacy' },
  { id: 'devices', icon: Monitor, label: 'Devices' },
];

export function SettingsNav({ activeSection, onSelect }: SettingsNavProps) {
  return (
    <nav className="w-48 space-y-1">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
            activeSection === id
              ? 'bg-accent-neon/20 text-accent-neon'
              : 'text-passive hover:text-white hover:bg-white/5'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
}