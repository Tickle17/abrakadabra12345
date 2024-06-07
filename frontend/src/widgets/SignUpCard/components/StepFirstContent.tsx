import { Input } from '@/shared/ui';

export const StepFirstContent = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {visible && (
        <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
          <div className="w-full flex flex-col gap-2">
            <p className="text-slate-950 text-sm font-light">Email</p>
            <Input
              className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <p className="text-slate-950 text-sm font-light">Username</p>
              <Input
                className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex justify-end items-center">
              <p className="text-slate-950 text-xs font-thin">
                Can I change it later?
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
