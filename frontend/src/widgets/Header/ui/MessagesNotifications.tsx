import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { BellIcon } from 'lucide-react';
import { NotificationButtonWrapper } from '../components';
import { useThemeStore } from '@/app/store';

import { Switch } from '@/shared/ui/switch';

export const MessagesNotifications = () => {
  const { selectedTheme, toggleTheme } = useThemeStore();
  return (
    <div className="row-span-1 col-span-4">
      <div className="flex justify-start items-center gap-4 bg-white mx-4 w-full h-full p-2">
        <div className="flex items-center">
          <Switch
            checked={selectedTheme === 'dark'}
            onCheckedChange={toggleTheme}
            className="bg-slate-900"
          />
          <span className="ml-2 text-slate-900 text-xs">Dark mode</span>
        </div>
        <NotificationButtonWrapper path="/messages" notifications={11}>
          <EnvelopeClosedIcon className="w-5 h-5 text-slate-900" />
        </NotificationButtonWrapper>
        <NotificationButtonWrapper path="/notifications" notifications={7}>
          <BellIcon className="w-5 h-5 text-slate-900" />
        </NotificationButtonWrapper>
      </div>
    </div>
  );
};
