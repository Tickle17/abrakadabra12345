import { AppLayout } from '@/shared/layouts';
import { VacancyCreationHeader, VacancyCreationForm } from '@/widgets';

export const CreateVacancy = () => {
  return (
    <AppLayout>
      <div className="bg-white shadow-sm p-7 rounded-[2px] col-span-4 hidden lg:flex flex-col gap-5">
        <VacancyCreationHeader />
      </div>
      <div className="bg-white shadow-sm p-7 rounded-[2px] col-span-12 lg:col-span-8 flex flex-col gap-5">
        <VacancyCreationForm />
      </div>
    </AppLayout>
  );
};
