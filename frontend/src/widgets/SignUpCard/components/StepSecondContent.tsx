import { Input } from '@/shared/ui';
import { EyeOpenIcon } from '@radix-ui/react-icons';

export const StepSecondContent = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {visible && (
        <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
          <div className="w-full flex flex-col gap-2">
            <p className="text-slate-950 text-sm font-light">Passord</p>
            <div className="flex items-center gap-1 border border-slate-950 rounded-md">
              <Input
                className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your password"
              />
              <EyeOpenIcon className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <p className="text-slate-950 text-sm font-light">
                Repeat password
              </p>
              <div className="flex items-center gap-1 border border-slate-950 rounded-md">
                <Input
                  className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Repeat your password"
                />
                <EyeOpenIcon className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all" />
              </div>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-slate-950 text-xs font-thin">
                8 characters & 1 uppercase & 1 number & 1 special character
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
