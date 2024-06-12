import { Form } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { stepFirstValues, stepFirstSchema } from '../schema';
import {
  PositionField,
  WorkFormatField,
  SalaryField,
  SoftSkillsField,
  HardSkillsField,
} from '../components';
import { useVacancyStore } from '@/app/store';
import { useEffect, useRef } from 'react';

export const StepFirst = () => {
  const { setFirstStepData, setSubmitButtonRef, activeStep, setActiveStep } =
    useVacancyStore();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<stepFirstValues>({
    resolver: zodResolver(stepFirstSchema),
    defaultValues: {
      position: '',
      salaryMin: 0,
      salaryMax: 0,
      workFormat: [],
      hardSkills: [],
      softSkills: [],
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

  const onSubmit = (data: stepFirstValues) => {
    setFirstStepData(data);
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
        <PositionField control={control} errors={errors} />
        <WorkFormatField form={form} control={control} errors={errors} />
        <SalaryField control={control} errors={errors} />
        <SoftSkillsField control={control} errors={errors} />
        <HardSkillsField control={control} errors={errors} />
        <button
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
