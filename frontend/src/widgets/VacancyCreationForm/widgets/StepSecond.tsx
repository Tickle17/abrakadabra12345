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
import { stepSecondSchema, stepSecondValues } from '../schema';
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
            <h2 className="text-slate-950 font-light text-md">Job Address</h2>
            <p className="text-slate-950 font-thin text-xs">
              The location of the position. Leave blank if remote
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
                    placeholder="e.g. Mumbai, India"
                    className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs resize-none"
                  />
                  <span className="text-slate-950 text-xs font-thin">
                    At least 5 characters
                  </span>
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="shrink-0 max-w-[175px]">
            <h2 className="text-slate-950 font-light text-md">
              Job Description
            </h2>
            <p className="text-slate-950 font-thin text-xs">
              A short description of the position
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
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
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
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
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
        <FormField
          control={control}
          name="businessId"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="w-full flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
                  <div className="shrink-0 max-w-[175px] flex flex-col gap-1">
                    <h2 className="text-slate-950 font-light text-md">
                      Responsible HR
                    </h2>
                    <p className="text-slate-950 font-thin text-xs">
                      Select a responsible HR for the position; he or she will
                      be able to see and edit this position and edit their
                      calendar for meetings
                    </p>
                  </div>
                  <div className="shrink-1 flex-grow flex flex-col gap-3">
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="border rounded-[2px] border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select HR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stephany Colins">
                          Stephany Colins
                        </SelectItem>
                        <SelectItem value="Mark Fisher">Mark Fisher</SelectItem>
                        <SelectItem value="Liland Palmer">
                          Liland Palmer
                        </SelectItem>
                        <SelectItem value="Lora Palmer">Lora Palmer</SelectItem>
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
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
