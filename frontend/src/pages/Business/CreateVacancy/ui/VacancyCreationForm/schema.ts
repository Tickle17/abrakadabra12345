import { z } from 'zod';

const hardSkillsSchema = z.array(
  z.enum([
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
    'Stress',
    'PRIDE',
    'GREED',
    'WRATH',
    'ENVY',
    'LUST',
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
    salaryMin: z.string().refine(value => /^[1-9]\d*$/.test(value), {
      message:
        'Salary must contain only numbers and first symbol must not be 0',
    }),
    salaryMax: z.string().refine(value => /^[1-9]\d*$/.test(value), {
      message:
        'Salary must contain only numbers and first symbol must not be 0',
    }),
    experience: z.string().refine(value => /^[1-9]\d*$/.test(value), {
      message:
        'Experience must contain only numbers and first symbol must not be 0',
    }),
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
  address: z.string().min(5, { message: 'Too short' }),
  description: z.string().min(10, { message: 'Too short' }),
  requirements: z.string().min(10, { message: 'Too short' }),
  idealCandidate: z.string().min(10, { message: 'Too short' }),
  businessId: z.string(),
});

export const stepThirdSchema = z.object({
  businessId: z.string().uuid(),
  calendarId: z.string().uuid(),
});

export type stepFirstValues = z.infer<typeof stepFirstSchema>;
export type stepSecondValues = z.infer<typeof stepSecondSchema>;
export type stepThirdValues = z.infer<typeof stepThirdSchema>;
