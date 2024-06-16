import { create } from 'zustand';

export type ProfileState = {
  id: string;
  login: string;
  password: string;
  fullName: string;
  photoUrl: string;
  companyURL: string;
  description: string;
  calendarId: string | null;
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

// TODO: remove setCalendarID, getCalendarPreferences, setCalendarPreferences
export type ProfileBusinessStore = {
  businessProfileData: ProfileState;
  calendarPreferences: TCalendarPreferences;
  setCalendarPreferences: (calendarPreferences: TCalendarPreferences) => void;
  getCalendarPreferences: () => TCalendarPreferences;
  setCalendarId: (calendarId: string | null) => void;
  setBusinessProfileData: (profileData: Partial<ProfileState>) => void;
  getBusinessProfileData: () => ProfileState;
};

export const useBusinessProfileStore = create<ProfileBusinessStore>(
  (set, get) => ({
    businessProfileData: {
      id: '',
      fullName: '',
      photoUrl: '',
      companyURL: '',
      description: '',
      calendarId: null,
      login: '',
      password: '',
    },
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
    getBusinessProfileData: () => get().businessProfileData,
    setCalendarPreferences: calendarPreferences =>
      set(state => ({
        calendarPreferences: {
          ...state.calendarPreferences,
          ...calendarPreferences,
        },
      })),
    getCalendarPreferences: () => get().calendarPreferences,
    setCalendarId: calendarId => {
      set({
        businessProfileData: { ...get().businessProfileData, calendarId },
      });
    },
    setBusinessProfileData: profileData =>
      set(state => ({
        businessProfileData: { ...state.businessProfileData, ...profileData },
      })),
  })
);
