import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import { CheckCircledIcon } from '@radix-ui/react-icons';

export const StepThirdContent = ({ visible }: { visible: boolean }) => {
  const [width, height] = useWindowSize();
  return (
    <>
      {visible && (
        <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
          <Confetti width={width} height={height} />
          <CheckCircledIcon className="w-10 h-10 text-slate-950 scale-150" />
        </div>
      )}
    </>
  );
};
