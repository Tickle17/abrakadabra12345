import { ProfileState } from '@/app/store/slices/profileSlice.ts';
import { VacancyDTO } from '@/app/store/slices/getVacancySlice.ts';
import { TReactions } from '@/app/store/slices/getReactionsSlice.ts';
import axios from 'axios';

type HardSkill =
  | 'NEXT.JS'
  | 'SVELTE'
  | 'VUE'
  | 'SOLID'
  | 'ASTRO'
  | 'REACT'
  | 'CSS'
  | 'JS'
  | 'KOTLIN'
  | 'HTML'
  | 'POSTGRESQL'
  | 'WEBPACK'
  | 'JAVA'
  | 'PYTHON'
  | 'DOCKER'
  | 'GIT'
  | 'TYPESCRIPT';

export function getPercent() {
  const calculateMatchPercentage = (
    user: ProfileState,
    vacancy: VacancyDTO | null
  ): number => {
    if (user.hardSkills && vacancy?.hardSkills) {
      const matchingSkills = user.hardSkills.filter((skill: HardSkill) =>
        vacancy.hardSkills!.includes(skill)
      );
      return (matchingSkills.length / vacancy.hardSkills.length) * 100;
    }
    return 0;
  };
  return calculateMatchPercentage;
}

export function putReaction(
  selectedReaction: TReactions,
  commentary: string,
  invitation: boolean,
  control: boolean
) {
  const handlePutReaction = async () => {
    try {
      await axios.put(
        `https://backendhackaton.onrender.com/reaction/${selectedReaction.id}`,
        {
          commentary,
          invitation,
          control,
        }
      );
      if (invitation === true) {
        await axios.put(`https://backendhackaton.onrender.com/message`, {
          message: 'Выберите подходящую дату для собеседования:',
          reactionsVacancyId: selectedReaction.id,
          senderId: selectedReaction.businessId,
          senderType: 'business',
        });
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Failed to update data', error);
    }
  };
  return handlePutReaction;
}
