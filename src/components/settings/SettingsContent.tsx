import React from 'react';
import { ProfileSettings } from './sections/ProfileSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { AppearanceSettings } from './sections/AppearanceSettings';
import { AudioSettings } from './sections/AudioSettings';
import { PrivacySettings } from './sections/PrivacySettings';
import { DeviceSettings } from './sections/DeviceSettings';

interface SettingsContentProps {
  section: string;
}

export function SettingsContent({ section }: SettingsContentProps) {
  const renderContent = () => {
    switch (section) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'audio':
        return <AudioSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'devices':
        return <DeviceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex-1 min-w-0">
      {renderContent()}
    </div>
  );
}