import { AppLayout } from '@/shared/layouts';
import {
  useGetVacancyStore,
  VacancyDTO,
} from '@/app/store/slices/getVacancySlice.ts';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/widgets';
import { vacancyOffer } from '@/pages/User/Vacancies/ui/vacancyOffer.tsx';
import { Button } from '@/shared/ui';

export const Vacancies = () => {
  const { vacancies, loading, error, fetchVacancies } = useGetVacancyStore();
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyDTO | null>(
    null
  );

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  const openModal = (vacancy: VacancyDTO) => {
    setSelectedVacancy(vacancy);
  };

  const closeModal = () => {
    setSelectedVacancy(null);
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
                  className="bg-white p-2 shadow rounded-md gap-4 m-4 border border-black cursor-pointer hover:bg-gray-100 hover:border-gray-200"
                  onClick={() => openModal(vacancy)}
                >
                  <div className="grid grid-cols-4 text-center items-center">
                    <div className="col-span-1">
                      <h3 className="text-lg font-medium">
                        {vacancy.position}
                      </h3>
                      <p className="text-gray-600">{vacancy.specialization}</p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="text-lg font-medium">Зарплата</h3>
                      <p className="text-gray-600">
                        {vacancy.salaryMin} - {vacancy.salaryMax}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="text-lg font-medium">Опыт работы</h3>
                      <p className="text-gray-600">{vacancy.experience}</p>
                    </div>
                    <div className="col-span-1">
                      <Button onClick={() => openModal(vacancy)}>
                        Открыть
                      </Button>
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

      {selectedVacancy && vacancyOffer(closeModal, selectedVacancy)}
    </AppLayout>
  );
};
