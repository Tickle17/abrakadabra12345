import { Input } from '@/shared/ui';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/shared/ui/form';
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
      {/*}p className="text-slate-950 text-sm font-light">Email</p>*/}
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
                className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {form.formState.errors.email?.message}
            </FormDescription>
          </FormItem>
        )}
      />
      {/*
      <Input
        className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Enter your email"
      /> */}
    </div>
  );
};
