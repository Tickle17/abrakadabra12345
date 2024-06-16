import { Link } from 'react-router-dom';

export const FormButton = ({
  signUpStep,
  setSignUpStep,
}: {
  signUpStep: 1 | 2 | 3;
  setSignUpStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) => {
  return (
    <>
      {' '}
      {signUpStep < 3 && (
        <button
          onClick={() =>
            setSignUpStep(signUpStep => (signUpStep + 1) as 1 | 2 | 3)
          }
          className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all"
        >
          Дальше
        </button>
      )}
      {signUpStep === 3 && (
        <Link
          to="/"
          className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all text-center"
        >
          Finish
        </Link>
      )}
    </>
  );
};
