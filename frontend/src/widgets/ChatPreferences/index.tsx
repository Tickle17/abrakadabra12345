import { ScrollArea, Input } from "@/shared/ui";
import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export const ChatRadioGroup = () => {
    return (
        <div className='h-full w-full grid grid-cols-2'>
            <button className='bg-slate-200 text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs'>Settings</button>
            <button className='bg-slate-950 text-slate-200 rounded-[2px] rounded-l-none px-1 py-[1px] text-xs'>Chat List</button>
        </div>
    );
};

export const UsersList = () => {
    return (
        <ScrollArea className='w-full flex-grow max-h-full flex flex-col'>
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
    );
};

export const UsersStatusDetails = () => {
    return (
        <div className='shring-0 flex gap-3 items-center w-full h-max'>
            <p className='text-slate-950 text-xs font-thin'><span className="font-normal">100</span> users</p>
            <p className='text-slate-950 text-xs font-thin'>/</p>
            <p className='text-slate-950 text-xs font-thin'><span className="font-normal">15</span> online</p>
        </div>
    )
}

export const Controlls = () => {
    return (
        <div className="shring-0 w-full flex flex-col items-center gap-2 border-b border-slate-200 pb-2">
            <div className="w-full flex items-center gap-2 border border-slate-200 rounded-[2px] pl-3 pr-2">
                <MagnifyingGlassIcon />
                <Input placeholder='find user' className="w-full h-[33px] rounded-none text-xs border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
            </div>
            <AddChatUser />
        </div>
    )
}

export const AddChatUser = () => {
    return (
        <button className="w-full flex items-center gap-[2px]">
            <PlusIcon />
            <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs">add a user</p>
        </button>
    );
};

export const ChatSettings = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <Controlls />
            <UsersList />
            <UsersStatusDetails />
        </div>
    );
};

export const ChatPreferences = () => {
    return (
        <div className='flex flex-col col-span-3 row-span-1 gap-4 p-6 bg-white shadow-sm'>
            <ChatSettings />
        </div>
    )
};