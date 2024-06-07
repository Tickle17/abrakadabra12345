import { TMessage } from '@/app/store/slices/chatSlice';
import { TUser } from '@/app/store/slices/userSlice';

export type PMessageThread = {
    user: TUser;
    messageList: TMessage[];
};

export type PMessageWidnow = {
    messageList: TMessage[];
};

export type TDayThread = {
    messageList: TMessage[];
};

export type PMessage = {
    id: number;
    text: string;
    date: Date;
    messageThreadRef: React.RefObject<HTMLDivElement>;
    image?: string;
    replyMessageId?: number;
};