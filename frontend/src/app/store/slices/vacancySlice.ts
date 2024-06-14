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
        | 'Stress'
        | 'PRIDE'
        | 'GREED'
        | 'WRATH'
        | 'ENVY'
        | 'LUST'
        | 'GLUTTONY'
        | 'SLOTH'
      )[]
    | null;
  hardSkills:
    | (
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
  salaryMin: number;
  salaryMax: number;
  experience: number;
};

type stepSecondValues = {
  address: string;
  description: string;
  requirements: string;
  idealCandidate: string;
  businessId: string;
};

export type PImageModalStore = {
  firstStepData: stepFirstValues;
  setFirstStepData: (data: stepFirstValues) => void;
  submitButtonRef: React.RefObject<HTMLButtonElement> | null;
  setSubmitButtonRef: (data: React.RefObject<HTMLButtonElement>) => void;
  activeStep: 'Job Information' | 'Job Description' | 'Job Preferences';
  setActiveStep: (
    data: 'Job Information' | 'Job Description' | 'Job Preferences'
  ) => void;
  secondStepData: stepSecondValues;
  setSecondStepData: (data: stepSecondValues) => void;
  firstStepFormValid: boolean;
  secondStepFormValid: boolean;
  setFirstStepFormValid: (data: boolean) => void;
  setSecondStepFormValid: (data: boolean) => void;
};

export const useVacancyStore = create<PImageModalStore>(set => ({
  firstStepData: {
    position: '',
    experience: 0,
    workFormat: [],
    softSkills: [],
    hardSkills: [],
    salaryMin: 0,
    salaryMax: 0,
  },
  firstStepFormValid: false,
  setFirstStepFormValid: data => set({ firstStepFormValid: data }),
  setFirstStepData: data => set({ firstStepData: data }),
  submitButtonRef: null,
  setSubmitButtonRef: data => set({ submitButtonRef: data }),
  activeStep: 'Job Information',
  setActiveStep: data => set({ activeStep: data }),
  secondStepFormValid: false,
  setSecondStepFormValid: data => set({ secondStepFormValid: data }),
  secondStepData: {
    address: '',
    description: '',
    requirements: '',
    idealCandidate: '',
    businessId: '',
  },
  setSecondStepData: data => set({ secondStepData: data }),
}));
