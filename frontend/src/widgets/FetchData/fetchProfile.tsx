import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useProfileStore } from '@/app/store/slices/profileSlice.ts';
import { ResponseData } from '@/pages/Profile';
import { toast } from 'sonner';
import { useAuthStore } from '@/app/store';

export const useFetchUserProfile = () => {
  const { getLoggedInToken, getUserId } = useAuthStore();
  const { setProfileData } = useProfileStore();
  const token = getLoggedInToken();
  const id = getUserId();

  useEffect(() => {
    if (token && id) {
      axios
        .get<ResponseData>(`https://backendhackaton.onrender.com/users/${id}`)
        .then((response: AxiosResponse<ResponseData>) => {
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
              softSkills: data.softSkills,
              hardSkills: data.hardSkills,
            });
          } else {
            toast('Something went wrong');
            console.log(response.data);
          }
        })
        .catch(error => {
          toast('Something went wrong');
          console.error(error);
        });
    }
  }, [token, id, setProfileData]);
};
