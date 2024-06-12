import { z } from 'zod';

const hardSkillsSchema = z.array(
  z.enum(['next.js', 'svelte', 'vue', 'solid', 'astro'])
);
const softSkillsSchema = z.array(
  z.enum([
    'communication',
    'problem_solving',
    'teamwork',
    'adaptability',
    'time_management',
  ])
);
const workFormatSchema = z.array(
  z.enum([
    'full-time',
    'part-time',
    'remote',
    'freelance',
    'intership',
    'contract',
  ])
);

export const formSchema = z.object({
  status: z.string().nullable(),
  position: z.string().nullable(),
  workFormat: z.string().nullable(),
  specialization: z.string().nullable(),
  experience: z.string().nullable(),
  vacancy: z.string().nullable(),
  address: z.string().nullable(),
  businessId: z.string().uuid(),
  calendarId: z.string().uuid(),
});

export type FormValues = z.infer<typeof formSchema>;

export const stepFirstSchema = z
  .object({
    position: z.string().min(5, { message: 'Too short' }),
    workFormat: workFormatSchema.nullable(),
    salaryMin: z.number(),
    salaryMax: z.number(),
    softSkills: softSkillsSchema.nullable(),
    hardSkills: hardSkillsSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.salaryMin > data.salaryMax) {
      ctx.addIssue({
        code: 'custom',
        message: 'Salary min is greater than salary max',
        path: ['salaryMax'],
      });
    }
  });

export type stepFirstValues = z.infer<typeof stepFirstSchema>;

export const stepSecondSchema = z.object({
  description: z.string().min(10, { message: 'Too short' }),
  requirements: z.string().min(10, { message: 'Too short' }),
  idealCandidate: z.string().min(10, { message: 'Too short' }),
});

export type stepSecondValues = z.infer<typeof stepSecondSchema>;
