import clsx from 'clsx';

export const SignUpStepController = ({
  setSignUpStep,
  signUpStep,
}: {
  setSignUpStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  signUpStep: 1 | 2 | 3;
}) => {
  return (
    <>
      <div className="w-full justify-center items-center flex gap-1 mt-auto">
        <button
          onClick={() => setSignUpStep(1)}
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 1 ? 'bg-slate-950' : 'bg-white'
          )}
        ></button>
        <button
          onClick={() => setSignUpStep(2)}
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 2 ? 'bg-slate-950' : 'bg-white'
          )}
        ></button>
        <button
          onClick={() => setSignUpStep(3)}
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 3 ? 'bg-slate-950' : 'bg-white'
          )}
        ></button>
      </div>
    </>
  );
};
