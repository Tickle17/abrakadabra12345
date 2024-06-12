import { create } from 'zustand';

type stepFirstValues = {
  position: string;
  workFormat:
    | (
        | 'full-time'
        | 'part-time'
        | 'remote'
        | 'freelance'
        | 'intership'
        | 'contract'
      )[]
    | null;
  softSkills:
    | (
        | 'communication'
        | 'problem_solving'
        | 'teamwork'
        | 'adaptability'
        | 'time_management'
      )[]
    | null;
  hardSkills:
    | ('next.js' | 'react' | 'vue' | 'svelte' | 'astro' | 'solid')[]
    | null;
  salaryMin: number;
  salaryMax: number;
};

type stepSecondValues = {
  description: string;
  requirements: string;
  idealCandidate: string;
};

export type PImageModalStore = {
  firstStep: stepFirstValues;
  setFirstStepData: (data: stepFirstValues) => void;
  submitButtonRef: React.RefObject<HTMLButtonElement> | null;
  setSubmitButtonRef: (data: React.RefObject<HTMLButtonElement>) => void;
  activeStep: 'Job Information' | 'Job Description' | 'Job Preferences';
  setActiveStep: (
    data: 'Job Information' | 'Job Description' | 'Job Preferences'
  ) => void;
  secondStep: stepSecondValues;
  setSecondStepData: (data: stepSecondValues) => void;
};

export const useVacancyStore = create<PImageModalStore>(set => ({
  firstStep: {
    position: '',
    workFormat: [],
    softSkills: [],
    hardSkills: [],
    salaryMin: 0,
    salaryMax: 0,
  },
  setFirstStepData: data => set({ firstStep: data }),
  submitButtonRef: null,
  setSubmitButtonRef: data => set({ submitButtonRef: data }),
  activeStep: 'Job Information',
  setActiveStep: data => set({ activeStep: data }),
  secondStep: {
    description: '',
    requirements: '',
    idealCandidate: '',
  },
  setSecondStepData: data => set({ secondStep: data }),
}));
