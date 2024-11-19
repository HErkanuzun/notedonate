import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SettingsNav } from '../components/settings/SettingsNav';
import { SettingsContent } from '../components/settings/SettingsContent';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeSection, setActiveSection] = React.useState('profile');

  return (
    <div className="flex-1 bg-secondary/50 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-passive hover:text-accent-neon transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="glass-effect-strong rounded-2xl p-8 neon-border">
          <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
          
          <div className="flex gap-8">
            <SettingsNav activeSection={activeSection} onSelect={setActiveSection} />
            <SettingsContent section={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
}