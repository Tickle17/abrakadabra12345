import { AppLayout } from '@/shared/layouts';
import {
  ChatPreferences,
  ChatSettings,
  ChatWindow,
  ImageModal,
} from '@/widgets';
import FetchChatList from '@/widgets/FetchData/fetchChatList.tsx';

export const Chat = () => {
  FetchChatList();
  return (
    <AppLayout>
      <ImageModal />
      <ChatPreferences />
      <ChatWindow />
      <ChatSettings />
    </AppLayout>
  );
};
