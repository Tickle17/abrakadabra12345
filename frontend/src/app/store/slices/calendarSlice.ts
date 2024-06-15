import { create } from 'zustand';

export type TDay = {
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

export type TCalendarStore = {
  id: string;
  duration: number; // длительность одного собеседования в часах
  freeTime: number; // время отдыха между собеседованиями
  dayStart: number; // начало рабочего дня
  dayEnd: number; // конец рабочего дня
  slots: number; // кол-во слотов в день
  maxReserveDays: number;
  workingDays: TDay[]; // дни недели
  setDuration: (duration: number) => void;
  setFreeTime: (freeTime: number) => void;
  setDayStart: (dayStart: number) => void;
  setDayEnd: (dayEnd: number) => void;
  setSlots: (slots: number) => void;
  setDayOfWeek: (dayOfWeek: TDay[]) => void;
};

// TODO: merge getLoggedInToken and getUserId
export const useCalendarSlice = create<TCalendarStore>(set => ({
  id: '',
  duration: 0,
  freeTime: 0,
  dayStart: 0,
  dayEnd: 0,
  slots: 0,
  maxReserveDays: 0,

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
      isWorking: false,
    },
    {
      day: 'SUNDAY',
      isWorking: false,
    },
  ],
  setDuration: duration => set({ duration }),
  setFreeTime: freeTime => set({ freeTime }),
  setDayStart: dayStart => set({ dayStart }),
  setDayEnd: dayEnd => set({ dayEnd }),
  setSlots: slots => set({ slots }),
  setDayOfWeek: workingDays =>
    set({
      workingDays,
    }),
}));
