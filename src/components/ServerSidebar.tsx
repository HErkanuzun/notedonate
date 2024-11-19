import React from 'react';
import { Hash, Home, Plus, Users, User } from 'lucide-react';

interface ServerSidebarProps {
  onProfileClick: () => void;
}

const servers = [
  { id: 1, name: 'Ana Sayfa', icon: <Home className="w-7 h-7" />, unread: true, mentions: 3 },
  { id: 2, name: 'Sohbet', icon: <Hash className="w-7 h-7" />, unread: false },
  { id: 3, name: 'Topluluk', icon: <Users className="w-7 h-7" />, unread: true },
];

export default function ServerSidebar({ onProfileClick }: ServerSidebarProps) {
  return (
    <div className="w-[72px] bg-gray-900/50 backdrop-blur-xl h-screen flex flex-col items-center py-3 space-y-2 border-r border-white/5">
      {servers.map((server) => (
        <div key={server.id} className="group relative channel-hover">
          <button className="relative w-12 h-12 rounded-[24px] group-hover:rounded-2xl bg-white/5 flex items-center justify-center text-gray-100 transition-all duration-200 hover:bg-blue-500">
            {server.icon}
            {server.unread && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {server.mentions || ''}
              </div>
            )}
          </button>
          <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-black/90 backdrop-blur-xl text-white text-sm py-2 px-3 rounded-md whitespace-nowrap z-50">
            {server.name}
          </div>
        </div>
      ))}
      <div className="w-8 border-t border-white/10 my-2" />
      <button
        onClick={onProfileClick}
        className="w-12 h-12 rounded-[24px] hover:rounded-2xl bg-white/5 flex items-center justify-center text-gray-300 transition-all duration-200 hover:bg-blue-500 hover:text-white"
      >
        <User className="w-6 h-6" />
      </button>
      <button className="w-12 h-12 rounded-[24px] hover:rounded-2xl bg-white/5 flex items-center justify-center text-green-400 transition-all duration-200 hover:bg-green-500 hover:text-white">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}