import { softSkillItems } from '@/shared/consts';
import {
  Badge,
  Combobox,
  FormField,
  FormItem,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Control, FieldErrors } from 'react-hook-form';
import { stepFirstValues } from '../schema.ts';

export const SoftSkillsField = ({
  control,
  errors,
}: {
  control: Control<stepFirstValues>;
  errors: FieldErrors;
}) => {
  console.log(errors);
  return (
    <FormField
      name="softSkills"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <div className="shrink-0 max-w-[175px] flex flex-col gap-1">
              <h2 className="text-slate-950 font-light text-md">Soft Skills</h2>
              <p className="text-slate-950 font-thin text-xs">
                Укажите необходимые Soft skills
              </p>
            </div>
            <div className="shrink-1 flex-grow flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Combobox
                  items={softSkillItems}
                  values={field.value || []}
                  setValues={field.onChange}
                  triggerBtnLabel="+ Добавить навыки"
                  searchInputPlaceholder="Поиск по навыкам..."
                  searchEmptyPlaceholder="Навыков не найдено"
                />
                <p className="text-slate-950 font-thin text-xs">
                  {field.value?.length || 0} of {softSkillItems.length}
                </p>
              </div>
              <div className="w-full max-w-[525px] lg:h-[25px]">
                <ScrollArea className="w-full whitespace-nowrap hidden lg:flex">
                  <div className="w-max flex items-center gap-1">
                    {field.value?.map((item, key) => {
                      return (
                        <Badge key={key} className="flex items-center gap-1">
                          {softSkillItems.find(skill => skill.value === item)
                            ?.label || item}
                          <Cross2Icon
                            onClick={() =>
                              field.onChange(
                                field.value?.filter(value => value !== item)
                              )
                            }
                            className="w-3 h-3 hover:cursor-pointer hover:opacity-50 transition-all"
                          />
                        </Badge>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
                <div className="w-full h-fit flex flex-wrap lg:hidden items-center gap-2">
                  {field.value?.map((item, key) => {
                    return (
                      <Badge key={key} className="flex items-center gap-1">
                        {softSkillItems.find(skill => skill.value === item)
                          ?.label || item}
                        <Cross2Icon
                          onClick={() =>
                            field.onChange(
                              field.value?.filter(value => value !== item)
                            )
                          }
                          className="w-3 h-3 hover:cursor-pointer hover:opacity-50 transition-all"
                        />
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </FormItem>
      )}
    ></FormField>
  );
};
