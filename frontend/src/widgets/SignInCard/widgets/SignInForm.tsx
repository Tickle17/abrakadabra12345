import {
  EmailController,
  PasswordController,
  SignInControlls,
  SubmitButton,
} from '../components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { Form } from '@/shared/ui/form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formSchema } from '../types';
import { useAuthStore } from '@/app/store';
import axios from 'axios';

export const SignInForm = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const [userRole, setUserRole] = useState<undefined | 'Admin' | 'User'>();
  const [loginStage, setLoginStageState] = useState<
    'none' | 'loading' | 'success' | 'error'
  >('none');
  const { setIsLoggedIn } = useAuthStore();
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

    const { email, password } = values;
    const data = { login: email, password };

    axios
      .post('https://backendhackaton.onrender.com/login', data)
      .then(response => {
        setLoginStageState(response.status === 200 ? 'success' : 'error');
        response.status === 200 && setUserRole(response.data.role);
      })
      .catch(error => {
        toast('Something went wrong');
        console.error(error);
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

  useEffect(() => {
    if (loginStage === 'success') {
      const timeout = setTimeout(() => {
        setIsLoggedIn(true);
        userRole === 'Admin' ? navigate('/admin') : navigate('/');
        localStorage.setItem('token', 'true');
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

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