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
  },
  setDark: () => {
    set({ theme: 'dark', selectedTheme: 'dark' });
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
  },
}));
