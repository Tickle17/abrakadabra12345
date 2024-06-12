import { z } from 'zod';
import { HardSkills, SoftSkills } from './types';

export const formSchema = z.object({
  status: z.string().nullable(),
  position: z.string().nullable(),
  workFormat: z.string().nullable(),
  specialization: z.string().nullable(),
  experience: z.string().nullable(),
  vacancy: z.string().nullable(),
  address: z.string().nullable(),
  softSkills: z.array(z.nativeEnum(SoftSkills)).nullable(),
  hardSkills: z.array(z.nativeEnum(HardSkills)).nullable(),
  businessId: z.string().uuid(),
  calendarId: z.string().uuid(),
});

export type FormValues = z.infer<typeof formSchema>;
