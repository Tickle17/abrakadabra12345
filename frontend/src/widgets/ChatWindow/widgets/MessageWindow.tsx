import { ScrollArea } from '@/shared/ui';
import { DateThread } from '../components/DateThread';
import { splitMessagesToDateThreads } from '../utils';
import { PMessageWidnow } from '../types';
import { useChatStore } from '@/app/store';
import { TMessage } from '@/app/store/slices/chatSlice';
import { useEffect, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';

export const MessageWindow = ({ messageList }: PMessageWidnow) => {
  const messagesSplittedByDay = splitMessagesToDateThreads(messageList);
  const {
    pinMessageId,
    dropPinMessageId,
    getMessageById,
    setMessageIdToSrollIntoView,
  } = useChatStore();
  const [pinnedMessage, setPinnedMessage] = useState<TMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (pinMessageId) {
      setPinnedMessage(getMessageById(pinMessageId));
    } else {
      setPinnedMessage(undefined);
    }
  }, [pinMessageId]);

  return (
    <ScrollArea className="flex-grow flex-shrink w-full h-full flex flex-col relative">
      {pinMessageId && (
        <div className="absolute inset-0 w-full h-10 bg-slate-100 z-40 flex justify-center items-center px-3 py-1 gap-1">
          <div
            onClick={() => setMessageIdToSrollIntoView(pinMessageId)}
            className="w-full flex justify-center items-center gap-3 hover:cursor-pointer"
          >
            <p className="text-xs text-slate-950">{`@${pinnedMessage?.username}`}</p>
            <p className="text-xs text-slate-950">{pinnedMessage?.text}</p>
          </div>
          <Cross1Icon
            className="w-3 h-3 hover:cursor-pointer hover:opacity-50 transition-all"
            onClick={() => dropPinMessageId()}
          />
        </div>
      )}
      <div className={clsx('flex flex-col', pinMessageId && 'pt-12')}>
        {messagesSplittedByDay.map((dateThread, index) => (
          <DateThread key={index} messageList={dateThread.messageList} />
        ))}
      </div>
    </ScrollArea>
  );
};
