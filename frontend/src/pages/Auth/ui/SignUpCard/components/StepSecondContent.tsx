import { useAuthStore, useProfileStore } from '@/app/store';
import { Input } from '@/shared/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckIcon,
  Cross1Icon,
  EyeClosedIcon,
  EyeOpenIcon,
  VercelLogoIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z as zod } from 'zod';
import axios, { AxiosResponse } from 'axios';

export const formSchema = zod
  .object({
    password: zod
      .string()
      .min(8, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .refine(password => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine(password => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter',
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
    passwordCopy: zod.string(),
  })
  .superRefine((data, context) => {
    if (data.password !== data.passwordCopy) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['passwordCopy'],
        message: 'Passwords do not match',
      });
    }
  });

export const StepSecondContent = ({
  visible,
  setSignUpStep,
}: {
  visible: boolean;
  setSignUpStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) => {
  const { setRole, setUserId } = useProfileStore();
  const [authStage, setAuthStageState] = useState<
    'initial' | 'loading' | 'success' | 'error'
  >('initial');
  const [showPassword, setShowPassword] = useState(false);
  const { email } = useAuthStore();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordCopy: '',
    },
    mode: 'all',
  });
  const onSubmit = (values: zod.infer<typeof formSchema>) => {
    setAuthStageState('loading');
    const data = {
      login: email,
      password: values.password,
    };

    interface ResponseData {
      id: string;
      role: 'business' | 'users';
    }

    axios
      .post<ResponseData>(
        'https://backendhackaton.onrender.com/users',
        data,
        {}
      )
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200 || response.status === 201) {
          setUserId(response.data.id);
          setRole(response.data.role);
          setAuthStageState('success');
        } else {
          setAuthStageState('error');
          toast('Something went wrong');
        }
      })
      .catch(err => {
        toast('Something went wrong');
        console.error(err);
        setAuthStageState('error');
      });
  };

  useEffect(() => {
    if (authStage === 'success') {
      const timeOut = setTimeout(() => {
        setAuthStageState('initial');
        setSignUpStep(3);
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [authStage, setSignUpStep]);

  return (
    <>
      {visible && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center"
          >
            <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-2">
              <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-2">
                <div className="w-full flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-950 text-sm font-light">
                          Password
                        </FormLabel>
                        <div
                          className={clsx(
                            'flex items-center gap-1 border rounded-md',
                            form.formState.errors.password
                              ? 'border-red-500'
                              : 'border-slate-950'
                          )}
                        >
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                              className="w-full h-11 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Enter your password"
                            />
                          </FormControl>
                          {showPassword && (
                            <EyeClosedIcon
                              onClick={() => setShowPassword(false)}
                              className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                            />
                          )}
                          {!showPassword && (
                            <EyeOpenIcon
                              onClick={() => {
                                setShowPassword(true);
                              }}
                              className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                            />
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="passwordCopy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-950 text-sm font-light">
                            Repeat password
                          </FormLabel>
                          <div
                            className={clsx(
                              'flex items-center gap-1 border rounded-md',
                              form.formState.errors.passwordCopy
                                ? 'border-red-500'
                                : 'border-slate-950'
                            )}
                          >
                            <FormControl>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                                className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder="Repeat your password"
                              />
                            </FormControl>
                            {showPassword && (
                              <EyeClosedIcon
                                onClick={() => setShowPassword(false)}
                                className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                              />
                            )}
                            {!showPassword && (
                              <EyeOpenIcon
                                onClick={() => {
                                  setShowPassword(true);
                                }}
                                className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                              />
                            )}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-start items-center">
                    <p className="text-slate-950 text-xs font-thin">
                      8 characters & 1 uppercase & 1 number & 1 special
                      character
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {visible && (
              <button
                type="submit"
                className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all mb-3 shrink-0"
              >
                {authStage === 'success' && (
                  <CheckIcon className="w-5 h-5 mx-auto" />
                )}
                {authStage === 'error' && (
                  <Cross1Icon className="w-5 h-5 mx-auto" />
                )}
                {authStage === 'loading' && (
                  <VercelLogoIcon className="animate-spin w-5 h-5 mx-auto" />
                )}
                {authStage === 'initial' && 'Sign in'}
              </button>
            )}
          </form>
        </Form>
      )}
    </>
  );
};
