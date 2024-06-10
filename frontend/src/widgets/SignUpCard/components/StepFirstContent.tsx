import { useAuthStore } from '@/app/store';
import { Input } from '@/shared/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

export const formSchema = zod.object({
  email: zod.string().email(),
  username: zod
    .string()
    .min(4, { message: 'Username is too short' })
    .max(12)
    .refine(password => /[a-z]/.test(password), {
      message: 'Username must contain at least one lowercase letter',
    })
    .refine(
      password => !/[ `!@#$%^&*()+\-=[\]{};':"\\|,.<>/?~]/.test(password),
      {
        message: 'Username must not contain special characters',
      }
    )
    .refine(password => !/\s/.test(password), {
      message: 'Username must not contain spaces',
    }),
});

export const StepFirstContent = ({
  visible,
  setSignUpStep,
}: {
  visible: boolean;
  setSignUpStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) => {
  const { setEmail, setUsername } = useAuthStore();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
    },
    mode: 'all',
  });
  const onSubmit = (values: zod.infer<typeof formSchema>) => {
    console.log(values);
    setEmail(values.email);
    setUsername(values.username);
    setSignUpStep(2);
  };
  return (
    <>
      {visible && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center"
          >
            <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-2">
              <div className="w-full flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-950 text-sm font-light">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={clsx(
                            'w-full h-11 border focus-visible:ring-0 focus-visible:ring-offset-0',
                            form.formState.errors.email?.message
                              ? 'border-red-700'
                              : 'border-slate-950'
                          )}
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-950 text-sm font-light">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={clsx(
                              'w-full h-11 border focus-visible:ring-0 focus-visible:ring-offset-0',
                              form.formState.errors.username?.message
                                ? 'border-red-700'
                                : 'border-slate-950'
                            )}
                            placeholder="Enter your usrname"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <p className="text-slate-950 text-xs font-thin">
                    Can I change it later?
                  </p>
                </div>
              </div>
            </div>
            {visible && (
              <button
                type="submit"
                className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all mb-3 shrink-0"
              >
                Next
              </button>
            )}
          </form>
        </Form>
      )}
    </>
  );
};
