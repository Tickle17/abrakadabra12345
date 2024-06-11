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
      <StepFirstContent
        visible={signUpStep === 1}
        setSignUpStep={setSignUpStep}
      />
      <StepSecondContent
        visible={signUpStep === 2}
        setSignUpStep={setSignUpStep}
      />
      <StepThirdContent visible={signUpStep === 3} />

      <div className="w-full h-[75px] flex-shrink-0 flex flex-col gap-3">
        <ChangeAuthStageButton
          signUpStep={signUpStep}
          setAuthStage={setAuthStage}
          setSignUpStep={setSignUpStep}
        />
        <SignUpStepController
          signUpStep={signUpStep}
          setSignUpStep={setSignUpStep}
        />
      </div>
    </AnimationWrapper>
  );
};
