import { create } from 'zustand';
import axios from 'axios';
import { ProfileState } from '@/app/store/slices/profileSlice.ts';

export type TReactions = {
  id: string;
  commentary?: string;
  invitation: boolean;
  control: boolean;
  userId: string;
  businessId: string;
  vacancyId: string;
};
type ReactionsState = {
  reactions: TReactions[];
  fetchReactions: () => Promise<void>;
};

export const useReactionsStore = create<ReactionsState>(set => ({
  reactions: [],
  fetchReactions: async () => {
    try {
      const response = await axios.get<TReactions[]>(
        'https://backendhackaton.onrender.com/reactions'
      );
      set({ reactions: response.data });
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  },
}));

type ReactionUserState = {
  user: ProfileState;
  fetchReactionUser: (id: string) => Promise<void>;
};
export const useReactionUserStore = create<ReactionUserState>(set => ({
  user: {
    fullName: '',
    photoUrl: '',
    role: '',
    age: 0,
    stackTech: '',
    gitlabUrl: '',
    aboutUser: '',
    targetsInfo: '',
    price: 0,
    criterionsJob: '',
    softSkills: null,
    hardSkills: null,
  },
  fetchReactionUser: async id => {
    try {
      const response = await axios.get<ProfileState>(
        `https://backendhackaton.onrender.com/users/${id}`
      );
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  },
}));
