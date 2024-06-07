import { useThemeStore } from '@/app/store';
import { Toaster } from '@/shared/ui/sonner';
import { Header } from '@/widgets';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { selectedTheme } = useThemeStore();
  return (
    <>
      <Toaster />
      <div
        className={clsx(
          'w-full h-screen flex flex-col justify-center items-center p-5 py-2 font-montserrat',
          selectedTheme === 'light' ? 'bg-slate-100' : 'bg-slate-950'
        )}
      >
        <Header />

        <div
          className={clsx(
            'max-h-[88vh] grid grid-cols-12 grid-rows-1 gap-4 grow w-full max-w-[1200px]'
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
