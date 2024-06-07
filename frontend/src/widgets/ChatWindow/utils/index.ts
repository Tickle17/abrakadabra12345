import { TMessage } from "@/app/store/slices/chatSlice";
import { TDayThread } from "../types";

const checkIfIsToday = (date: Date) : boolean => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    return diff <= 24 * 60 * 60 * 1000 && now.getDate() === date.getDate();
};

const checkIfIsYesterday = (date: Date) : boolean => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return diff > 24 * 60 * 60 * 1000 && diff <= 48 * 60 * 60 * 1000 && now.getDate() - 1 === date.getDate();
};

const rawDateToFormatted = (rawDate : Date) : string => {
    const day = rawDate.getUTCDate() >= 10 ? rawDate.getUTCDate() : `0${rawDate.getUTCDate()}`;
    const month = rawDate.getUTCMonth() + 1 >= 10 ? rawDate.getUTCMonth() + 1 : `0${rawDate.getUTCMonth() + 1}`;
    const year = rawDate.getUTCFullYear();
    return `${day}.${month}.${year}`;
};

export const getFormattedDate = (date: Date) : string => {
    switch (true) {
        case checkIfIsToday(date):
            return 'Today';
        case checkIfIsYesterday(date):
            return 'Yesterday';
        default:
            return rawDateToFormatted(date);
    };
};

export const getFormattedTime = (date: Date) : string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const splitMessagesToDateThreads = (messageList: TMessage[]): TDayThread[] => {
    const dateMap = new Map<string, TMessage[]>();
  
    messageList.forEach((message) => {
      const dateStr = message.date.toISOString().split('T')[0];
      
      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, []);
      }
      dateMap.get(dateStr)!.push(message);
    });
  
    const dayThreads: TDayThread[] = [];
    dateMap.forEach((messages) => {
      dayThreads.push({
        messageList: messages,
      });
    });
  
    return dayThreads;
  };