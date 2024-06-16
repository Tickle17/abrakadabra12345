import { create } from 'zustand';

export type ThemeVariant = 'light' | 'dark' | 'system';

export type ThemeState = {
  systemTheme: 'light' | 'dark';
  theme: ThemeVariant;
  selectedTheme: ThemeVariant;
  setLight: () => void;
  setDark: () => void;
  toggleTheme: () => void;
};

const setTheme = (theme: ThemeVariant) => {
  const root = window.document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  root.classList.remove('light', 'dark');

  // switch (theme) {
  //   case 'system':
  //     root.classList.add(systemTheme);
  //     break;
  //   default:
  //     root.classList.add(theme);
  //     break;
  // }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  systemTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  theme: 'light',
  selectedTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  setLight: () => {
    set({ theme: 'light', selectedTheme: 'light' });
    setTheme('light');
  },
  setDark: () => {
    set({ theme: 'dark', selectedTheme: 'dark' });
    setTheme('dark');
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    let nextTheme: ThemeVariant;
    if (currentTheme === 'system') {
      nextTheme = get().systemTheme === 'light' ? 'dark' : 'light';
    } else {
      nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    }
    set({ theme: nextTheme, selectedTheme: nextTheme });
    setTheme(nextTheme);
  },
}));
