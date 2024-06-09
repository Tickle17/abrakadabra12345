import { Input, Checkbox } from '@/shared/ui';
import { FormField, FormItem, FormLabel, FormControl } from '@/shared/ui/form';
import clsx from 'clsx';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

export const PasswordController = ({
  form,
}: {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    unknown,
    undefined
  >;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-950 text-sm font-light">
                Password
              </FormLabel>
              <FormControl>
                <div
                  className={clsx(
                    'flex items-center gap-1 border rounded-md',
                    form.formState.errors.password?.message
                      ? 'border-red-700'
                      : 'border-slate-950'
                  )}
                >
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your password"
                    {...field}
                  />
                  {showPassword && (
                    <EyeClosedIcon
                      onClick={() => setShowPassword(false)}
                      className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                    />
                  )}
                  {!showPassword && (
                    <EyeOpenIcon
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all"
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Checkbox defaultChecked className="w-4 h-4 rounded-[2px]" />
          <p className="text-slate-950 text-xs font-light">Remember me</p>
        </div>
        <p className="text-slate-950 text-xs font-thin hover:cursor-pointer hover:underline transition-all">
          Forgot password?
        </p>
      </div>
    </div>
  );
};
