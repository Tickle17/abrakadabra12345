import { z } from 'zod';

// TODO finish validation
export const formSchema = z.object({
  duration: z.string().refine(value => /^[1-9]\d*$/.test(value), {
    message:
      'Duration must contain only numbers and first symbol must not be 0',
  }),
  freeTime: z.string().refine(value => /^[1-9]\d*$/.test(value), {
    message:
      'freeTime must contain only numbers and first symbol must not be 0',
  }),
  dayStart: z
    .string()
    .refine(value => /^\d{2}:\d{2}$/.test(value), {
      message: 'Day start must be in format HH:MM',
    })
    .refine(value => /^[1-9]\d{1}:\d{2}$/.test(value), {
      message:
        'Day start must contain only numbers and first two symbols must not be 0',
    }),
  dayEnd: z
    .string()
    .refine(value => /^\d{2}:\d{2}$/.test(value), {
      message: 'Day start must be in format HH:MM',
    })
    .refine(value => /^[1-9]\d{1}:\d{2}$/.test(value), {
      message:
        'Day start must contain only numbers and first two symbols must not be 0',
    }),
  maxReservDays: z
    .string()
    .max(10)
    .refine(value => /^[1-9]\d*$/.test(value), {
      message:
        'maxReservedDays must contain only numbers and first symbol must not be 0',
    }),
  MONDAY: z.boolean(),
  TUESDAY: z.boolean(),
  WEDNESDAY: z.boolean(),
  THURSDAY: z.boolean(),
  FRIDAY: z.boolean(),
  SATURDAY: z.boolean(),
  SUNDAY: z.boolean(),
  businessId: z.string().uuid(),
});

export type FormValues = z.infer<typeof formSchema>;
