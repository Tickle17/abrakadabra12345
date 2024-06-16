export const ChangeAuthStageButton = ({
  signUpStep,
  setAuthStage,
  setSignUpStep,
}: {
  signUpStep: 1 | 2 | 3;
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
  setSignUpStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) => {
  const handleClick = () => {
    setSignUpStep(1);
    setAuthStage('signIn');
  };
  return (
    <>
      {signUpStep < 3 && (
        <p className="w-full text-xs font-thin text-slate-950 flex justify-center items-center gap-1">
          Уже есть аккаунт?
          <span
            onClick={() => handleClick()}
            className="text-slate-950 font-semibold hover:cursor-pointer hover:opacity-50 transition-all"
          >
            Войти
          </span>
        </p>
      )}
    </>
  );
};
