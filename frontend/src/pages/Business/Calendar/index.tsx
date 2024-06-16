import { AppLayout } from '@/shared/layouts';
import { CalendarPage, CalendarCreation } from './ui';
import { useAuthStore, useBusinessProfileStore } from '@/app/store';
import { useEffect, useState } from 'react';
import { useFetchUserProfile } from '@/widgets/FetchData/fetchProfile';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const Spinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

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

const fetchProfile = async (
  token: boolean,
  setBusinessProfileData: (data: BusinessProfileData) => void,
  id: string
) => {
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
      toast.error('Настройки календаря не обнаружены');
    });
};

// type DayOfWeekType = {
//   day:
//     | 'MONDAY'
//     | 'TUESDAY'
//     | 'WEDNESDAY'
//     | 'THURSDAY'
//     | 'FRIDAY'
//     | 'SATURDAY'
//     | 'SUNDAY';
//   isWorking: boolean;
// };

// type TCalendarPreferences = {
//   duration: number;
//   freeTime: number;
//   dayStart: number;
//   dayEnd: number;
//   workingDays: DayOfWeekType[];
// };

// const requestCalendarPreferences = async (
//   calendarId: string
// ): Promise<TCalendarPreferences> => {
//   try {
//     const response = await axios.get<TCalendarPreferences>(
//       `https://backendhackaton.onrender.com/calendar/${calendarId}`,
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//     if (response.status === 200 || response.status === 201) {
//       toast('Настройки календаря загружены');
//       return response.data;
//     } else {
//       toast('Что-то пошло не так');
//       // console.log(response.data);
//     }
//   } catch (err) {
//     toast('Что-то пошло не так');
//     console.error(err);
//   }
//   return {
//     duration: 0,
//     freeTime: 0,
//     dayStart: 0,
//     dayEnd: 0,
//     workingDays: [],
//   };
// };

export const Calendar = () => {
  const { getLoggedInToken, getUserId } = useAuthStore();
  const token = getLoggedInToken();
  const { getBusinessProfileData, setBusinessProfileData } =
    useBusinessProfileStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const id = getUserId();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await fetchProfile(token, setBusinessProfileData, id);
        setIsLoading(false);
      } catch (err) {
        toast('Что-то пошло не так');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <AppLayout>
      <div className="bg-white shadow-sm p-5 border-radius-default col-span-12 min-h-fit">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center fixed top-0 left-0">
            <Spinner />
          </div>
        )}
        {!isLoading && !getBusinessProfileData().calendarId && (
          <CalendarCreation />
        )}
        {!isLoading && getBusinessProfileData().calendarId && <CalendarPage />}
      </div>
    </AppLayout>
  );
};
