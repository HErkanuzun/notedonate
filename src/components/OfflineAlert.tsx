import React from 'react';
import { WifiOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function OfflineAlert() {
  const { isOnline } = useAuth();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg">
        <WifiOff size={20} />
        <span>You are currently offline</span>
      </div>
    </div>
  );
}

export default OfflineAlert;