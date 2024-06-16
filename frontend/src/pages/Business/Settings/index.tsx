import { AppLayout } from '@/shared/layouts';
import { CalendarSettings } from '@/pages/Business/Settings/ui/calendarSettings.tsx';
import { AutoMessageSettings } from '@/pages/Business/Settings/ui/autoMessage.tsx';
import { CreateWorkers } from '@/pages/Business/Settings/ui/createWorkers.tsx';

export const Settings = () => {
  return (
    <AppLayout>
      <div className="col-span-9 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm border-radius-default p-4">
        <div className="grid grid-cols-2 gap-5 row-span-2">
          <CalendarSettings />
          <AutoMessageSettings />
          <CreateWorkers />
        </div>
      </div>

      <div className="flex flex-col gap-4 col-span-3 p-6 bg-white shadow-sm border-radius-default"></div>
    </AppLayout>
  );
};
