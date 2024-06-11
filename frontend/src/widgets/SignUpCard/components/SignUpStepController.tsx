import clsx from 'clsx';

export const SignUpStepController = ({
  signUpStep,
}: {
  signUpStep: 1 | 2 | 3;
}) => {
  return (
    <>
      <div className="w-full justify-center items-center flex gap-1 mt-auto">
        <p
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 1 ? 'bg-slate-950' : 'bg-white'
          )}
        ></p>
        <p
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 2 ? 'bg-slate-950' : 'bg-white'
          )}
        ></p>
        <p
          className={clsx(
            'w-2 h-2 border border-slate-950 rounded-full',
            signUpStep >= 3 ? 'bg-slate-950' : 'bg-white'
          )}
        ></p>
      </div>
    </>
  );
};
