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
          'w-full h-screen flex flex-col-reverse lg:flex-row justify-center items-center gap-2 md:gap-5 p-3 md:p-5 md:py-2 font-montserrat overflow-hidden',
          selectedTheme === 'light'
            ? 'bg-white md:bg-slate-100'
            : 'bg-slate-950'
        )}
      >
        {children}
      </div>
    </>
  );
};
