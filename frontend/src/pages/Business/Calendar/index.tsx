import { AppLayout } from '@/shared/layouts';
import { CalendarPage, CalendarCreation } from './ui';
import { useProfileStore } from '@/app/store';

export const Calendar = () => {
  const { calendarid } = useProfileStore();
  return (
    <AppLayout>
      <div className="bg-white shadow-sm p-5 border-radius-default col-span-12 min-h-fit">
        {calendarid && <CalendarCreation />}
        {!calendarid && <CalendarPage />}
      </div>
    </AppLayout>
  );
};
