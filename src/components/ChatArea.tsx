import React, { useState } from 'react';
import { Hash, Bell, PinIcon, Users, Search, Smile, Paperclip, Gift, Plus, Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import AttachmentMenu from './AttachmentMenu';
import GiftMenu from './GiftMenu';

export default function ChatArea() {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: Implement message sending
    setMessage('');
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmoji(false);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-primary">
      {/* Header */}
      <div className="h-16 glass-effect-strong flex items-center px-6 shadow-lg z-10">
        <div className="flex items-center flex-1">
          <div className="glass-effect p-2 rounded-lg mr-3">
            <Hash className="w-5 h-5 text-accent-cyan" />
          </div>
          <span className="text-white font-medium text-lg">general</span>
          <div className="h-6 w-px bg-white/10 mx-4" />
          <span className="text-passive">Welcome to the general chat!</span>
        </div>
        <div className="flex items-center gap-4 text-passive">
          <button className="glass-button p-2 rounded-lg hover:text-accent-cyan">
            <Bell className="w-5 h-5" />
          </button>
          <button className="glass-button p-2 rounded-lg hover:text-accent-cyan">
            <PinIcon className="w-5 h-5" />
          </button>
          <button className="glass-button p-2 rounded-lg hover:text-accent-cyan">
            <Users className="w-5 h-5" />
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-passive" />
            <input
              type="text"
              placeholder="Search"
              className="glass-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 w-40 transition-all duration-300 focus:w-52"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="group hover-trigger animate-fade-in">
            <div className="glass-effect rounded-xl p-4 hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={msg.avatar}
                    alt={msg.user}
                    className="w-10 h-10 rounded-xl"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-cyan rounded-full border-2 border-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white hover:text-accent-purple cursor-pointer transition-colors">
                      {msg.user}
                    </span>
                    {msg.role === 'admin' && (
                      <span className="glass-effect px-2 py-0.5 rounded-full text-xs text-accent-gold">
                        Admin
                      </span>
                    )}
                    <span className="text-xs text-passive">{msg.timestamp}</span>
                  </div>
                  <p className="text-white break-words leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="glass-effect-strong rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <button 
              type="button" 
              className="glass-button p-2 rounded-lg hover:text-accent-cyan"
              onClick={() => setShowAttach(!showAttach)}
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="h-5 w-px bg-white/10" />
            <button 
              type="button" 
              className="glass-button p-2 rounded-lg hover:text-accent-cyan"
              onClick={() => setShowGift(!showGift)}
            >
              <Gift className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message #general"
              className="flex-1 bg-transparent text-white placeholder-passive focus:outline-none text-lg"
            />
            <div className="flex items-center gap-2 text-passive">
              <div className="relative">
                <button 
                  type="button" 
                  className="glass-button p-2 rounded-lg hover:text-accent-cyan"
                  onClick={() => setShowAttach(!showAttach)}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                {showAttach && <AttachmentMenu onClose={() => setShowAttach(false)} />}
              </div>
              <div className="relative">
                <button 
                  type="button" 
                  className="glass-button p-2 rounded-lg hover:text-accent-cyan"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <Smile className="w-5 h-5" />
                </button>
                {showEmoji && <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmoji(false)} />}
              </div>
              {message.trim() && (
                <button 
                  type="submit" 
                  className="glass-button p-2 rounded-lg text-accent-cyan hover:text-white hover:bg-accent-purple transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const messages = [
  {
    id: 1,
    user: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
    timestamp: '12:30 PM',
    content: 'Hey everyone! Welcome to the new server! 👋',
    role: 'admin',
  },
  {
    id: 2,
    user: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    timestamp: '12:32 PM',
    content: 'Thanks for having us here! Looking forward to great discussions.',
    role: 'member',
  },
];