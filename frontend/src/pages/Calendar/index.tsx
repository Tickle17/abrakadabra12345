import { AppLayout } from '@/shared/layouts';
import { formSchema } from './schema.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/input.tsx';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button.tsx';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import axios, { AxiosResponse } from 'axios';

type FormSchema = z.infer<typeof formSchema>;

export const days = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export function FormComponent() {
  const onSubmit = (data: FormSchema) => {
    console.log(data);
    if (
      !data.duration ||
      !data.freeTime ||
      !data.dayStart ||
      !data.dayEnd ||
      !data.workingDays
    )
      return;
    const result = {
      duration: parseFloat(data.duration),
      freeTime: parseFloat(data.freeTime),
      dayStart: parseFloat(data.dayStart),
      dayEnd: parseFloat(data.dayEnd),
      maxReservDays: parseFloat(data.workingDays),
      businessId: data.businessId,
      workingDays: [
        { day: 'MONDAY', isWorking: data.MONDAY ? true : false },
        { day: 'TUESDAY', isWorking: data.TUESDAY ? true : false },
        { day: 'WEDNESDAY', isWorking: data.WEDNESDAY ? true : false },
        { day: 'THURSDAY', isWorking: data.THURSDAY ? true : false },
        { day: 'FRIDAY', isWorking: data.FRIDAY ? true : false },
        { day: 'SATURDAY', isWorking: data.SATURDAY ? true : false },
        { day: 'SUNDAY', isWorking: data.SUNDAY ? true : false },
      ],
    };
    axios
      .post('https://backendhackaton.onrender.com/calendar', result)
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: '0',
      freeTime: '0',
      dayStart: '0',
      dayEnd: '0',
      MONDAY: false,
      TUESDAY: false,
      WEDNESDAY: false,
      THURSDAY: false,
      FRIDAY: false,
      SATURDAY: false,
      SUNDAY: false,
      workingDays: '0',
      businessId: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>duration</label>
                  <Input {...field} value={field.value || ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="freeTime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>freeTime</label>
                  <Input {...field} value={field.value || ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dayStart"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>dayStart</label>
                  <Input {...field} value={field.value || ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dayEnd"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>dayEnd</label>
                  <Input {...field} value={field.value || ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workingDays"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>workingDays</label>
                  <Input {...field} value={field.value || ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>businessId</label>
                  <Input {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {days.map((day, index) => (
          <FormField
            key={index}
            control={form.control}
            name={day}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-3 w-full">
                    <span>{day}</span>
                    <Checkbox
                      value={day}
                      checked={field.value || false}
                      onCheckedChange={checked => {
                        field.onChange(checked ? false : true);
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export const Calendar = () => {
  return (
    <AppLayout>
      <div className="bg-white shadow-sm p-3 rounded-[2px] col-span-3"></div>
      <div className="bg-white shadow-sm p-5 rounded-[2px] col-span-9">
        <FormComponent />
      </div>
    </AppLayout>
  );
};
