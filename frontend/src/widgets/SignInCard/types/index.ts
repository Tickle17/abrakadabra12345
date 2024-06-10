import { z as zod } from 'zod';

export const formSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: 'Password is too short' })
    .regex(/\d/)
    .max(20)
    .refine(password => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(password => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(password => /\d/.test(password), {
      message: 'Password must contain at least one digit',
    })
    .refine(
      password => /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password),
      {
        message: 'Password must contain at least one special character',
      }
    )
    .refine(password => !/\s/.test(password), {
      message: 'Password cannot contain spaces',
    }),
});
