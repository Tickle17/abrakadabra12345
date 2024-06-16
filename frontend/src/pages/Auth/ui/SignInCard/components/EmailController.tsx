import { Input } from '@/shared/ui';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form.tsx';
import clsx from 'clsx';
import { UseFormReturn } from 'react-hook-form';

export const EmailController = ({
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
  return (
    <div className="w-full flex flex-col gap-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-950 text-sm font-light">
              Email
            </FormLabel>
            <FormControl>
              <Input
                className={clsx(
                  'w-full h-11 border focus-visible:ring-0 focus-visible:ring-offset-0',
                  form.formState.errors.email?.message
                    ? 'border-red-700'
                    : 'border-slate-950'
                )}
                placeholder="Введите имейл"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
