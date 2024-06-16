import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useProfileStore } from '@/app/store/slices/profileSlice.ts';
// import {  } from '@/pages/User/Profile';
import { toast } from 'sonner';
import { useAuthStore, useBusinessProfileStore } from '@/app/store';

export const useFetchUserProfile = () => {
  const { getLoggedInToken, getUserId } = useAuthStore();
  const { setProfileData } = useProfileStore();
  const { setBusinessProfileData } = useBusinessProfileStore();
  const token = getLoggedInToken();
  const id = getUserId();

  type BusinessProfileData = {
    id: string;
    fullName: string;
    photoUrl: string;
    age: number;
    stackTech: string;
    gitlabUrl: string;
    aboutUser: string;
    price: number;
    calendarId: string;
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (token && id) {
      switch (role) {
        case 'business':
          axios
            .get<BusinessProfileData>(
              `https://backendhackaton.onrender.com/business/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res: AxiosResponse<BusinessProfileData>) => {
              if (res.data) {
                setBusinessProfileData(res.data);
              }
            })
            .catch(() => {
              toast.error('Something went wrong');
            });
          break;

        case 'users':
          axios
            .get(`https://backendhackaton.onrender.com/${role}/${id}`)
            .then(response => {
              if (response.status === 200 || response.status === 201) {
                const data = response.data;
                setProfileData({
                  fullName: data.fullName || '',
                  photoUrl: data.photoUrl || '',
                  age: data.age || 0,
                  stackTech: data.stackTech || '',
                  gitlabUrl: data.gitlabUrl || '',
                  aboutUser: data.aboutUser || '',
                  price: data.price || 0,
                  criterionsJob: data.criterionsJob || '',
                  softSkills: data.softSkills || [],
                  hardSkills: data.hardSkills || [],
                });
              } else {
                toast.error('Something went wrong');
                console.log(response.data);
              }
            })
            .catch(error => {
              toast.error('Something went wrong');
              console.error(error);
            });
          break;

        default:
          toast.error('Invalid role');
          break;
      }
    }
  }, [token, id, setProfileData, setBusinessProfileData]);
};
