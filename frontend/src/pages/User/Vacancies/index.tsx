import { AppLayout } from '@/shared/layouts';
import {
  useGetVacancyStore,
  VacancyDTO,
} from '@/app/store/slices/getVacancySlice.ts';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/widgets';
import { vacancyOffer } from '@/pages/User/Vacancies/ui/vacancyOffer.tsx';
import { Button } from '@/shared/ui';
import { useReactionsStore } from '@/app/store/slices/getReactionsSlice.ts';

export const Jobs = () => {
  const { vacancies, loading, error, fetchVacancies } = useGetVacancyStore();
  const { reactions, fetchReactions } = useReactionsStore();
  console.log(reactions);
  console.log(vacancies);
  const userId = localStorage.getItem('id');

  const [selectedVacancy, setSelectedVacancy] = useState<VacancyDTO | null>(
    null
  );

  useEffect(() => {
    fetchVacancies();
    fetchReactions();
  }, [fetchVacancies]);

  const openModal = (vacancy: VacancyDTO) => {
    setSelectedVacancy(vacancy);
  };

  const closeModal = () => {
    setSelectedVacancy(null);
  };

  const hasUserReactedToVacancy = (vacancyId: string) => {
    return reactions.some(
      reaction => reaction.vacancyId === vacancyId && reaction.userId === userId
    );
  };

  if (error) return <div>Error: {error}</div>;
  return (
    <AppLayout>
      <UserDetails />
      <div className="col-span-6 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm border-radius-default overflow-y-auto">
        <div className="col-span-9 grid grid-cols-1 gap-4">
          {loading ? (
            <div className="bg-white p-6 shadow rounded-md">Loading...</div>
          ) : (
            vacancies
              .filter(vacancy => vacancy.status === 'active')
              .map(vacancy => (
                <div
                  key={vacancy.id}
                  className="bg-white p-2 shadow rounded-[2px] gap-4 m-4 border border-slate-950 cursor-pointer hover:bg-gray-100 hover:border-gray-200"
                  onClick={() => openModal(vacancy)}
                >
                  <div className="grid grid-cols-4 text-center items-center">
                    <div className="col-span-1">
                      <h3 className="font-light text-sm">{vacancy.position}</h3>
                      <p className="text-gray-600">{vacancy.specialization}</p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-light text-sm">Зарплата</h3>
                      <p className="font-medium text-sm">
                        {vacancy.salaryMin} - {vacancy.salaryMax}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-light text-sm">Опыт работы</h3>
                      <p className="font-medium text-sm">
                        {vacancy.experience}
                      </p>
                    </div>
                    <div className="col-span-1">
                      {vacancy.id && hasUserReactedToVacancy(vacancy.id) ? (
                        <Button
                          className="rounded-[2px] text-gray-500 bg-gray-200 py-1 px-2 w-full h-full cursor-not-allowed whitespace-nowrap overflow-ellipsis"
                          disabled
                        >
                          Уже откликнулись
                        </Button>
                      ) : (
                        <Button
                          onClick={() => openModal(vacancy)}
                          className="rounded-[2px] text-white py-1 px-2 w-full h-full"
                        >
                          Открыть
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-1 grid-rows-2 gap-4">
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative border-radius-default"></div>
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative border-radius-default"></div>
      </div>

      {selectedVacancy && vacancyOffer(closeModal, selectedVacancy, reactions)}
    </AppLayout>
  );
};
