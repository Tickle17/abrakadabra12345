import { useRef } from "react";
import { PMessageThread } from "../types";
import { Message } from "./Message";

export const MessageThread = ({ user, messageList }: PMessageThread) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className='w-full flex flex-col gap-1 mb-3'>
            <div className='flex gap-3 items-center'>
                <img src={ user.avatar } alt={ `${user.username} avatar` } className='w-12 h-12 rounded-full object-cover' />
                <div className='flex flex-col gap-[1px]'>
                    <h3 className='text-sm font-semibold'>{ user.formattedName }</h3>
                    <p className='text-xs font-thin text-slate-800'>{ `@${user.username} `}</p>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                { messageList.map((message, index) => (
                    <Message 
                        key={index} 
                        id={message.id}
                        text={message.text} 
                        image={message.image} 
                        date={message.date} 
                        replyMessageId={message.isReplyTo} 
                        messageThreadRef={ref}
                    />
                ))}
            </div>
        </div>
    );
};