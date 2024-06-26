import { FormField, FormItem, Input } from '@/shared/ui';
import { Control, FieldErrors } from 'react-hook-form';
import { stepFirstValues } from '../schema.ts';

export const PositionField = ({
  control,
  errors,
}: {
  control: Control<stepFirstValues>;
  errors: FieldErrors;
}) => {
  return (
    <FormField
      name="position"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <div className="shrink-0 md:max-w-[175px]">
              <h2 className="text-slate-950 font-light text-md">
                Название вакансииe
              </h2>
              <p className="text-slate-950 font-thin text-xs">
                Укажите соответствующее название вакансии
              </p>
            </div>
            <div className="shrink-1 flex-grow flex flex-col gap-1">
              <Input
                {...field}
                type="text"
                placeholder="Веб разработчик"
                className="md:border-0 md:border-b border-slate-950 rounded-[2px] md:rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
              />
              <span className="text-slate-950 text-xs font-thin">
                Не меньше 5 символов
              </span>
            </div>
            {errors.position && (
              <p className="text-red-500 text-xs font-thin">
                {errors.position.message as string}
              </p>
            )}
          </div>
        </FormItem>
      )}
    ></FormField>
  );
};
