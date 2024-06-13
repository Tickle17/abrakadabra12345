import { create } from 'zustand';

export type ProfileState = {
  fullName: string;
  photoUrl: string;
  age: number;
  stackTech: string;
  gitlabUrl: string;
  aboutUser: string;
  price: number;
  criterionsJob: string;
  softSkills:
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
  hardSkills:
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
};

export type ProfileStore = {
  profileData: ProfileState;
  setProfileData: (profileData: Partial<ProfileState>) => void;
};

export const useProfileStore = create<ProfileStore>(set => ({
  profileData: {
    fullName: '',
    photoUrl: '',
    age: 0,
    stackTech: '',
    gitlabUrl: '',
    aboutUser: '',
    price: 0,
    criterionsJob: '',
    softSkills: null,
    hardSkills: null,
  },
  setProfileData: profileData =>
    set(state => ({
      profileData: { ...state.profileData, ...profileData },
    })),
}));
