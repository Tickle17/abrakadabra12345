import { AppLayout } from '@/shared/layouts';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './schema';
import { HardSkills, SoftSkills } from './types';
import { Button, Checkbox, Input, Label } from '@/shared/ui';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { VacancyCreationHeader, VacancyCreationForm } from '@/widgets';

const FormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    type ResponseData = {
      id: string;
    };
    axios
      .post<ResponseData>(
        'https://backendhackaton.onrender.com/vacancy',
        data,
        {}
      )
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
        } else {
          toast('Something went wrong');
          console.log(response.data);
        }
      })
      .catch(err => {
        toast('Something went wrong');
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Status</label>
        <Input {...register('status')} />
        {errors.status && <p>{errors.status.message}</p>}
      </div>
      <div>
        <label>Position</label>
        <Input {...register('position')} />
        {errors.position && <p>{errors.position.message}</p>}
      </div>
      <div>
        <label>Work Format</label>
        <Input {...register('workFormat')} />
        {errors.workFormat && <p>{errors.workFormat.message}</p>}
      </div>
      <div>
        <label>Specialization</label>
        <Input {...register('specialization')} />
        {errors.specialization && <p>{errors.specialization.message}</p>}
      </div>
      <div>
        <label>Experience</label>
        <Input {...register('experience')} />
        {errors.experience && <p>{errors.experience.message}</p>}
      </div>
      <div>
        <label>Vacancy</label>
        <Input {...register('vacancy')} />
        {errors.vacancy && <p>{errors.vacancy.message}</p>}
      </div>
      <div>
        <label>Address</label>
        <Input {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div>
        <label>Soft Skills</label>
        {Object.values(SoftSkills).map(skill => (
          <div key={skill}>
            <Label>
              <Controller
                name="softSkills"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    value={skill}
                    checked={field.value?.includes(skill) || false}
                    onCheckedChange={checked => {
                      field.onChange(
                        checked
                          ? [...(field.value || []), skill]
                          : field.value?.filter(v => v !== skill)
                      );
                    }}
                  />
                )}
              />
              {skill}
            </Label>
          </div>
        ))}
        {errors.softSkills && <p>{errors.softSkills.message}</p>}
      </div>
      <div>
        <label>Hard Skills</label>
        {Object.values(HardSkills).map(skill => (
          <div key={skill}>
            <Label>
              <Controller
                name="hardSkills"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    value={skill}
                    checked={field.value?.includes(skill) || false}
                    onCheckedChange={checked => {
                      field.onChange(
                        checked
                          ? [...(field.value || []), skill]
                          : field.value?.filter(v => v !== skill)
                      );
                    }}
                  />
                )}
              />
              {skill}
            </Label>
          </div>
        ))}
        {errors.hardSkills && <p>{errors.hardSkills.message}</p>}
      </div>
      <div>
        <label>Business ID</label>
        <Input {...register('businessId')} />
        {errors.businessId && <p>{errors.businessId.message}</p>}
      </div>
      <div>
        <label>Calendar ID</label>
        <Input {...register('calendarId')} />
        {errors.calendarId && <p>{errors.calendarId.message}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const CreateVacancy = () => {
  return (
    <AppLayout>
      <div className="bg-white shadow-sm p-7 rounded-[2px] col-span-4 flex flex-col gap-5">
        <VacancyCreationHeader />
      </div>
      <div className="bg-white shadow-sm p-7 rounded-[2px] col-span-8 flex flex-col gap-5">
        <VacancyCreationForm />
      </div>
    </AppLayout>
  );
};
