import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Toaster } from '@/shared/ui';
import { useThemeStore } from '@/app/store';

export type PAuthLayout = {
  children: ReactNode;
};

export const AuthLayout: FC<PAuthLayout> = ({ children }) => {
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
        {children}
      </div>
    </>
  );
};
