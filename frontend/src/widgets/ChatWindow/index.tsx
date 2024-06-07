import { useChatStore } from '@/app/store/slices/chatSlice';
import { MessageWindow, MessageSender } from './widgets';


export const ChatWindow = () => {
    const { messages } = useChatStore();
    return (
        <div className='flex flex-col gap-3 col-span-6 p-6 bg-white shadow-sm'>
            <MessageWindow messageList={messages} />
            <MessageSender />
        </div>
    );
}