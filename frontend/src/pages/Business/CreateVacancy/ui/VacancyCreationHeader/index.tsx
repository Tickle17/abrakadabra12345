import { useVacancyStore } from '@/app/store';
import { Button } from '@/shared/ui'; // import { Description } from '@radix-ui/react-dialog';
import {
  ComponentBooleanIcon,
  ComponentInstanceIcon,
  ComponentPlaceholderIcon,
} from '@radix-ui/react-icons';
import axios, { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { toast } from 'sonner';

type ResponseData = {
  id: string;
};

// TODO: refactor
const objectTemp = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  freelance: 'FREELANCE',
  intership: 'INTERNSHIP',
  contract: 'CONTRACT',
  remote: 'REMOTE',
};

export const VacancyCreationHeader = () => {
  const {
    submitButtonRef,
    activeStep,
    setActiveStep,
    firstStepData,
    secondStepData,
    firstStepFormValid,
    secondStepFormValid,
  } = useVacancyStore();

  const handleCreateVacancy = () => {
    const data = {
      status: 'active',
      position: firstStepData.position,
      description: secondStepData.description,
      requirements: secondStepData.requirements,
      idealCandidate: secondStepData.idealCandidate,
      hardSkills: firstStepData.hardSkills,
      softSkills: firstStepData.softSkills,
      workFormat: firstStepData.workFormat?.map(name => objectTemp[name]),
      salaryMin: firstStepData.salaryMin,
      salaryMax: firstStepData.salaryMax,
      specialization: null,
      experience: String(firstStepData.experience),
      address: secondStepData.address,
      businessId: localStorage.getItem('id') || '',
      vacancy: '',
    };

    axios
      .post<ResponseData>(
        'https://backendhackaton.onrender.com/vacancy',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          toast('Vacancy created');
          window.location.reload();
        } else {
          toast('Something went wrong');
          console.log(response.data);
        }
      })
      .catch(err => {
        toast('Something went wrong');
        console.error(err);
      });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-md font-light text-slate-950">Этапы вакансии</h1>
      <div className="w-full flex flex-col gap-3">
        <div
          onClick={() => setActiveStep('Job Information')}
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative hover:cursor-pointer hover:!border-slate-950 transition-all',
            activeStep === 'Job Information'
              ? 'border-slate-950'
              : 'border-slate-200'
          )}
        >
          <span className="w-[1px] h-[12px] border border-slate-950 absolute right-[50%] -bottom-[13px]"></span>
          <p className="text-slate-950 font-thin text-xs shrink-0">1/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentPlaceholderIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">
              Основная информация
            </p>
          </div>
        </div>
        <div
          onClick={() =>
            secondStepFormValid && setActiveStep('Job Description')
          }
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative hover:cursor-pointer transition-all',
            activeStep === 'Job Description'
              ? 'border-slate-950'
              : 'border-slate-200',
            activeStep === 'Job Description' ||
              (firstStepFormValid && secondStepFormValid)
              ? 'hover:cursor-pointer hover:!border-slate-950'
              : 'hover:cursor-not-allowed'
          )}
        >
          <span className="w-[1px] h-[12px] border border-slate-950 absolute right-[50%] -bottom-[13px]"></span>
          <p className="text-slate-950 font-thin text-xs shrink-0">2/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentInstanceIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">
              Описание вакансии
            </p>
          </div>
        </div>
        <div
          onClick={() =>
            firstStepFormValid &&
            secondStepFormValid &&
            setActiveStep('Job Preferences')
          }
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative hover:cursor-pointer transition-all',
            activeStep === 'Job Preferences'
              ? 'border-slate-950'
              : 'border-slate-200',
            activeStep === 'Job Preferences' ||
              (firstStepFormValid && secondStepFormValid)
              ? 'hover:cursor-pointer hover:!border-slate-950'
              : 'hover:cursor-not-allowed'
          )}
        >
          <p className="text-slate-950 font-thin text-xs shrink-0">3/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentBooleanIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">
              Подтверждение публикации
            </p>
          </div>
        </div>
      </div>
      <Button
        className="bg-slate-950 text-slate-200 rounded-[2px]"
        onClick={() => {
          switch (activeStep) {
            case 'Job Information': {
              if (!submitButtonRef || !submitButtonRef.current) return;
              submitButtonRef.current.click();
              break;
            }
            case 'Job Description': {
              if (!submitButtonRef || !submitButtonRef.current) return;
              submitButtonRef.current.click();
              break;
            }
            case 'Job Preferences': {
              console.log({ ...firstStepData, ...secondStepData });
              handleCreateVacancy();
              break;
            }
          }
        }}
      >
        {activeStep === 'Job Information'
          ? firstStepFormValid
            ? 'Обновить'
            : 'Дальше'
          : ''}
        {activeStep === 'Job Description'
          ? secondStepFormValid
            ? 'Обновить'
            : 'Дальше'
          : ''}
        {activeStep === 'Job Preferences' && 'Создать вакансию'}
      </Button>
    </div>
  );
};
