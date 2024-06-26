import clsx from 'clsx';
import { NavBar, NotificationsBar, MessagesNotifications } from './ui'; // import { useThemeStore } from '@/app/store';

// import { useThemeStore } from '@/app/store';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        'shrink-0 grid grid-cols-12 grid-rows-1 gap-4 mb-3 w-full max-w-[1200px] mx-auto min-h-10 py-4 shadow-sm bg-card border-radius-default z-50',
        className
      )}
    >
      <MessagesNotifications />
      <NavBar />
      <NotificationsBar />
    </header>
  );
};
