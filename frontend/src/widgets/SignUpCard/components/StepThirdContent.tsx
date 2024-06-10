import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export const StepThirdContent = ({ visible }: { visible: boolean }) => {
  const navigate = useNavigate();
  return (
    <>
      {visible && (
        <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
          <CheckCircledIcon
            onClick={() => navigate('/')}
            className="w-10 h-10 text-slate-950 scale-150"
          />
        </div>
      )}
    </>
  );
};
