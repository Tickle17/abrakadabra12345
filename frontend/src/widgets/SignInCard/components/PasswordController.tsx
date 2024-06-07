import { Input, Checkbox } from '@/shared/ui';
import { EyeIcon } from 'lucide-react';

export const PasswordController = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <p className="text-slate-950 text-sm font-light">Password</p>
        <div className="flex items-center gap-1 border border-slate-950 rounded-md">
          <Input
            className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter your password"
          />
          <EyeIcon className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Checkbox className="w-4 h-4 rounded-[2px]" />
          <p className="text-slate-950 text-xs font-light">Remember me</p>
        </div>
        <p className="text-slate-950 text-xs font-thin">Forgot password?</p>
      </div>
    </div>
  );
};
