import { create } from 'zustand';

export type TAuthStore = {
  password: string;
  setPassword: (password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  username: string;
  setUsername: (username: string) => void;
};

export const useAuthStore = create<TAuthStore>((set, get) => ({
  password: '',
  setPassword: password => set({ password }),
  email: '',
  setEmail: email => set({ email }),
  avatar: '',
  setAvatar: avatar => set({ avatar }),
  username: '',
  setUsername: username => set({ username }),
}));
