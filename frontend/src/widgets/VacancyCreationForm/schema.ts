import { z } from 'zod';

const hardSkillsSchema = z.array(
  z.enum([
    'NEXT.JS',
    'SVELTE',
    'VUE',
    'SOLID',
    'ASTRO',
    'REACT',
    'CSS',
    'JS',
    'KOTLIN',
    'HTML',
    'POSTGRESQL',
    'WEBPACK',
    'JAVA',
    'PYTHON',
    'DOCKER',
    'GIT',
    'TYPESCRIPT',
  ])
);
const softSkillsSchema = z.array(
  z.enum([
    'COMMUNICATION',
    'PROBLEM_SOLVING',
    'TEAMWORK',
    'ADAPTABILITY',
    'TIME_MANAGEMENT',
    'STRESS',
    'PRIDE',
    'GREED',
    'WRATH',
    'ENVY',
    'GLUTTONY',
    'SLOTH',
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

// export const formSchema = z.object({
//   status: z.string().nullable(),
//   position: z.string().nullable(),
//   workFormat: z.string().nullable(),
//   specialization: z.string().nullable(),
//   experience: z.string().nullable(),
//   vacancy: z.string().nullable(),
//   address: z.string().nullable(),
//   businessId: z.string().uuid(),
//   calendarId: z.string().uuid(),
// });

// export type FormValues = z.infer<typeof formSchema>;

export const stepFirstSchema = z
  .object({
    position: z.string().min(5, { message: 'Too short' }),
    workFormat: workFormatSchema.nullable(),
    salaryMin: z.number().nonnegative(),
    salaryMax: z.number().nonnegative(),
    softSkills: softSkillsSchema.nullable(),
    hardSkills: hardSkillsSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.salaryMin && data.salaryMax && data.salaryMin > data.salaryMax) {
      ctx.addIssue({
        code: 'custom',
        message: 'Salary min is greater than salary max',
        path: ['salaryMax'],
      });
    }
  });

export const stepSecondSchema = z.object({
  description: z.string().min(10, { message: 'Too short' }),
  requirements: z.string().min(10, { message: 'Too short' }),
  idealCandidate: z.string().min(10, { message: 'Too short' }),
  calendarId: z.string().uuid(),
});

export const stepThirdSchema = z.object({
  businessId: z.string().uuid(),
  calendarId: z.string().uuid(),
});

export type stepFirstValues = z.infer<typeof stepFirstSchema>;
export type stepSecondValues = z.infer<typeof stepSecondSchema>;
export type stepThirdValues = z.infer<typeof stepThirdSchema>;
