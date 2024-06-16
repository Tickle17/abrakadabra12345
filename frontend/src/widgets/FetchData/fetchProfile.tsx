import { useEffect } from 'react';
import axios from 'axios';
import { useProfileStore } from '@/app/store/slices/profileSlice.ts';
// import { ResponseData } from '@/pages/User/Profile';
import { toast } from 'sonner';
import { useAuthStore, useBusinessProfileStore } from '@/app/store';

export const useFetchUserProfile = () => {
  const { getLoggedInToken, getUserId } = useAuthStore();
  const { setBusinessProfileData } = useBusinessProfileStore();
  const { setProfileData } = useProfileStore();
  const token = getLoggedInToken();
  const id = getUserId();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (token && id) {
      switch (role) {
        case 'business':
          axios
            .get(`/api/business/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(res => {
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
