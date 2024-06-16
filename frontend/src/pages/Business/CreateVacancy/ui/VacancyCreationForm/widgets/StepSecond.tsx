import { useVacancyStore } from '@/app/store';
import {
  Button,
  Form,
  FormField,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';
import { useEffect, useRef } from 'react';
import { stepSecondSchema, stepSecondValues } from '../schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const StepSecond = () => {
  const {
    secondStepData,
    setSubmitButtonRef,
    setSecondStepData,
    activeStep,
    setActiveStep,
    setSecondStepFormValid,
  } = useVacancyStore();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<stepSecondValues>({
    resolver: zodResolver(stepSecondSchema),
    defaultValues: {
      address: secondStepData.address,
      description: secondStepData.description,
      requirements: secondStepData.requirements,
      idealCandidate: secondStepData.idealCandidate,
      businessId: secondStepData.businessId,
    },
  });
  const { handleSubmit, control } = form;

  useEffect(() => {
    if (!submitButtonRef.current) return;
    setSubmitButtonRef(submitButtonRef);
  }, [submitButtonRef, setSubmitButtonRef]);

  const onSubmit = (data: stepSecondValues) => {
    setSecondStepFormValid(true);
    setSecondStepData({
      ...data,
      //address: form.getValues('address'),
    });
    switch (activeStep) {
      case 'Job Information': {
        setActiveStep('Job Description');
        break;
      }
      case 'Job Description': {
        setActiveStep('Job Preferences');
        break;
      }
      case 'Job Preferences': {
        setActiveStep('Job Information');
        break;
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full grid grid-cols-1 md:grid-rows-5 gap-7"
      >
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Адрес места работы
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              Адрес места работы (например, Москва, Россия)
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input
                    {...field}
                    placeholder="e.g. Москва, Россия"
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    Не меньше 5 символов
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Описание вакансии
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              Короткое описание вакансии
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Textarea
                    {...field}
                    placeholder="e.g. Разработка мобильных приложений ..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    не менее 10-ти символов
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">Обязанности</h2>
            <p className="text-slate-950 font-thin text-xs">
              Описание обязанностей вакансии
            </p>
          </div>
          <div className="shrink-1 flex-grow flex flex-col gap-1">
            <FormField
              control={control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="e.g. Ключевой обязанностью соискателя является ..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    Минимум 10 символов
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Пожелания для кандидата
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              идеальный кандидат должен / должна
            </p>
          </div>
          <div className="shrink-1 flex-grow flex flex-col gap-1">
            <FormField
              control={control}
              name="idealCandidate"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="e.g. Идеальный кандидат должен / должна ..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    Минимум 10 символов
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <FormField
          control={control}
          name="businessId"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
                  <div className="shrink-0 max-w-[175px] flex flex-col gap-1">
                    <h2 className="text-slate-950 font-light text-md">
                      Hr, ответсвенный за вакансию
                    </h2>
                    <p className="text-slate-950 font-thin text-xs">
                      Выберите ответсвенного Hr для вакансии. Все отклики по
                      этой вакансии будут зафиксированы в слотах в календаре
                      выбранного Hr
                    </p>
                  </div>
                  <div className="shrink-1 flex-grow flex flex-col gap-3">
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Выберите ответсвенного Hr" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Leonard Cupkin">
                          Леонид Цыпкин
                        </SelectItem>
                        <SelectItem value="Veneamin Erofeev">
                          Венеамин Ерофеев
                        </SelectItem>
                        <SelectItem value="Sergey Kurekin">
                          Сергей Курехин
                        </SelectItem>
                        <SelectItem value="Vladimir Sirin">
                          Владимир Сирин
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormItem>
            );
          }}
        ></FormField>
        <div className="w-full grid grid-cols-2 gap-3 lg:h-0 lg:w-0 lg:absolute lg:invisible">
          <Button
            className="rounded-[2px]"
            onClick={() => setActiveStep('Job Information')}
          >
            Back
          </Button>
          <Button className="rounded-[2px]" type="submit" ref={submitButtonRef}>
            Дальше
          </Button>
        </div>
      </form>
    </Form>
  );
};
