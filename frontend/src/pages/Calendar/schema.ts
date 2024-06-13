import { z } from 'zod';
// import { DayOfWeek } from './types';

// const MyObjectSchema = z.object({
//   day: z.nativeEnum(DayOfWeek),
//   isWorking: z.boolean(),
// });

export const formSchema = z.object({
  duration: z.string().nullable(),
  freeTime: z.string().nullable(),
  dayStart: z.string().nullable(),
  dayEnd: z.string().nullable(),
  //maxReservDays: z.array(MyObjectSchema),
  //maxReservDays: z.nativeEnum(DayOfWeek),
  MONDAY: z.boolean().nullable(),
  TUESDAY: z.boolean().nullable(),
  WEDNESDAY: z.boolean().nullable(),
  THURSDAY: z.boolean().nullable(),
  FRIDAY: z.boolean().nullable(),
  SATURDAY: z.boolean().nullable(),
  SUNDAY: z.boolean().nullable(),
  workingDays: z.string().nullable(),
  businessId: z.string().uuid(),
});

export type FormValues = z.infer<typeof formSchema>;
