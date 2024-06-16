import { useEffect, useState } from 'react';
import Modal from '@/widgets/Modal/Modal.tsx';
import {
  TReactions,
  useReactionUserStore,
} from '@/app/store/slices/getReactionsSlice.ts';
import { Button, Input } from '@/shared/ui';
import { useGetVacancyByIdStore } from '@/app/store/slices/getVacancySlice.ts';
import ExampleReaction from '@/pages/Business/Vacancies/ui/exampleReaction.tsx';
import { ExampleVacancy } from '@/pages/Business/Vacancies/ui/exampleVacancy.tsx';
import { putReaction } from '@/pages/Business/Vacancies/ui/helper.ts';

export default function CheckUser({
  closeModal,
  selectedReaction,
}: {
  closeModal: () => void;
  selectedReaction: TReactions;
}) {
  const [commentary, setCommentary] = useState<string>(
    selectedReaction.commentary || ''
  );

  const [invitation, setInvitation] = useState<boolean>(
    selectedReaction.invitation
  );
  const [control, setControl] = useState<boolean>(selectedReaction.control);
  const handlePutReaction = putReaction(
    selectedReaction,
    commentary,
    invitation,
    control,
    closeModal
  );

  const { user, fetchReactionUser } = useReactionUserStore();
  const { vacancy, fetchVacancyById } = useGetVacancyByIdStore();

  useEffect(() => {
    fetchReactionUser(selectedReaction.userId);
    fetchVacancyById(selectedReaction.vacancyId);
  }, [
    selectedReaction.userId,
    selectedReaction.vacancyId,
    fetchReactionUser,
    fetchVacancyById,
  ]);

  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-row gap-4">
        {ExampleReaction(user, vacancy)}
        {ExampleVacancy(vacancy)}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="flex items-center">Комментарий:</div>
          <Input
            value={commentary}
            onChange={e => setCommentary(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            <div className="flex items-center">Пригласить пользователя:</div>
            <Input
              type="checkbox"
              checked={invitation}
              onChange={e => setInvitation(e.target.checked)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            Пользователь подтвердил встречу:
          </div>
          <Input
            type="checkbox"
            checked={control}
            onChange={e => setControl(e.target.checked)}
          />
        </div>
        <Button onClick={handlePutReaction}>Submit</Button>
      </div>
    </Modal>
  );
}
