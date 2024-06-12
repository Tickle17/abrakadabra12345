import { useVacancyStore } from '@/app/store';
import { Button } from '@/shared/ui';
import {
  ComponentBooleanIcon,
  ComponentInstanceIcon,
  ComponentPlaceholderIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';

export const VacancyCreationHeader = () => {
  const { submitButtonRef, activeStep } = useVacancyStore();

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-md font-light text-slate-950">Vacancy Steps</h1>
      <div className="w-full flex flex-col gap-3">
        <div
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative',
            activeStep === 'Job Information'
              ? 'border-slate-950'
              : 'border-slate-200'
          )}
        >
          <span className="w-[1px] h-[12px] border border-slate-950 absolute right-[50%] -bottom-[13px]"></span>
          <p className="text-slate-950 font-thin text-xs shrink-0">1/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentPlaceholderIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">Job Information</p>
          </div>
        </div>
        <div
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative',
            activeStep === 'Job Description'
              ? 'border-slate-950'
              : 'border-slate-200'
          )}
        >
          <span className="w-[1px] h-[12px] border border-slate-950 absolute right-[50%] -bottom-[13px]"></span>
          <p className="text-slate-950 font-thin text-xs shrink-0">2/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentInstanceIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">Job Description</p>
          </div>
        </div>
        <div
          className={clsx(
            'rounded-[2px] bg-slate-50 border p-3 flex items-center gap-3 relative',
            activeStep === 'Job Preferences'
              ? 'border-slate-950'
              : 'border-slate-200'
          )}
        >
          <p className="text-slate-950 font-thin text-xs shrink-0">3/3</p>
          <div className="flex-grow shrink flex justify-center items-center gap-2">
            <ComponentBooleanIcon className="w-5 h-5" />
            <p className="text-slate-950 font-light text-xs">Job Preferences</p>
          </div>
        </div>
      </div>
      <Button
        className="bg-slate-950 text-slate-200 rounded-[2px]"
        onClick={() => {
          if (!submitButtonRef || !submitButtonRef.current) return;
          submitButtonRef.current.click();
        }}
      >
        Next
      </Button>
    </div>
  );
};
