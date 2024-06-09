import {
  AnimationWrapper,
  CardHeader,
  EmailController,
  PasswordController,
  SubmitButton,
  SignInControlls,
} from './components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { Form } from '@/shared/ui/form';

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: 'Password is too short' })
    .includes(' ', { message: 'Password must not contain spaces' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character',
    })
    .max(20, { message: 'Password is too long' }),
});

export const SignInForm = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(res => {
        res.ok &&
          res.json().then(data => {
            localStorage.setItem('token', data);
          });
        window.location.reload();
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
