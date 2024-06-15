import React, { useState } from 'react';
import {
  Messages,
  useChatListStore,
} from '@/app/store/slices/chatListSlice.ts';
import { CardDescription } from '@/shared/ui';
import {
  checkPosition,
  createSlots,
  Index,
  SendSlotRequest,
} from '@/pages/Chat/ui/ChatWindow/feature';
import { ChatInputBlock } from '@/pages/Chat/ui/ChatWindow/ui/ChatInputBlock.tsx';
import { addDays, format } from 'date-fns';
import { PopUp } from './ui/PopUp';

export const ChatWindow: React.FC = () => {
  const { currentChatId, profileData } = useChatListStore();
  const currentMessages = useChatListStore(state => state.messages);
  const filteredChatData = profileData.find(
    chat => chat.reactionId === currentChatId.reactionId
  );
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedCommunication, setSelectedCommunication] = useState<
    string | null
  >(null);
  const isMessageRightAligned = checkPosition(id, currentChatId);

  const handleSendMessage = Index(message, id, currentChatId, setMessage);

  const getNextDays = (maxDays: number) => {
    const days = [];
    for (let i = 0; i <= maxDays; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };

  let availableDays: Date[] = [];
  if (filteredChatData && role !== 'business') {
    const newFilter = filteredChatData.calendarData;
    availableDays = getNextDays(newFilter.maxReserveDays).filter(date => {
      const dayOfWeek = format(date, 'EEEE').toUpperCase();
      return newFilter.workingDays.some(
        day => day.day === dayOfWeek && day.isWorking
      );
    });
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  const shouldDisable = currentMessages.length <= 0 && role === 'users';

  const convertToMinutes = (time: number) => {
    const hours = Math.floor(time);
    const minutes = (time - hours) * 100;
    return hours * 60 + minutes;
  };
  const generateTimeSlots = createSlots(convertToMinutes);
  const sendSlotRequest = SendSlotRequest(
    selectedDate,
    selectedSlot,
    filteredChatData
  );

  let timeSlots: string[] = [];
  if (filteredChatData && role !== 'business') {
    const { dayStart, slots, duration, freeTime } =
      filteredChatData.calendarData;
    timeSlots = generateTimeSlots(dayStart, slots, duration, freeTime);
  }

  const communicationMethods = ['Google Meet', 'Zoom', 'Telegram'];

  return (
    <div className="flex flex-col gap-3 col-span-6 p-6 bg-white shadow-sm">
      <div className="flex-grow overflow-auto">
        {currentMessages
          .filter(message => message.message && message.message.trim() !== '')
          .map((message: Messages) => (
            <div
              key={message.id}
              className={`flex ${isMessageRightAligned(message) ? ' flex-col items-end' : 'justify-start'}`}
            >
              <div>
                <div className="flex flex-col max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100">
                  <p>
                    <strong>
                      {isMessageRightAligned(message)
                        ? 'Отправитель'
                        : 'Получатель'}
                    </strong>{' '}
                    {message.senderId}
                  </p>
                  <p>{message.message}</p>
                  <p className="flex justify-end">
                    <small>
                      {format(message.createdAt, 'dd.MM.yyyy HH:mm')}
                    </small>
                  </p>
                </div>
                {!isMessageRightAligned(message) &&
                  role !== 'business' &&
                  PopUp(
                    selectedDate,
                    filteredChatData,
                    availableDays,
                    setSelectedDate,
                    formatDate,
                    selectedSlot,
                    timeSlots,
                    setSelectedSlot,
                    selectedCommunication,
                    communicationMethods,
                    setSelectedCommunication,
                    sendSlotRequest
                  )}
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
      {ChatInputBlock(message, setMessage, shouldDisable, handleSendMessage)}
    </div>
  );
};
