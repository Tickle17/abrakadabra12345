import {
  AnimationWrapper,
  CardHeader,
  EmailController,
  PasswordController,
  SignInControlls,
  SubmitButton,
} from './components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { Form } from '@/shared/ui/form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const formSchema = zod.object({
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

export const SignInForm = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const [loginStage, setLoginStageState] = useState<
    'none' | 'loading' | 'success' | 'error'
  >('none');
  const navigate = useNavigate();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    if (loginStage !== 'none') return;

    setLoginStageState('loading');
    fetch('https://backendhackaton.onrender.com/login', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(res => {
        res.ok &&
          res.json().then(data => {
            localStorage.setItem('token', data);
          });

        setLoginStageState(res.ok ? 'success' : 'error');
        if (res.ok) {
          navigate('/');
        }
        if (!res.ok) {
          toast('Something went wrong');
        }
      })
      .catch(err => {
        toast('Something went wrong');
        console.error(err);
        setLoginStageState('error');
      });
  }

  useEffect(() => {
    if (loginStage === 'error') {
      const timeout = setTimeout(() => {
        setLoginStageState('none');
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loginStage, setAuthStage]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col"
      >
        <div className="w-full flex-grow flex-shrink-1 flex flex-col justify-center items-center gap-2">
          <EmailController form={form} />
          <PasswordController form={form} />
        </div>
        <div className="w-full h-[125px] flex-shrink-0 flex flex-col gap-3">
          <SubmitButton loginStage={loginStage} />
          <SignInControlls setAuthStage={setAuthStage} />
        </div>
      </form>
    </Form>
  );
};

export const SignInCard = ({
  visible,
  setAuthStage,
}: {
  visible: boolean;
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  return (
    <AnimationWrapper visible={visible}>
      <CardHeader />
      <SignInForm setAuthStage={setAuthStage} />
    </AnimationWrapper>
  );
};
