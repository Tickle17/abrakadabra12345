import { toast } from 'sonner';
import axios from 'axios';
import {
  Messages,
  TChatList,
  TChatListCurrentUser,
} from '@/app/store/slices/chatListSlice.ts';
import { addMinutes, format } from 'date-fns';

export function Index(
  message: string,
  id: null | string,
  currentChatId: TChatListCurrentUser,
  setMessage: {
    (value: string | { (prevState: string): string }): void;
  }
) {
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
  return handleSendMessage;
}

export function SendSlotRequest(
  selectedDate: null | Date,
  selectedSlot: null | string,
  filteredChatData: undefined | TChatList
) {
  const sendSlotRequest = async (slotNumber: number, communication: string) => {
    if (!selectedDate || !selectedSlot || !filteredChatData) return;

    const dayOfWeek = format(selectedDate, 'EEEE').toUpperCase();
    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedSlot.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes);

    const requestBody = {
      slot: slotNumber,
      free: false,
      userId: filteredChatData.userId,
      communication,
      acceptingByUser: false,
      calendarId: filteredChatData.calendarData.id,
      vacancyId: filteredChatData.vacancyId,
      dayOfWeek,
      date: selectedDateTime.toISOString(),
    };

    try {
      const response = await axios.post(
        'https://backendhackaton.onrender.com/slot',
        requestBody
      );
      window.location.reload();
      console.log('Slot booked successfully:', response.data);
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };
  return sendSlotRequest;
}

export function checkPosition(
  id: null | string,
  currentChatId: TChatListCurrentUser
) {
  const isMessageRightAligned = (message: Messages) => {
    if (id === currentChatId.userId) {
      return message.senderType === 'users';
    } else if (id === currentChatId.businessId) {
      return message.senderType === 'business';
    }
    return false;
  };
  return isMessageRightAligned;
}

export function createSlots(convertToMinutes: (time: number) => number) {
  const generateTimeSlots = (
    dayStart: number,
    slots: number,
    duration: number,
    freetime: number
  ) => {
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    startTime.setMinutes(convertToMinutes(dayStart));
    const timeSlots = [format(startTime, 'HH:mm')];

    for (let i = 1; i < slots; i++) {
      const nextTime = addMinutes(
        startTime,
        convertToMinutes(duration + freetime) * i
      );
      timeSlots.push(format(nextTime, 'HH:mm'));
    }

    return timeSlots;
  };
  return generateTimeSlots;
}
