import { AuthLayout } from '@/shared/layouts';
import { useState } from 'react';
import { AuthLogo, SignInCard, SignUpCard } from '@/widgets';

export const AuthPage = () => {
  const [authStage, setAuthStage] = useState<'signIn' | 'signUp'>('signIn');
  return (
    <AuthLayout>
      <div className="flex flex-col w-full max-w-[500px] h-full max-h-[675px]">
        <SignInCard
          visible={authStage === 'signIn'}
          setAuthStage={setAuthStage}
        />
        <SignUpCard
          visible={authStage === 'signUp'}
          setAuthStage={setAuthStage}
        />
      </div>
      <AuthLogo />
    </AuthLayout>
  );
};
