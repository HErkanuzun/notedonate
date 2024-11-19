import React from 'react';
import { X } from 'lucide-react';

const emojis = ['😊', '👋', '❤️', '🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪'];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 p-4 glass-effect-strong rounded-xl cyberpunk-border w-64 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-medium">Emojis</span>
        <button 
          onClick={onClose}
          className="text-passive hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="text-2xl hover:scale-110 transition-transform p-2 glass-button rounded-lg"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}