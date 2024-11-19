import React from 'react';
import { Smartphone, Laptop, Tablet } from 'lucide-react';

export function DeviceSettings() {
  const devices = [
    { type: 'Laptop', icon: Laptop, name: 'MacBook Pro', lastActive: 'Now' },
    { type: 'Phone', icon: Smartphone, name: 'iPhone 13', lastActive: '2 hours ago' },
    { type: 'Tablet', icon: Tablet, name: 'iPad Air', lastActive: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Connected Devices</h2>
      
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.name} className="glass-effect p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <device.icon className="w-6 h-6 text-accent-neon" />
              <div>
                <h3 className="text-white font-medium">{device.name}</h3>
                <p className="text-passive text-sm">{device.type} • {device.lastActive}</p>
              </div>
            </div>
            <button className="text-red-400 hover:text-red-300 text-sm">
              Disconnect
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button className="neon-button px-6 py-2 rounded-lg">
          Add New Device
        </button>
      </div>
    </div>
  );
}