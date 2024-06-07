import { create } from 'zustand';

export type TMessage = {
  id: number;
  text: string;
  username: string;
  date: Date;
  image?: string;
  isReplyTo?: number;
};

export type TChatState = {
  messages: TMessage[];
  addMessage: (message: TMessage) => void;
  getLatestId: () => number;
  getMessageById: (id: number) => TMessage | undefined;
  messageIdToSrollIntoView: number | null;
  setMessageIdToSrollIntoView: (id: number) => void;
  dropMessageIdToSrollIntoView: () => void;
  lastMessageId: number | null;
  setLastMessageId: (id: number) => void;
  dropLastMessageId: () => void;
  replyMessageId: number | null;
  setReplyMessageId: (id: number) => void;
  dropReplyMessageId: () => void;
  pinMessageId: number | null;
  setPinMessageId: (id: number) => void;
  dropPinMessageId: () => void;
};

const defaultMessages = [
  {
    id: 0,
    text: 'Hello',
    username: 'bob',
    date: new Date('2023-06-01T10:00:00.000Z'),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/TelephoneHelloNellie.jpg/440px-TelephoneHelloNellie.jpg',
  },
  {
    id: 1,
    text: 'How are you?',
    username: 'bob',
    date: new Date('2023-06-01T10:05:00.000Z'),
  },
  {
    id: 2,
    text: 'Hi',
    username: 'alice',
    date: new Date('2023-06-01T11:00:00.000Z'),
  },
  {
    id: 3,
    text: "I'm fine",
    username: 'alice',
    date: new Date('2023-06-01T11:05:00.000Z'),
  },
  {
    id: 4,
    text: 'Good to hear 🙏',
    username: 'bob',
    date: new Date('2023-06-01T11:10:00.000Z'),
    isReplyTo: 3,
  },
];

export const useChatStore = create<TChatState>((set, get) => ({
  messages: defaultMessages,
  messageIdToSrollIntoView: null,
  lastMessageId: null,
  replyMessageId: null,
  pinMessageId: null,
  setMessageIdToSrollIntoView: id =>
    set(() => ({ messageIdToSrollIntoView: id })),
  dropMessageIdToSrollIntoView: () =>
    set(() => ({ messageIdToSrollIntoView: null })),
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  getLatestId: () => {
    if (get().messages.length === 0) return -1;
    return get().messages[get().messages.length - 1].id + 1;
  },
  getMessageById: id => get().messages.find(m => m.id === id),
  setLastMessageId: id => set(() => ({ lastMessageId: id })),
  dropLastMessageId: () => set(() => ({ lastMessageId: null })),
  setReplyMessageId: id => set(() => ({ replyMessageId: id })),
  dropReplyMessageId: () => set(() => ({ replyMessageId: null })),
  setPinMessageId: id => set(() => ({ pinMessageId: id })),
  dropPinMessageId: () => set(() => ({ pinMessageId: null })),
}));
