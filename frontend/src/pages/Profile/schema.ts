import { z } from 'zod';

export const formSchema = z.object({
  fullName: z.string().min(5, { message: 'Некорректный URL изображения' }),
  photoUrl: z.string().url({ message: 'Некорректный URL изображения' }),
  age: z
    .number()
    .min(0, { message: 'Возраст должен быть положительным числом' }),
  stackTech: z
    .string()
    .nonempty({ message: 'Поле Технологии не должно быть пустым' }),
  gitlabUrl: z.string().url({ message: 'Некорректный URL GitLab' }),
  aboutUser: z
    .string()
    .min(10, { message: 'Поле О себе должно содержать минимум 10 символов' }),
  softSkills: z
    .array(
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
      ]),
      { message: 'Некорректное значение soft skills' }
    )
    .nullable(),
  hardSkills: z
    .array(
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
      ]),
      {
        message: 'Некорректное значение hard skills',
      }
    )
    .nullable(),
});
