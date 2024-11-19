import React from 'react';
import { Gift, X } from 'lucide-react';

interface GiftMenuProps {
  onClose: () => void;
}

const gifts = [
  { id: 1, emoji: '🎮', name: 'Gaming Console', price: '500' },
  { id: 2, emoji: '🎲', name: 'Board Game', price: '100' },
  { id: 3, emoji: '🎯', name: 'Target Game', price: '200' },
  { id: 4, emoji: '🎪', name: 'VIP Pass', price: '1000' },
];

export default function GiftMenu({ onClose }: GiftMenuProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 p-4 glass-effect-strong rounded-xl cyberpunk-border w-64 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-medium">Send a Gift</span>
        <button 
          onClick={onClose}
          className="text-passive hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            className="w-full flex items-center justify-between p-2 glass-button rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{gift.emoji}</span>
              <span className="text-white">{gift.name}</span>
            </div>
            <span className="text-accent-gold">{gift.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}