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
import { Form } from '@/shared/ui/form.tsx';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formSchema } from '../types';
import { useAuthStore } from '@/app/store';
import axios, { AxiosResponse } from 'axios';
import { useProfileStore } from '@/app/store';

type ResponseData = {
  role: 'business' | 'users';
  id: string;
};

// TODO: move state logic to slice
// TODO: merge sign in and sign up auth logic
// TODO: fix navigate issues
export const SignInForm = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const { profileData, setRole, setUserId } = useProfileStore();
  const [responseData, setResponseData] = useState<ResponseData>({
    role: 'users',
    id: '',
  });
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
      .post<ResponseData>('https://backendhackaton.onrender.com/login', data)
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200) {
          setResponseData(response.data);
          setLoginStageState('success');
        } else {
          setLoginStageState('error');
          setResponseData({ role: 'users', id: '' });
          toast('Something went wrong');
        }
      })
      .catch(error => {
        toast('Something went wrong');
        console.error(error);
        setResponseData({ role: 'users', id: '' });
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
    if (loginStage !== 'success') return;

    const timeout = setTimeout(() => {
      setIsLoggedIn(true);
      setRole(responseData.role);
      setUserId(responseData.id);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    loginStage,
    navigate,
    setIsLoggedIn,
    profileData.role,
    setRole,
    responseData.role,
    responseData.id,
    setUserId,
  ]);

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
