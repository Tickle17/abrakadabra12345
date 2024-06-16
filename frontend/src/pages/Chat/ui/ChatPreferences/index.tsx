import { Input, ScrollArea } from '@/shared/ui';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useChatListStore } from '@/app/store/slices/chatListSlice.ts';

export const UsersList = () => {
  const { profileData, currentChatId, setCurrentChat } = useChatListStore();
  const currentChat = currentChatId;

  const handleClick = (
    reactionId: string,
    businessId: string,
    userId: string,
    vacancyId: string
  ) => {
    setCurrentChat(reactionId, businessId, userId, vacancyId);
  };

  return (
    <ScrollArea className="w-full flex-grow max-h-full flex flex-col">
      {profileData.map((chatList, index) => (
        <div
          key={index}
          onClick={() =>
            handleClick(
              chatList.reactionId,
              chatList.businessId,
              chatList.userId,
              chatList.vacancyId
            )
          }
          className={clsx(
            'flex h-12 border border-slate-100 cursor-pointer',
            index !== 99 && 'mb-[10px]',
            chatList.reactionId === currentChat.reactionId
              ? 'bg-blue-200'
              : 'bg-slate-50'
          )}
        >
          <img
            className="shrink-0 w-12 object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg/440px-Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg"
            alt="Profile"
          />
          <div className="flex justify-center items-center flex-col w-full p-2">
            <p className="text-pretty text-xs text-slate-800">
              {chatList.vacancy}
            </p>
            <p className="font-thin text-pretty text-xs text-slate-950">
              {chatList.position}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
export const UsersStatusDetails = () => {
  return (
    <div className="shring-0 flex gap-3 items-center w-full h-max">
      <p className="text-slate-950 text-xs font-thin">
        <span className="font-normal">100</span> users
      </p>
      <p className="text-slate-950 text-xs font-thin">/</p>
      <p className="text-slate-950 text-xs font-thin">
        <span className="font-normal">15</span> online
      </p>
    </div>
  );
};

export const Controlls = () => {
  return (
    <div className="shring-0 w-full flex flex-col items-center gap-2 border-b border-slate-200 pb-2">
      <div className="w-full flex items-center gap-2 border border-slate-200 rounded-[2px] pl-3 pr-2">
        <MagnifyingGlassIcon />
        <Input
          placeholder="find user"
          className="w-full h-[33px] rounded-none text-xs border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <AddChatUser />
    </div>
  );
};

export const AddChatUser = () => {
  return (
    <button className="w-full flex items-center gap-[2px]">
      <PlusIcon />
      <p className="text-slate-950 rounded-[2px] rounded-r-none px-1 py-[1px] text-xs">
        add a user
      </p>
    </button>
  );
};

export const ChatSettings = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Controlls />
      <UsersList />
      <UsersStatusDetails />
    </div>
  );
};

export const ChatPreferences = () => {
  return (
    <div className="flex flex-col col-span-3 row-span-1 gap-4 p-6 bg-white shadow-sm">
      <ChatSettings />
    </div>
  );
};
