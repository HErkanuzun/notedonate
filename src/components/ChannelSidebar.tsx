import React from 'react';
import { ChevronDown, Hash, Volume2, Settings, Circle, Plus, Users } from 'lucide-react';

const textChannels = [
  { id: 1, name: 'general', unread: true, mentions: 2 },
  { id: 2, name: 'announcements', unread: false },
  { id: 3, name: 'off-topic', unread: true },
];

const voiceChannels = [
  { id: 1, name: 'General Voice', users: ['John', 'Jane'] },
  { id: 2, name: 'Gaming', users: [] },
];

const ChannelButton = ({ channel, icon: Icon }) => (
  <div className="group flex items-center justify-between text-gray-400 hover:text-white glass-button px-3 py-2 rounded-lg cursor-pointer">
    <div className="flex items-center flex-1 min-w-0">
      <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
      <span className="truncate">{channel.name}</span>
      {channel.users?.length > 0 && (
        <span className="ml-2 text-xs text-gray-400">
          {channel.users.length}
        </span>
      )}
    </div>
    {channel.mentions && (
      <span className="bg-red-500/80 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded-full">
        {channel.mentions}
      </span>
    )}
  </div>
);

export default function ChannelSidebar() {
  return (
    <div className="w-64 glass-effect-strong h-screen flex flex-col">
      <button className="h-16 px-4 flex items-center justify-between glass-effect">
        <h1 className="text-white font-bold truncate text-lg">Bolt Server</h1>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div>
            <div className="text-gray-400 flex items-center justify-between group cursor-pointer mb-2 px-2">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center">
                <ChevronDown className="w-3 h-3 mr-1" /> Text Channels
              </span>
              <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="space-y-1">
              {textChannels.map((channel) => (
                <ChannelButton key={channel.id} channel={channel} icon={Hash} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-gray-400 flex items-center justify-between group cursor-pointer mb-2 px-2">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center">
                <ChevronDown className="w-3 h-3 mr-1" /> Voice Channels
              </span>
              <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="space-y-1">
              {voiceChannels.map((channel) => (
                <ChannelButton key={channel.id} channel={channel} icon={Volume2} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 glass-effect mt-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-lg"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 bg-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">John Doe</div>
            <div className="text-gray-400 text-xs flex items-center gap-1">
              <Circle className="w-2 h-2 fill-green-500 text-green-500" /> Online
            </div>
          </div>
          <button className="glass-button p-2 rounded-lg text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}