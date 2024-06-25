export const SignInControlls = ({
  setAuthStage,
}: {
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  return (
    <p className="w-full text-xs font-thin text-slate-950 flex justify-center items-center gap-1">
      Нет аккаунта?
      <span
        className="text-slate-950 font-semibold hover:cursor-pointer hover:opacity-50 transition-all"
        onClick={() => setAuthStage('signUp')}
      >
        Зарегистрироваться
      </span>
    </p>
  );
};
