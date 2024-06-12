import { AppLayout } from '@/shared/layouts';
import { formSchema } from './schema.ts';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DayOfWeek } from '@/pages/Calendar/types.ts';
import React from 'react';
import { Input } from '@/shared/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Button } from '@/shared/ui/button.tsx';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import axios from 'axios';

type FormSchema = z.infer<typeof formSchema>;

export function FormComponent() {
  const onSubmit = (data: FormSchema) => {
    console.log(data);
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
      duration: 0,
      freeTime: 0,
      dayStart: 0,
      dayEnd: 0,
      MONDAY: false,
      TUESDAY: false,
      WEDNESDAY: false,
      THURSDAY: false,
      FRIDAY: false,
      SATURDAY: false,
      SUNDAY: false,
      workingDays: 0,
      businessId: '',
    },
  });

  const duration = form.watch('freeTime');

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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
        {/*
        <FormField
          control={form.control}
          name="maxReservDays"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <label>maxReservDays</label>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="maxReservDays">
                        {field.value}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(DayOfWeek).map(day => (
                        <SelectItem key={day} value={day}>
                          <div className="w-full flex items-center gap-3">
                            <span>{day}</span>
                            <Checkbox />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        */}
        {Object.values(DayOfWeek)
          .filter(day => typeof day === 'string')
          .map((day, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`workingDays[${day}]`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3 w-full">
                      <span>{day}</span>
                      <Checkbox
                        value={day}
                        checked={field.value?.includes(day) || false}
                        onCheckedChange={checked => {
                          field.onChange(
                            checked
                              ? [...(field.value || []), day]
                              : field.value?.filter(v => v !== day)
                          );
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
