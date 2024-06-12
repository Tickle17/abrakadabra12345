import { useVacancyStore } from '@/app/store';
import { StepFirst, StepSecond } from '@/widgets/VacancyCreationForm/widgets';

export const VacancyCreationForm = () => {
  const { activeStep } = useVacancyStore();
  return (
    <>
      {activeStep === 'Job Information' && <StepFirst />}
      {activeStep === 'Job Description' && <StepSecond />}
      {activeStep === 'Job Preferences' && <p>3</p>}
    </>
  );
};
