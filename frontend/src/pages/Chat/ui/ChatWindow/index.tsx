import React, { useState } from 'react';
import axios from 'axios';
import {
  Messages,
  useChatListStore,
} from '@/app/store/slices/chatListSlice.ts';
import { toast } from 'sonner';
import { Button, CardDescription } from '@/shared/ui';

export const ChatWindow: React.FC = () => {
  const currentMessages = useChatListStore(state => state.messages);
  const currentChatId = useChatListStore(state => state.currentChatId);
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  const [message, setMessage] = useState('');

  const isMessageRightAligned = (message: Messages) => {
    if (id === currentChatId.userId) {
      return message.senderType === 'users';
    } else if (id === currentChatId.businessId) {
      return message.senderType === 'business';
    }
    return false;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast('Message cannot be empty');
      return;
    }

    const senderType = id === currentChatId.userId ? 'users' : 'business';

    const newMessage = {
      reactionsVacancyId: currentChatId.reactionId,
      senderType,
      senderId: id,
      message,
    };

    try {
      const response = await axios.post(
        'https://backendhackaton.onrender.com/message',
        newMessage
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('');
      } else {
        toast('Failed to send message');
      }
    } catch (error) {
      toast('Failed to send message');
      console.error(error);
    }
  };

  const shouldDisable = currentMessages.length <= 0 && role === 'users';

  return (
    <div className="flex flex-col gap-3 col-span-6 p-6 bg-white shadow-sm">
      <div className="flex-grow overflow-auto">
        {currentMessages
          .filter(message => message.message && message.message.trim() !== '')
          .map((message: Messages) => (
            <div
              key={message.id}
              className={`flex ${isMessageRightAligned(message) ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100">
                <p>
                  <strong>Sender:</strong> {message.senderId}
                </p>
                <p>{message.message}</p>
                <p>
                  <small>{message.createdAt}</small>
                </p>
              </div>
            </div>
          ))}
        {currentMessages.length <= 0 && (
          <CardDescription>
            {role === 'users'
              ? 'Ваш отклик еще изучают, ожидайте, пожалуйста, обратной связи'
              : 'Пользователь еще не получил ответ'}
          </CardDescription>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={`flex-grow p-2 border rounded-lg ${shouldDisable ? 'bg-gray-300' : 'bg-white'}`}
          placeholder="Type your message..."
          disabled={shouldDisable}
        />
        <Button
          onClick={handleSendMessage}
          className={shouldDisable ? 'bg-gray-300 cursor-not-allowed' : ''}
          disabled={shouldDisable}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
