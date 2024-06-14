import { create } from 'zustand';
import axios from 'axios';

export type VacancyDTO = {
  id?: string;
  status?: string;
  position?: string;
  description?: string;
  requirements?: string;
  idealCandidate?: string;
  workFormat?: string[];
  specialization?: string;
  experience?: string;
  vacancy?: string;
  address?: string;
  softSkills?:
    | (
        | 'COMMUNICATION'
        | 'PROBLEM_SOLVING'
        | 'TEAMWORK'
        | 'ADAPTABILITY'
        | 'TIME_MANAGEMENT'
        | 'STRESS'
        | 'PRIDE'
        | 'GREED'
        | 'WRATH'
        | 'ENVY'
        | 'GLUTTONY'
        | 'SLOTH'
      )[]
    | null;
  hardSkills?:
    | (
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
        | 'TYPESCRIPT'
      )[]
    | null;
  salaryMin?: number;
  salaryMax?: number;
  businessId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

type VacancyState = {
  vacancies: VacancyDTO[];
  loading: boolean;
  error: string | null;
  fetchVacancies: () => Promise<void>;
};

export const useGetVacancyStore = create<VacancyState>(set => ({
  vacancies: [],
  loading: false,
  error: null,

  // Асинхронное действие для получения списка вакансий
  fetchVacancies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        'https://backendhackaton.onrender.com/vacancies'
      );
      set({ vacancies: response.data, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));
