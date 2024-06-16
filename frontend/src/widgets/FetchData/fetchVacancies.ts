import axios from 'axios';
import { VacancyDTO } from '@/app/store/slices/getVacancySlice.ts';
import { toast } from 'sonner';

export const sendReaction = async (vacancy: VacancyDTO) => {
  const userId = localStorage.getItem('id');
  const businessId = vacancy.businessId;
  const vacancyId = vacancy.id;
  try {
    const response = await axios.post(
      'https://backendhackaton.onrender.com/reaction',
      {
        userId,
        businessId,
        vacancyId,
      }
    );

    if (response.status === 200) {
      console.log('Reaction sent successfully');
      toast('Отклик уже передали сотрудникам');
      window.location.reload();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error sending reaction:',
        error.response ? error.response.statusText : error.message
      );
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
