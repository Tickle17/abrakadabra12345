import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { useCallback, useEffect, useState } from 'react';
import FetchCalendarById from '@/widgets/FetchData/fetchCalendarById.ts';

export type Calendar = {
  duration: number;
  freeTime: number;
  dayStart: number;
  dayEnd: number;
  slots: number;
  maxReserveDays: number;
  workingDays: [];
};

export function CalendarSettings() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  const fetchCalendar = useCallback(async () => {
    const calendarData = await FetchCalendarById();
    setCalendar(calendarData);
  }, []);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>Календарь</CardTitle>
        <CardDescription>Отрегулируйте свое расписание</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <CardDescription>Продолжительность собеседований</CardDescription>
            <CardTitle>{calendar?.duration}</CardTitle>
          </div>
          <div className="flex flex-col gap-2">
            <CardDescription>Делай между собеседованиями</CardDescription>
            <CardTitle>{calendar?.freeTime}</CardTitle>
          </div>
        </div>
        <div className="flex align-center justify-end gap-4"></div>
      </CardContent>
      <CardFooter className="p-2 flex align-center w-full gap-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <Button>Изменить</Button>
          </div>
          <div className="flex gap-2">
            <div>
              <CardDescription>Начало дня</CardDescription>
              <CardTitle>{calendar?.dayStart}</CardTitle>
            </div>
            <div>
              <CardDescription>Конец дня</CardDescription>
              <CardTitle>{calendar?.dayEnd}</CardTitle>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
