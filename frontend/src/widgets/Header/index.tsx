import clsx from 'clsx';
import { NavBar, NotificationsBar, SearchBar } from './widgets';
import { useThemeStore } from '@/app/store';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { theme } = useThemeStore();

  console.log('theme', theme);

  return (
    <header
      className={clsx(
        'shrink-0 grid grid-cols-12 grid-rows-1 gap-4 mb-3 w-full max-w-[1200px] mx-auto min-h-10 py-4 rounded-lg shadow-md bg-card',
        className
      )}
    >
      <SearchBar />
      <NavBar />
      <NotificationsBar />
    </header>
  );
};
