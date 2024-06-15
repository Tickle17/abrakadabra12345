import { useAuthStore } from '@/app/store';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export const StepThirdContent = ({ visible }: { visible: boolean }) => {
  const navigate = useNavigate();
  const { email, username, setIsLoggedIn } = useAuthStore();
  return (
    <>
      {visible && (
        <>
          <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-start gap-7 px-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-thin text-slate-950">
                  Account created
                </h3>
                <CheckCircledIcon className="w-6 h-6 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-md font-light text-slate-950">{email}</p>
                <p className="font-light text-slate-950">{`@${username}`}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center shrink-0">
            <button
              onClick={() => {
                setIsLoggedIn(true);
                navigate('/profile');
              }}
              className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all shrink-0"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </>
  );
};
