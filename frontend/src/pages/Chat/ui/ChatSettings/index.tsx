import { Input } from '@/shared/ui';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';

export const ChatSettings = () => {
  return (
    <div className="col-span-3 flex flex-col gap-3">
      <div className="shrink-0 bg-white shadow-xs p-6 flex flex-col gap-2">
        <div className="w-full flex items-center gap-2 border border-slate-200 rounded-[2px] pl-3 pr-2">
          <MagnifyingGlassIcon />
          <Input
            placeholder="найти пользователя"
            className="w-full h-[33px] rounded-none text-xs border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex gap-3 items-center">
          <button className="w-full flex items-center gap-[2px]">
            <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs underline">
              text
            </p>
            <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs">
              username
            </p>
            <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs">
              date
            </p>
          </button>
        </div>
      </div>
      <div className="flex-grow shrink bg-white shadow-xs p-6 flex flex-col gap-4">
        <div className="w-full flex items-center gap-2 border border-slate-200 rounded-[2px] pl-3 pr-2">
          <MagnifyingGlassIcon />
          <Input
            placeholder="найти чат"
            className="w-full h-[33px] rounded-none text-xs border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <button className="w-full flex items-center gap-[2px] border-b border-slate-200 pb-2">
          <PlusIcon />
          <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs">
            add a chat
          </p>
        </button>
        {/*
                <ScrollArea className='w-full h-[10px] max-h-full flex flex-col'>
                {Array.from({ length: 100 }).map((_, index) => (
                    <div key={index} className={clsx('flex h-12 border border-slate-100', index !== 99 && 'mb-[10px]')}>
                        <img className='shrink-0 w-12 object-cover' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg/440px-Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg' />
                        <div className="flex justify-center items-center flex-col w-full p-2 bg-slate-50">
                            <p className='text-pretty text-xs text-slate-800'>Baldassare Castiglione</p>
                            <p className='font-thin text-pretty text-xs text-slate-950'>@baldassarecastiglione</p>
                        </div>
                    </div>
                ))}
                </ScrollArea>
                */}
      </div>
    </div>
  );
};
