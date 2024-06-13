import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  TChatList,
  useChatListStore,
} from '@/app/store/slices/chatListSlice.ts';
import { toast } from 'sonner';

export default function FetchChatData() {
  const id = localStorage.getItem('id');
  const { setProfileData } = useChatListStore();

  useEffect(() => {
    if (id) {
      axios
        .get<TChatList[]>(
          `https://backendhackaton.onrender.com/reactions/${id}`
        )
        .then((response: AxiosResponse<TChatList[]>) => {
          if (response.status === 200 || response.status === 201) {
            const data = response.data;
            setProfileData(data);
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
  }, [id, setProfileData]);

  return null; // Этот компонент используется только для получения данных при монтировании
}
