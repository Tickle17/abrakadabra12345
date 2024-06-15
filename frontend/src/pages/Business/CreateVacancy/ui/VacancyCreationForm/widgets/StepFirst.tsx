import { Button, Form } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { stepFirstSchema, stepFirstValues } from '../schema.ts';
import {
  ExperienceField,
  HardSkillsField,
  PositionField,
  SalaryField,
  SoftSkillsField,
  WorkFormatField,
} from '../components';
import { useVacancyStore } from '@/app/store';
import { useEffect, useRef } from 'react';

export const StepFirst = () => {
  const {
    firstStepData,
    setFirstStepData,
    setSubmitButtonRef,
    activeStep,
    setActiveStep,
    setFirstStepFormValid,
  } = useVacancyStore();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<stepFirstValues>({
    resolver: zodResolver(stepFirstSchema),
    defaultValues: {
      experience: firstStepData.experience,
      position: firstStepData.position,
      salaryMin: firstStepData.salaryMin,
      salaryMax: firstStepData.salaryMax,
      workFormat: firstStepData.workFormat,
      hardSkills: firstStepData.hardSkills,
      softSkills: firstStepData.softSkills,
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
    setFirstStepFormValid(true);
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

  console.log('errors', errors);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full flex flex-col md:grid md:grid-cols-1 md:grid-rows-6 gap-7"
      >
        <PositionField control={control} errors={errors} />
        <WorkFormatField form={form} control={control} errors={errors} />
        <ExperienceField control={control} errors={errors} />
        <SalaryField control={control} errors={errors} />
        <SoftSkillsField control={control} errors={errors} />
        <HardSkillsField control={control} errors={errors} />
        <div className="w-full grid grid-cols-2 gap-3 lg:h-0 lg:w-0 lg:absolute lg:invisible">
          <Button className="rounded-[2px]" disabled>
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
