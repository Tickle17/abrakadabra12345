import { useVacancyStore } from '@/app/store';
import { Form, FormField, FormItem, Textarea } from '@/shared/ui';
import { useEffect, useRef } from 'react';
import { stepSecondSchema, stepSecondValues } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const StepSecond = () => {
  const { setSubmitButtonRef, setSecondStepData, activeStep, setActiveStep } =
    useVacancyStore();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<stepSecondValues>({
    resolver: zodResolver(stepSecondSchema),
    defaultValues: {
      description: '',
      requirements: '',
      idealCandidate: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!submitButtonRef.current) return;
    setSubmitButtonRef(submitButtonRef);
  }, [submitButtonRef, setSubmitButtonRef]);

  const onSubmit = (data: stepSecondValues) => {
    setSecondStepData(data);
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
        className="h-full w-full grid grid-cols-1 grid-rows-5 gap-7"
      >
        <div className="w-full flex items-center gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Job Description
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              A short description of the position
            </p>
          </div>
          <div className="shrink-1 flex-grow flex flex-col gap-1">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="e.g. The main objective of the position is to..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    At least 10 characters
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>

        <div className="w-full flex items-center gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Responsibilities
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              e.g. The main responsibilities of the position
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
                    placeholder="e.g. The main objective of the position is to..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    At least 10 characters
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>

        <div className="w-full flex items-center gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              An ideal candidate
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              e.g. The ideal candidate should be able to...
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
                    placeholder="e.g. The main objective of the position is to..."
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    At least 10 characters
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>

        <button
          id="TEST"
          type="submit"
          className="invisible h-0 w-0 absolute"
          ref={submitButtonRef}
        >
          Submit
        </button>
      </form>
    </Form>
  );
};
