import {
  AnimationWrapper,
  CardHeader,
  EmailController,
  PasswordController,
  SubmitButton,
  SignInControlls,
} from './components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { Form } from '@/shared/ui/form';

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, { message: 'Password is too short' }),
});

export const SignInForm = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const navigate = useNavigate();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    fetch('https://backendhackaton.onrender.com/login', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(res => {
        res.ok &&
          res.json().then(data => {
            localStorage.setItem('token', data);
          });
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col gap-2"
      >
        <div className="w-full flex-grow flex-shrink-1 flex flex-col justify-center items-center gap-7">
          <EmailController form={form} />
          <PasswordController form={form} />
        </div>
        <div className="w-full h-[125px] flex-shrink-0 flex flex-col gap-3">
          <SubmitButton />
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
