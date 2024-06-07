import clsx from 'clsx';
import { PMessage } from '../types';
import { getFormattedTime } from '../utils';
import { AnimatedImage } from './AnimatedImage';
import { useChatStore, useUserStore, useImageModalStore } from '@/app/store';
import { useEffect, useRef } from 'react';
import {
  DotsHorizontalIcon,
  ResetIcon,
  ClipboardCopyIcon,
  DrawingPinIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { toast } from 'sonner';

const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast('Text copied to clipboard');
  } catch (error) {
    toast('Error copying to clipboard');
  }
};

export const MessageContextMenu = ({
  messageId,
  messageText,
}: {
  messageId: number;
  messageText: string;
}) => {
  const { setReplyMessageId, setPinMessageId } = useChatStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsHorizontalIcon className="w-3 h-3 pt-[2px] transition-all hover:cursor-pointer hover:opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs text-slate-800">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setReplyMessageId(messageId)}
          className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
        >
          <ResetIcon className="w-[10px] h-[10px]" />
          Reply
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyTextToClipboard(messageText)}
          className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
        >
          <ClipboardCopyIcon className="w-[10px] h-[10px]" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setPinMessageId(messageId);
          }}
          className="text-xs text-slate-800 font-thin hover:cursor-pointer flex items-center gap-[5px]"
        >
          <DrawingPinIcon className="w-[10px] h-[10px]" />
          Pin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Message = ({
  id,
  text,
  image,
  date,
  replyMessageId,
  messageThreadRef,
}: PMessage) => {
  const formattedTime = getFormattedTime(date);
  const { openModalWithImage } = useImageModalStore();
  const {
    getMessageById,
    messageIdToSrollIntoView,
    setMessageIdToSrollIntoView,
    dropMessageIdToSrollIntoView,
    lastMessageId,
  } = useChatStore();
  const { getByUsername } = useUserStore();
  const replyMessage = replyMessageId
    ? getMessageById(replyMessageId)
    : undefined;
  const user = replyMessage?.username
    ? getByUsername(replyMessage.username)
    : undefined;
  const formattedName = user ? user.formattedName : undefined;
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageThreadRef.current && messageIdToSrollIntoView === id) {
      messageThreadRef.current.scrollIntoView({ behavior: 'smooth' });
      dropMessageIdToSrollIntoView();
    }
  }, [messageIdToSrollIntoView]);

  useEffect(() => {
    if (messageRef.current && lastMessageId === id) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessageId]);

  return (
    <div className="w-full flex flex-col gap-3">
      {replyMessage !== undefined && (
        <div
          ref={messageRef}
          className={clsx(
            'w-full flex flex-col gap-3',
            image !== undefined && 'mb-[10px]'
          )}
        >
          <div
            onClick={() => {
              replyMessageId !== undefined &&
                setMessageIdToSrollIntoView(replyMessageId);
            }}
            className="w-fit flex flex-col gap-1 ml-[60px] pl-3 border-l border-slate-950 font-thin hover:cursor-pointer hover:opacity-50 transition-all"
          >
            <p className="text-xs text-slate-500 font-thin">{formattedName}</p>
            <p className="text-xs text-slate-500 font-thin">
              {replyMessage.text}
            </p>
          </div>
          <div className="w-full flex items-center gap-3">
            <p className="w-12 leading-[6px] text-[8px] font-thin text-slate-800 text-center pt-[1.75px]">
              {formattedTime}
            </p>
            <p className="text-xs text-slate-800 flex gap-2 items-center">
              {text}
              <MessageContextMenu messageId={id} messageText={text} />
            </p>
          </div>
          {image !== undefined && (
            <div className="w-full flex justify-center pl-[60px]">
              <AnimatedImage
                imageUrl={image}
                onClick={() => openModalWithImage(image)}
              />
            </div>
          )}
        </div>
      )}

      {replyMessage === undefined && text && (
        <div
          ref={messageRef}
          className={clsx(
            'w-full flex flex-col gap-3',
            image !== undefined && 'mb-[10px]'
          )}
        >
          <div className="w-full flex items-center gap-3">
            <p className="w-12 leading-[6px] text-[8px] font-thin text-slate-800 text-center pt-[1.75px]">
              {formattedTime}
            </p>
            <p className="text-xs text-slate-800 flex gap-2 items-center">
              {text}
              <MessageContextMenu messageId={id} messageText={text} />
            </p>
          </div>
          {image !== undefined && (
            <div className="w-full flex justify-center pl-[60px]">
              <AnimatedImage
                imageUrl={image}
                onClick={() => openModalWithImage(image)}
              />
            </div>
          )}
        </div>
      )}
      {replyMessage === undefined && text.length === 0 && (
        <div
          ref={messageRef}
          className={clsx('w-full flex', image !== undefined && 'mb-[10px]')}
        >
          <p className="w-12 leading-[6px] text-[8px] font-thin text-slate-800 text-center pt-[3.5px] ml-[2.5px]">
            {formattedTime}
          </p>
          {image !== undefined && (
            <div className="w-full flex justify-center pl-[18px]">
              <AnimatedImage
                imageUrl={image}
                onClick={() => openModalWithImage(image)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
