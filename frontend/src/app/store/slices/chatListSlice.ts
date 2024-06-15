import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { TCalendarStore } from '@/app/store/slices/calendarSlice.ts';

export type TChatList = {
  reactionId: string;
  businessId: string;
  vacancy: string;
  position: string;
  userId: string;
  vacancyId: string;
  calendarData: TCalendarStore;
  vacancySlot: {
    id: string;
    slot: number;
    free: boolean;
    userId: string;
    communication: string;
    acceptingByUser: boolean;
    vacancyId: string;
    dayOfWeek: string;
    date: Date;
  };
};

export type Messages = {
  id: string;
  reactionsVacancyId: string;
  senderType: string;
  senderId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type TChatListCurrentUser = {
  reactionId: string;
  businessId: string;
  userId: string;
  vacancyId: string;
};

export type ChatListStore = {
  profileData: TChatList[];
  setProfileData: (profileData: TChatList[]) => void;
  currentChatId: TChatListCurrentUser;
  setCurrentChat: (
    reactionId: string,
    businessId: string,
    userId: string,
    vacancyId: string
  ) => void;
  messages: Messages[];
  setMessages: (messages: Messages[]) => void;
  getMessages: () => Messages[];
  connectWebSocket: (
    userId: string,
    businessId: string,
    vacancyId: string
  ) => void;
};

export const useChatListStore = create<ChatListStore>((set, get) => ({
  profileData: [],
  setProfileData: (profileData: TChatList[]) => set({ profileData }),
  currentChatId: { reactionId: '', businessId: '', userId: '', vacancyId: '' },
  setCurrentChat: (reactionId, businessId, userId, vacancyId) => {
    set({ currentChatId: { reactionId, businessId, userId, vacancyId } });
    // Fetch messages when the current chat is set
    axios
      .get<Messages[]>(
        `https://backendhackaton.onrender.com/messages/${userId}/${businessId}/${vacancyId}`
      )
      .then((response: AxiosResponse<Messages[]>) => {
        if (response.status === 200 || response.status === 201) {
          set({ messages: response.data.filter(m => m.message.trim() !== '') });
        } else {
          toast('Something went wrong');
          console.log(response.data);
        }
      })
      .catch(error => {
        toast('Something went wrong');
        console.error(error);
      });
    // Connect to WebSocket
    get().connectWebSocket(userId, businessId, vacancyId);
  },
  messages: [],
  setMessages: (messages: Messages[]) => set({ messages }),
  getMessages: () => get().messages,
  connectWebSocket: (userId, businessId, vacancyId) => {
    const url = `wss://backendhackaton.onrender.com/ws/${userId}/${businessId}/${vacancyId}`;
    console.log(`Connecting to WebSocket at ${url}`);
    const client = new W3CWebSocket(url);

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = message => {
      console.log('WebSocket message received:', message.data);
      if (typeof message.data === 'string') {
        try {
          const receivedMessages: Messages[] = JSON.parse(message.data);
          if (Array.isArray(receivedMessages)) {
            set(state => {
              const newMessages = receivedMessages.filter(
                receivedMessage =>
                  receivedMessage.message &&
                  receivedMessage.message.trim() !== '' &&
                  !state.messages.some(m => m.id === receivedMessage.id)
              );
              return { messages: [...state.messages, ...newMessages] };
            });
          } else {
            console.error('Received data is not an array');
          }
        } catch (e) {
          console.error('Error parsing WebSocket message:', e);
        }
      } else {
        console.error('WebSocket message data is not a string');
      }
    };

    client.onerror = error => {
      console.error('WebSocket Error:', error);
    };

    client.onclose = event => {
      console.log('WebSocket Client Disconnected:', event.reason);
    };
  },
}));
