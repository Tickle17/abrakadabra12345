import { workFormatItems } from '@/shared/consts';
import { FormField, FormItem } from '@/shared/ui';
import { Checkbox } from '@/shared/ui';
import { stepFirstValues } from '../schema';
import { useForm, Control, FieldErrors } from 'react-hook-form';

export const WorkFormatField = ({
  form,
  control,
  errors,
}: {
  form: ReturnType<typeof useForm<stepFirstValues>>;
  control: Control<stepFirstValues>;
  errors: FieldErrors;
}) => {
  console.log(errors);
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
      <div className="shrink-0 md:max-w-[175px] flex flex-col gap-1">
        <h2 className="text-slate-950 font-light text-md">
          Type of Employment
        </h2>
        <p className="text-slate-950 font-thin text-xs">
          You can select multiple types of employment
        </p>
      </div>
      <div className="shrink-1 flex-grow grid grid-rows-2 grid-cols-3 gap-2">
        {workFormatItems.map((item, index) => {
          return (
            <FormField
              key={index}
              name="workFormat"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex items-center gap-1">
                    <p className="text-slate-950 text-xs font-extralight">
                      {item}
                    </p>
                    <Checkbox
                      checked={
                        form.getValues().workFormat?.includes(item)
                          ? true
                          : false
                      }
                      onCheckedChange={checked => {
                        switch (checked) {
                          case true:
                            field.onChange([...(field.value || []), item]);
                            break;
                          case false:
                            field.onChange(
                              field.value?.filter(v => v !== item)
                            );
                            break;
                        }
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
