// import { TMessage } from '@/app/store/slices/chatSlice';
// import { TUser, useUserStore } from '@/app/store/slices/userSlice';
// // import { MessageThread } from './MessageThread';
// import { getFormattedDate } from '../utils';

// export type TDayThread = {
//   date: Date;
//   messageList: TMessage[];
// };

// export type PDateThread = {
//   messageList: TMessage[];
// };

// export type NonEmptyArray<T> = [T, ...T[]];

// export const getStartDate = (messageList: TMessage[]): Date => {
//   return messageList[0].date;
// };

// export type DateThreads = {
//   date: Date;
//   messageList: TMessage[];
// };

// export type TMessageThread = {
//   user: TUser;
//   messageList: TMessage[];
// };

// const splitMessagesToThreads = (messageList: TMessage[]): TMessageThread[] => {
//   const { getByUsername } = useUserStore();

//   const threads: TMessageThread[] = [];
//   let currentThread: TMessageThread | null = null;

//   messageList.forEach(message => {
//     const user = getByUsername(message.username);
//     if (!user) return;

//     if (currentThread && currentThread.user === user) {
//       currentThread.messageList.push(message);
//     } else {
//       if (currentThread) {
//         threads.push(currentThread);
//       }
//       currentThread = {
//         user,
//         messageList: [message],
//       };
//     }
//   });

//   if (currentThread) {
//     threads.push(currentThread);
//   }

//   return threads;
// };

// export const DateThread = ({ messageList }: PDateThread) => {
//   const rawStartDate = getStartDate(messageList);
//   const formattedStartDate = getFormattedDate(rawStartDate);
//   const messageThreads = splitMessagesToThreads(messageList);

//   return (
//     <div className="w-full h-auto flex flex-col">
//       <div className="w-full h-auto flex flex-col gap-3">
//         <div className="w-full flex items-center justify-center text-xs text-slate-800">
//           {formattedStartDate}
//         </div>
//         {messageThreads.map((threadData, index) => (
//           <MessageThread
//             key={index}
//             user={threadData.user}
//             messageList={threadData.messageList}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
