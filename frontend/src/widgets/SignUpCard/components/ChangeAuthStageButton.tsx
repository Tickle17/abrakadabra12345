export const ChangeAuthStageButton = ({
  signUpStep,
  setAuthStage,
}: {
  signUpStep: 1 | 2 | 3;
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  return (
    <>
      {signUpStep < 3 && (
        <p className="w-full text-xs font-thin text-slate-950 flex justify-center items-center gap-1">
          Already have an account?
          <span
            onClick={() => setAuthStage('signIn')}
            className="text-slate-950 font-semibold hover:cursor-pointer hover:opacity-50 transition-all"
          >
            Sign in
          </span>
        </p>
      )}
    </>
  );
};
