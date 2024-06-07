import { useState } from 'react';
import {
  AnimationWrapper,
  CardHeader,
  StepFirstContent,
  StepSecondContent,
  StepThirdContent,
  FormButton,
  ChangeAuthStageButton,
  SignUpStepController,
} from './components';

export const SignUpCard = ({
  visible,
  setAuthStage,
}: {
  visible: boolean;
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const [signUpStep, setSignUpStep] = useState<1 | 2 | 3>(1);
  return (
    <AnimationWrapper visible={visible}>
      <CardHeader signUpStep={signUpStep} />
      <StepFirstContent visible={signUpStep === 1} />
      <StepSecondContent visible={signUpStep === 2} />
      <StepThirdContent visible={signUpStep === 3} />

      <div className="w-full h-[125px] flex-shrink-0 flex flex-col gap-3">
        <FormButton signUpStep={signUpStep} setSignUpStep={setSignUpStep} />
        <ChangeAuthStageButton
          signUpStep={signUpStep}
          setAuthStage={setAuthStage}
        />
        <SignUpStepController
          signUpStep={signUpStep}
          setSignUpStep={setSignUpStep}
        />
      </div>
    </AnimationWrapper>
  );
};
