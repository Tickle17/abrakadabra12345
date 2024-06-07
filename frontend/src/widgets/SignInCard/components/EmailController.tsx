import { Input } from '@/shared/ui';

export const EmailController = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-slate-950 text-sm font-light">Email</p>
      <Input
        className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Enter your email"
      />
    </div>
  );
};
