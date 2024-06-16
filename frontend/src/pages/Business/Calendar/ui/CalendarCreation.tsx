import { formSchema } from '../schema.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/input.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form.tsx';
import { Button } from '@/shared/ui/button.tsx';
import axios, { AxiosResponse } from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useProfileStore } from '@/app/store';

const days = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

const getDayInRussian = (day: string) => {
  switch (day) {
    case 'MONDAY':
      return 'ПН';
    case 'TUESDAY':
      return 'ВТ';
    case 'WEDNESDAY':
      return 'СР';
    case 'THURSDAY':
      return 'ЧТ';
    case 'FRIDAY':
      return 'ПТ';
    case 'SATURDAY':
      return 'СБ';
    case 'SUNDAY':
      return 'ВС';
    default:
      return 'ПН';
  }
};

// TODO add loader to the button
const convertStringTimeToFloat = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const timeInHours = hours + minutes / 60;
  return parseFloat(timeInHours.toFixed(2));
};

const convertMinutesTimeToFloat = (timeString: string): number => {
  const hours = parseFloat(timeString) / 60;
  return parseFloat(hours.toFixed(2));
};

export const CalendarCreation = () => {
  const { setCalendarId } = useProfileStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: '',
      freeTime: '',
      dayStart: '',
      dayEnd: '',
      maxReservDays: '',
      MONDAY: true,
      TUESDAY: true,
      WEDNESDAY: true,
      THURSDAY: true,
      FRIDAY: true,
      SATURDAY: false,
      SUNDAY: false,
      businessId: localStorage.getItem('id') || '',
    },
    mode: 'onSubmit',
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = (rawData: z.infer<typeof formSchema>) => {
    const result = {
      duration: convertMinutesTimeToFloat(rawData.duration),
      freeTime: convertMinutesTimeToFloat(rawData.freeTime),
      dayStart: convertStringTimeToFloat(rawData.dayStart),
      dayEnd: convertStringTimeToFloat(rawData.dayEnd),
      maxReservDays: parseInt(rawData.maxReservDays),
      businessId: rawData.businessId,
      userId: null,
      workingDays: [
        {
          day: 'MONDAY',
          isWorking: rawData.MONDAY,
        },
        {
          day: 'TUESDAY',
          isWorking: rawData.TUESDAY,
        },
        {
          day: 'WEDNESDAY',
          isWorking: rawData.WEDNESDAY,
        },
        {
          day: 'THURSDAY',
          isWorking: rawData.THURSDAY,
        },
        {
          day: 'FRIDAY',
          isWorking: rawData.FRIDAY,
        },
        {
          day: 'SATURDAY',
          isWorking: rawData.SATURDAY,
        },
        {
          day: 'SUNDAY',
          isWorking: rawData.SUNDAY,
        },
      ],
    };
    axios
      .post('https://backendhackaton.onrender.com/calendar', result)
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          setCalendarId(response.data.id);
          toast('Calendar created');
          alert('Календарь успешно настроен');
          window.location.reload();
        } else {
          toast('Something went wrong');
        }
      })
      .catch(err => {
        toast('Something went wrong');
        console.error(err);
      });
    //console.log(data);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center"
        >
          <Card className="w-full max-w-[750px]">
            <CardHeader>
              <CardTitle>Настройка календаря</CardTitle>
              <span className="text-xs font-extralight">
                Для создания календаря потребуется указать дополнительную
                информацию
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-7 my-3">
                <FormField
                  control={form.control}
                  name="duration" // длительность одного собеседования (можно поменять позднее)
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Длительность одного интервью в минутах
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className={clsx(errors.duration && 'border-red-500')}
                          placeholder="60"
                        />
                      </FormControl>
                      <FormDescription>
                        Возможно настроить в будущем для отдельных событий
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeTime" // время отдыха между собеседованиями
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Промежуток между собеседованиями</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className={clsx(errors.freeTime && 'border-red-500')}
                          placeholder="15"
                        />
                      </FormControl>
                      <FormDescription>
                        Возможно настроить в будущем для отдельных событий
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dayStart" // начало рабочего дня
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Начало рабочего дня</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className={clsx(errors.dayStart && 'border-red-500')}
                          placeholder="10:00"
                        />
                      </FormControl>
                      <FormDescription>в формате HH:MM</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dayEnd" // конец рабочего дня
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Конец рабочего дня</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className={clsx(errors.dayEnd && 'border-red-500')}
                          placeholder="23:00"
                        />
                      </FormControl>
                      <FormDescription>в формате HH:MM</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-3 w-full md:w-1/2 md:pr-4">
                <FormField
                  control={form.control}
                  name="maxReservDays" // максимальное количество зарезервированных дней для ответа у кандидата
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Максимальное количество зарезервированных дней
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className={clsx(
                            errors.maxReservDays && 'border-red-500'
                          )}
                          placeholder="3"
                        />
                      </FormControl>
                      <FormDescription>
                        Максимальное количество дней для ответа у кандидата
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 my-10">
                <p className="text-slate-950 font-light text-md">
                  Выберете рабочие дни
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {days.map((day, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={day}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Button
                              type="button"
                              className={clsx(
                                'rounded-sm px-3 py-2 w-10 h-10',
                                field.value
                                  ? 'bg-slate-950 text-slate-200 hover:text-slate-950'
                                  : 'bg-slate-200 text-slate-950 hover:text-slate-200'
                              )}
                              onClick={() => {
                                field.onChange(!field.value);
                              }}
                            >
                              {getDayInRussian(day)}
                            </Button>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Создать календарь
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
