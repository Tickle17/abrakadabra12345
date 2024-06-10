import { AnimationWrapper, CardHeader } from './components';
import { SignInForm } from './widgets';

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
