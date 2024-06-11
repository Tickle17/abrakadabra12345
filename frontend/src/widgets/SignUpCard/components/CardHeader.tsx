export const CardHeader = ({ signUpStep }: { signUpStep: 1 | 2 | 3 }) => {
  return (
    <div className="w-full h-[75px] flex flex-col justify-center gap-2 flex-shrink-0">
      {signUpStep < 3 && (
        <h1 className="text-2xl font-light text-slate-950 shrink-0">
          Let&apos;s sign you up!
        </h1>
      )}
      {signUpStep === 3 && (
        <h1 className="text-2xl font-light text-slate-950 flex-shrink-0">
          Congratulations!
        </h1>
      )}
      {signUpStep === 1 && (
        <p className="text-xs font-light text-slate-950 shrink-1 flex-grow">
          You need to enter your email and username to continue
        </p>
      )}
      {signUpStep === 2 && (
        <p className="text-xs font-light text-slate-950 shrink-1 flex-grow">
          You need to create a password to continue
        </p>
      )}
      {signUpStep === 3 && (
        <p className="text-xs font-light text-slate-950 shrink-1 flex-grow">
          You have successfully created your account
        </p>
      )}
    </div>
  );
};
