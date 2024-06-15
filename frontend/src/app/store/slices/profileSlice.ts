import { create } from 'zustand';

export type ProfileState = {
  fullName: string;
  role: 'business' | 'users' | '';
  photoUrl: string;
  age: number;
  stackTech: string;
  gitlabUrl: string;
  aboutUser: string;
  price: number;
  criterionsJob: string;
  softSkills:
    | (
        | 'Stress'
        | 'PRIDE'
        | 'GREED'
        | 'WRATH'
        | 'ENVY'
        | 'LUST'
        | 'GLUTTONY'
        | 'SLOTH'
      )[]
    | null;
  hardSkills:
    | (
        | 'REACT'
        | 'CSS'
        | 'JS'
        | 'KOTLIN'
        | 'HTML'
        | 'POSTGRESQL'
        | 'WEBPACK'
        | 'JAVA'
        | 'PYTHON'
        | 'DOCKER'
        | 'GIT'
        | 'TYPESCRIPT'
      )[]
    | null;
};

export type ProfileStore = {
  profileData: ProfileState;
  calendarid: string | null;
  setCalendarId: (calendarId: string | null) => void;
  setRole: (role: 'business' | 'users') => void;
  setUserId: (userId: string) => void;
  setProfileData: (profileData: Partial<ProfileState>) => void;
};

export const useProfileStore = create<ProfileStore>(set => ({
  profileData: {
    id: '',
    role: '',
    fullName: '',
    photoUrl: '',
    age: 0,
    stackTech: '',
    gitlabUrl: '',
    aboutUser: '',
    price: 0,
    criterionsJob: '',
    softSkills: null,
    hardSkills: null,
  },
  calendarid: null,
  setCalendarId: calendarId => set({ calendarid: calendarId }),
  setRole: role =>
    set(state => {
      localStorage.setItem('role', role);
      return {
        profileData: { ...state.profileData, role: role },
      };
    }),
  setUserId: userId =>
    set(state => {
      localStorage.setItem('id', userId);
      return { profileData: { ...state.profileData, userId } };
    }),
  setProfileData: profileData =>
    set(state => ({
      profileData: { ...state.profileData, ...profileData },
    })),
}));
