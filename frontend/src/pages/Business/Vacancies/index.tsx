import { AppLayout } from '@/shared/layouts';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { useEffect, useState } from 'react';
import {
  TReactions,
  useReactionsStore,
} from '@/app/store/slices/getReactionsSlice.ts';
import CheckUser from '@/pages/Business/Vacancies/ui/checkUser.tsx';
import { useGetVacancyStore } from '@/app/store/slices/getVacancySlice.ts';

export default function Vacancies() {
  const { reactions, fetchReactions } = useReactionsStore();
  const { vacancies, fetchVacancies } = useGetVacancyStore();
  const [selectedReaction, setSelectedReaction] = useState<TReactions | null>(
    null
  );
  const openModal = (reaction: TReactions) => {
    setSelectedReaction(reaction);
  };
  const closeModal = () => {
    setSelectedReaction(null);
  };

  useEffect(() => {
    fetchReactions();
    fetchVacancies();
  }, [fetchReactions, fetchVacancies]);
  return (
    <AppLayout>
      <div className="flex flex-col col-span-12 gap-4 bg-gray-100 shadow-sm p-4 border-radius-default">
        <div className="grid grid-cols-2 gap-5">
          {reactions.filter(reaction => reaction.invitation === false).length >
          0
            ? reactions
                .filter(reaction => reaction.invitation === false)
                .map(reaction => {
                  const relatedVacancy = vacancies.find(
                    vacan => vacan.id === reaction.vacancyId
                  );
                  return (
                    <Card key={reaction.id} className="p-4">
                      <CardHeader className="p-2">
                        <CardTitle>Новый отклик</CardTitle>
                        <CardDescription>
                          Необходимо предоставить ответ соискателю
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-2">
                        <p>{relatedVacancy?.position}</p>
                      </CardContent>
                      <CardFooter className=" flex justify-between p-2">
                        <p>Опыт работы: {relatedVacancy?.experience} год -а</p>
                        <Button onClick={() => openModal(reaction)}>
                          Открыть
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
            : 'Еще никто не откликнулся, возможно, время добавить больше информации в вакансию?'}
        </div>
      </div>
      {selectedReaction && (
        <CheckUser
          closeModal={closeModal}
          selectedReaction={selectedReaction}
        />
      )}
    </AppLayout>
  );
}
