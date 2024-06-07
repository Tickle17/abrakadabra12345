import { AppLayout } from '@/shared/layouts';
import {
  ChatPreferences,
  ChatWindow,
  ChatSettings,
  ImageModal,
} from '@/widgets';

export const Chat = () => {
  return (
    <AppLayout>
      <ImageModal />
      <ChatPreferences />
      <ChatWindow />
      <ChatSettings />
    </AppLayout>
  );
};
