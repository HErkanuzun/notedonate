import React from 'react';
import { Image, File, Film, X } from 'lucide-react';

interface AttachmentMenuProps {
  onClose: () => void;
}

export default function AttachmentMenu({ onClose }: AttachmentMenuProps) {
  const options = [
    { icon: Image, label: 'Image', color: 'text-accent-cyan' },
    { icon: Film, label: 'Video', color: 'text-accent-purple' },
    { icon: File, label: 'File', color: 'text-accent-gold' },
  ];

  return (
    <div className="absolute bottom-full right-0 mb-2 p-4 glass-effect-strong rounded-xl cyberpunk-border w-48 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-medium">Attach</span>
        <button 
          onClick={onClose}
          className="text-passive hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {options.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 p-2 glass-button rounded-lg hover:bg-white/10 transition-colors"
          >
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-white">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}