import React from 'react';
import { Shield, Circle } from 'lucide-react';

const users = {
  admins: [
    { id: 1, name: 'Admin One', status: 'online', activity: 'Playing Minecraft' },
    { id: 2, name: 'Admin Two', status: 'idle', activity: 'Spotify' },
  ],
  members: [
    { id: 3, name: 'Member One', status: 'online' },
    { id: 4, name: 'Member Two', status: 'dnd', activity: 'Do not disturb' },
    { id: 5, name: 'Member Three', status: 'offline' },
  ],
};

const statusColors = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

const UserItem = ({ user, isAdmin = false }) => (
  <div className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors group">
    <div className="relative flex-shrink-0">
      <img
        src={`https://images.unsplash.com/photo-${user.id}?w=32&h=32&fit=crop`}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <div 
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${statusColors[user.status]}`} 
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium flex items-center gap-1">
        {user.name}
        {isAdmin && <Shield className="w-3 h-3 text-brand" />}
      </div>
      {user.activity && (
        <div className="text-xs text-gray-400 truncate">{user.activity}</div>
      )}
    </div>
  </div>
);

export default function UserList() {
  return (
    <div className="w-60 bg-gray-800 h-screen p-4 animate-slide-in">
      <div className="mb-6">
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Admins — {users.admins.length}
        </div>
        {users.admins.map((user) => (
          <UserItem key={user.id} user={user} isAdmin />
        ))}
      </div>

      <div>
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Members — {users.members.length}
        </div>
        {users.members.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}