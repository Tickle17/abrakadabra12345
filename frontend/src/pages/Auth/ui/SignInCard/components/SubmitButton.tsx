import { CheckIcon, Cross1Icon, VercelLogoIcon } from '@radix-ui/react-icons';
export const SubmitButton = ({
  loginStage,
}: {
  loginStage: 'none' | 'loading' | 'success' | 'error';
}) => {
  return (
    <button className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all text-center">
      {loginStage === 'success' && <CheckIcon className="w-5 h-5 mx-auto" />}
      {loginStage === 'error' && <Cross1Icon className="w-5 h-5 mx-auto" />}
      {loginStage === 'loading' && (
        <VercelLogoIcon className="animate-spin w-5 h-5 mx-auto" />
      )}
      {loginStage === 'none' && 'Sign in'}
    </button>
  );
};
