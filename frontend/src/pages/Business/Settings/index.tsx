import { AppLayout } from '@/shared/layouts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { CalendarSettings } from '@/pages/Business/Settings/ui/calendarSettings.tsx';

export const Settings = () => {
  return (
    <AppLayout>
      <div className="col-span-9 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm border-radius-default p-4">
        <div className="grid grid-cols-2 gap-5 row-span-2">
          {CalendarSettings()}
          <Card>
            <CardHeader className="p-2">
              <CardTitle>Авто - сообщения</CardTitle>
              <CardDescription>
                Настройте отправку автосообщений
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <p>Card Content</p>
            </CardContent>
            <CardFooter className="p-2">
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4 col-span-3 p-6 bg-white shadow-sm border-radius-default"></div>
    </AppLayout>
  );
};
