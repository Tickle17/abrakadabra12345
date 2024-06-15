// import { useChatStore, useImageModalStore } from '@/app/store';
// import { TMessage } from '@/app/store/slices/chatSlice';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   Input,
// } from '@/shared/ui';
// import {
//   PlusCircledIcon,
//   LetterCaseCapitalizeIcon,
//   FaceIcon,
//   FontBoldIcon,
//   FontItalicIcon,
//   StrikethroughIcon,
//   UnderlineIcon,
//   Link1Icon,
//   ListBulletIcon,
//   QuoteIcon,
//   CodeIcon,
//   PaperPlaneIcon,
//   Cross2Icon,
// } from '@radix-ui/react-icons';
// import { useEffect, useRef, useState } from 'react';
// import { useUserStore } from '@/app/store';

// export const SmilesContextMenu = ({
//   updateMessageText,
// }: {
//   updateMessageText: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <FaceIcon className="w-4 h-4 hover:cursor-pointer hover:opacity-50 transition-all" />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="flex items-center gap-1">
//         <DropdownMenuItem
//           onClick={() => updateMessageText(message => message + '👍')}
//           className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
//         >
//           👍
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => updateMessageText(message => message + '👎')}
//           className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
//         >
//           👎
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => {
//             updateMessageText(message => message + '🙌');
//           }}
//           className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
//         >
//           🙌
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => {
//             updateMessageText(message => message + '🙏');
//           }}
//           className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
//         >
//           🙏
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export const MessageSender = () => {
//   const [showMdOptions, setShowMdOptions] = useState(true);
//   const [text, setText] = useState('');
//   const [image, setImageUrl] = useState<string | undefined>(undefined);
//   const { addMessage, setLastMessageId } = useChatStore();
//   const { openModalWithImage } = useImageModalStore();
//   const { replyMessageId, dropReplyMessageId, getMessageById } = useChatStore();
//   const { getByUsername } = useUserStore();
//   const [replyMessage, setReplyMessage] = useState<TMessage | undefined>(
//     undefined
//   );
//   const [replyMessageAuthorFormattedName, setReplyMessageAuthorFormattedName] =
//     useState<string | undefined>(undefined);

//   useEffect(() => {
//     if (replyMessageId) {
//       setReplyMessage(getMessageById(replyMessageId));
//     } else {
//       setReplyMessage(undefined);
//     }
//   }, [replyMessageId]);

//   useEffect(() => {
//     if (replyMessage) {
//       setReplyMessageAuthorFormattedName(
//         getByUsername(replyMessage?.username)?.formattedName
//       );
//     } else {
//       setReplyMessageAuthorFormattedName(undefined);
//     }
//   }, [replyMessage]);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const handleAddMessage = () => {
//     if (text || image) {
//       const id = useChatStore.getState().getLatestId() + 1;
//       addMessage({
//         id,
//         text,
//         date: new Date(),
//         username: 'admin',
//         image: image,
//         isReplyTo: replyMessageId ? replyMessageId : undefined,
//       });
//       setText('');
//       setImageUrl(undefined);
//       setLastMessageId(id);
//       dropReplyMessageId();
//       setReplyMessageAuthorFormattedName(undefined);
//     }
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (!reader.result) return;
//         setImageUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleIconClick = () => {
//     if (!fileInputRef.current) return;
//     fileInputRef.current.click();
//   };
//   return (
//     <div className="flex-shrink-0 flex flex-col gap-1 items-center w-full border border-slate-950 rounded-sm">
//       {showMdOptions && (
//         <div className="w-full flex items-center gap-2 bg-slate-50 rounded-t-sm px-3 py-2">
//           <FontBoldIcon />
//           <FontItalicIcon />
//           <StrikethroughIcon />
//           <UnderlineIcon />
//           <p className="h-full text-xs font-thin border-[0.5px] border-slate-300 mx-1"></p>
//           <Link1Icon />
//           <p className="h-full text-xs font-thin border-[0.5px] border-slate-300 mx-1"></p>
//           <ListBulletIcon />
//           <p className="h-full text-xs font-thin border-[0.5px] border-slate-300 mx-1"></p>
//           <QuoteIcon />
//           <CodeIcon />
//         </div>
//       )}
//       {replyMessage && replyMessageAuthorFormattedName && (
//         <div className="w-full flex px-3">
//           <div className="w-fit flex flex-col gap-1 pl-3 border-l border-slate-950 font-thin relative">
//             <Cross2Icon
//               className="absolute top-[5px] -right-[2px] bg-white rounded-full border border-slate-950 z-40 w-3 h-3 hover:cursor-pointer transition-all"
//               onClick={() => {
//                 setReplyMessage(undefined);
//                 setReplyMessageAuthorFormattedName(undefined);
//               }}
//             />
//             <p className="text-xs text-slate-500 font-thin">
//               {replyMessageAuthorFormattedName}
//             </p>
//             <p className="text-xs text-slate-500 font-thin">
//               {replyMessage.text}
//             </p>
//           </div>
//         </div>
//       )}
//       <Input
//         className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-xs"
//         placeholder="Start typing..."
//         value={text}
//         onInput={e => setText(e.currentTarget.value)}
//         onKeyDown={e => e.key === 'Enter' && handleAddMessage()}
//       />
//       {image && (
//         <div className="w-full flex px-3">
//           <div className="w-fit relative">
//             <Cross2Icon
//               className="absolute -top-[2px] -right-[2px] bg-white rounded-full border border-slate-950 z-40 w-3 h-3 hover:cursor-pointer transition-all"
//               onClick={() => setImageUrl(undefined)}
//             />
//             <img
//               src={image}
//               alt="image"
//               className="w-full max-w-[50px] h-auto hover:cursor-pointer hover:opacity-75 transition-all"
//               onClick={() => openModalWithImage(image)}
//             />
//           </div>
//         </div>
//       )}
//       <div className="w-full flex items-center gap-2 px-3 py-2">
//         <PlusCircledIcon
//           className="w-4 h-4 hover:cursor-pointer hover:opacity-50 transition-all"
//           onClick={handleIconClick}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <SmilesContextMenu updateMessageText={setText} />
//         <LetterCaseCapitalizeIcon
//           className="w-4 h-4 hover:cursor-pointer hover:opacity-50 transition-all"
//           onClick={() => setShowMdOptions(!showMdOptions)}
//         />
//         <PaperPlaneIcon
//           className="w-4 h-4 ml-auto hover:cursor-pointer hover:opacity-50 transition-all"
//           onClick={handleAddMessage}
//         />
//       </div>
//     </div>
//   );
// };
