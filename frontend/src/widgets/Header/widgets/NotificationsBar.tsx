import { useThemeStore } from '@/app/store';
import {
  BellIcon,
  BookmarkIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import { NotificationButtonWrapper } from '../components';

import { Switch } from '@/shared/ui/switch';

export const NotificationsBar = () => {
  const { selectedTheme, toggleTheme } = useThemeStore();

  return (
    <div className="row-span-1 col-span-3 flex justify-center items-center gap-6">
      <div className="flex justify-center items-center gap-4 bg-white mx-4 w-full h-full p-2 rounded-lg shadow-md">
        <NotificationButtonWrapper path="/notifications" notifications={7}>
          <BellIcon className="w-5 h-5 text-slate-900" />
        </NotificationButtonWrapper>
        <NotificationButtonWrapper path="/messages" notifications={11}>
          <EnvelopeClosedIcon className="w-5 h-5 text-slate-900" />
        </NotificationButtonWrapper>
        <NotificationButtonWrapper path="/bookmarks" notifications={11}>
          <BookmarkIcon className="w-5 h-5 text-slate-900" />
        </NotificationButtonWrapper>
        <div className="flex items-center">
          <Switch
            checked={selectedTheme === 'dark'}
            onCheckedChange={toggleTheme}
            className="bg-slate-900"
          />
          <span className="ml-2 text-slate-900 text-xs">Dark mode</span>
        </div>
      </div>
    </div>
  );
};