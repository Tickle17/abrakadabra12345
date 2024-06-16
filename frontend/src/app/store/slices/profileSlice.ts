import { create } from 'zustand';

export type ProfileState = {
  fullName: string;
  role: 'business' | 'users' | '';
  photoUrl: string;
  age: number;
  stackTech: string;
  gitlabUrl: string;
  aboutUser: string;
  targetsInfo: string;
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

type DayOfWeekType = {
  day:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  isWorking: boolean;
};

type TCalendarPreferences = {
  duration: number;
  freeTime: number;
  dayStart: number;
  dayEnd: number;
  workingDays: DayOfWeekType[];
};

export type ProfileStore = {
  profileData: ProfileState;
  calendarid: string | null;
  calendarPreferences: TCalendarPreferences;
  setCalendarPreferences: (calendarPreferences: TCalendarPreferences) => void;
  getCalendarPreferences: () => TCalendarPreferences;
  setCalendarId: (calendarId: string | null) => void;
  setRole: (role: 'business' | 'users') => void;
  setUserId: (userId: string) => void;
  setProfileData: (profileData: Partial<ProfileState>) => void;
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profileData: {
    id: '',
    role: '',
    fullName: '',
    photoUrl: '',
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
  calendarid: null,
  calendarPreferences: {
    duration: 0,
    freeTime: 0,
    dayStart: 0,
    dayEnd: 0,
    workingDays: [
      {
        day: 'MONDAY',
        isWorking: true,
      },
      {
        day: 'TUESDAY',
        isWorking: true,
      },
      {
        day: 'WEDNESDAY',
        isWorking: true,
      },
      {
        day: 'THURSDAY',
        isWorking: true,
      },
      {
        day: 'FRIDAY',
        isWorking: true,
      },
      {
        day: 'SATURDAY',
        isWorking: true,
      },
      {
        day: 'SUNDAY',
        isWorking: true,
      },
    ],
  },
  setCalendarPreferences: calendarPreferences =>
    set(state => ({
      calendarPreferences: {
        ...state.calendarPreferences,
        ...calendarPreferences,
      },
    })),
  getCalendarPreferences: () => get().calendarPreferences,
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
