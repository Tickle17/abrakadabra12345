import {
  AnimationWrapper,
  CardHeader,
  EmailController,
  PasswordController,
  SubmitButton,
  SignInControlls,
} from './components';

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
      <div className="w-full flex-grow flex-shrink-1 flex flex-col justify-center items-center gap-7">
        <EmailController />
        <PasswordController />
      </div>
      <div className="w-full h-[125px] flex-shrink-0 flex flex-col gap-3">
        <SubmitButton />
        <SignInControlls setAuthStage={setAuthStage} />
      </div>
    </AnimationWrapper>
  );
};
