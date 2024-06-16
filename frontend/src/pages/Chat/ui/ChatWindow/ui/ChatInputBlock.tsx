import { Button } from '@/shared/ui';

export function ChatInputBlock(
  message: string,
  setMessage: {
    (value: string | { (prevState: string): string }): void;
  },
  shouldDisable: boolean,
  handleSendMessage: () => Promise<void>
) {
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className={`flex-grow p-2 border rounded-lg ${shouldDisable ? 'bg-gray-300' : 'bg-white'}`}
        style={{ backgroundColor: 'white', fontSize: 12 }}
        placeholder="Начните писать сообщение..."
        disabled={shouldDisable}
      />
      <Button
        onClick={handleSendMessage}
        className={
          shouldDisable
            ? 'bg-slate-200 text-xs rounded-[2px] cursor-not-allowed'
            : ''
        }
        disabled={shouldDisable}
      >
        Отправить
      </Button>
    </div>
  );
}
