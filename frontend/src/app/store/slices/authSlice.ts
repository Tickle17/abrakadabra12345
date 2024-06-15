import { create } from 'zustand';

export type TAuthStore = {
  isLoggedIn: boolean;
  getLoggedInToken: () => boolean;
  getUserId: () => string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  username: string;
  setUsername: (username: string) => void;
};

// TODO: merge getLoggedInToken and getUserId
export const useAuthStore = create<TAuthStore>(set => ({
  isLoggedIn: false,
  getLoggedInToken: () => localStorage.getItem('id') !== null,
  getUserId: () => localStorage.getItem('id'),
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  password: '',
  setPassword: password => set({ password }),
  email: '',
  setEmail: email => set({ email }),
  avatar: '',
  setAvatar: avatar => set({ avatar }),
  username: '',
  setUsername: username => set({ username }),
}));
