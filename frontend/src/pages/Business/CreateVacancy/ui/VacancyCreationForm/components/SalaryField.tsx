import { FormField, FormItem, Input } from '@/shared/ui';
import { SketchLogoIcon } from '@radix-ui/react-icons';
import { Control, FieldErrors } from 'react-hook-form';
import { stepFirstValues } from '../schema.ts';

export const SalaryField = ({
  control,
  errors,
}: {
  control: Control<stepFirstValues>;
  errors: FieldErrors;
}) => {
  console.log(errors);
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
      <div className="shrink-0 max-w-[60%] md:max-w-[175px] flex flex-col gap-1">
        <h2 className="text-slate-950 font-light text-md">Оплата</h2>
        <p className="text-slate-950 font-thin text-xs">
          Пожалуйста, укажите минимальное и максимальную оплату по вакансии
          (этот шаг можно пропустить)
        </p>
      </div>
      <div className="shrink-1 flex-grow grid grid-cols-2 gap-2">
        <FormField
          name="salaryMin"
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className="border md:border-0 md:border-b border-slate-950 rounded-[2px] md:rounded-none h-fit  flex items-center gap-1 pl-1 flex-grow shrink-0">
                <SketchLogoIcon className="w-5 h-5" />
                <span className="text-slate-950 text-xs font-thin">от</span>
                <Input
                  {...field}
                  value={field.value !== null ? field.value : ''}
                  onChange={e =>
                    field.onChange(
                      !isNaN(Number(e.target.value)) ? e.target.value : 0
                    )
                  }
                  placeholder="e.g. 1000"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs pl-0"
                />
              </div>
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="salaryMax"
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className="border md:border-0 md:border-b border-slate-950 rounded-[2px] md:rounded-none h-fit  flex items-center gap-1 pl-1 flex-grow shrink-0">
                <SketchLogoIcon className="w-5 h-5" />
                <span className="text-slate-950 text-xs font-thin">до</span>
                <Input
                  {...field}
                  onChange={e =>
                    field.onChange(
                      !isNaN(Number(e.target.value)) ? e.target.value : 0
                    )
                  }
                  placeholder="e.g. 2000"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs pl-0"
                />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
