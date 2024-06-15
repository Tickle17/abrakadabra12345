import { AppLayout } from '@/shared/layouts';
import { UserDetails } from '@/widgets';
import {
  Badge,
  Button,
  Combobox,
  FormControl,
  FormField,
  FormItem,
  Input,
  ScrollArea,
  ScrollBar,
  Textarea,
} from '@/shared/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileStore } from '@/app/store/slices/profileSlice.ts';
import { formSchema } from './schema.ts';
import { z } from 'zod';
import { hardSkillItems, softSkillItems } from '@/shared/consts';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthStore } from '@/app/store';

export type ResponseData = {
  id: string | undefined | null; // UUID
  login: string | undefined | null;
  password: string | undefined | null;
  photoUrl: string | undefined | null;
  fullName: string | undefined | null;
  age: number | undefined | null; // int32
  stackTech: string | undefined | null;
  projects: string | undefined | null;
  gitlabUrl: string | undefined | null;
  githubUrl: string | undefined | null;
  aboutUser: string | undefined | null;
  targetsInfo: string | undefined | null;
  price: number | undefined | null; // int32
  criterionsJob: string | undefined | null;
  phone: string | undefined | null;
  softSkills: [] | undefined | null;
  hardSkills: [] | undefined | null;
  createdAt: Date | undefined | null; // date-time
  updatedAt: Date | undefined | null; // date-time
  deletedAt: Date | undefined | null; // date-time
};

export const Profile = () => {
  const { profileData, setProfileData } = useProfileStore();
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const toggleEditMenu = () => {
    setEditMenu(prev => !prev);
  };
  const { getUserId } = useAuthStore();
  const userId = getUserId();
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: profileData,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setProfileData(data);
    axios
      .put<ResponseData>(
        `https://backendhackaton.onrender.com/users/${userId}`,
        data,
        {}
      )
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          toggleEditMenu();
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
    <AppLayout>
      <UserDetails />
      <div className="col-span-6 bg-white shadow-sm p-10 overflow-hidden max-h-screen border-radius-default">
        {editMenu ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-full grid grid-cols-1 gap-4">
                <FormField
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              Ваше ФИО
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              Укажите Фамилию Имя Отчество*
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Input
                              {...field}
                              type="text"
                              placeholder="Иванов Иван Иванович"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
                            />
                            {errors.photoUrl && (
                              <span className="text-red-500 text-xs">
                                {errors.photoUrl.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              Фото
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              URL вашего фото
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Input
                              {...field}
                              type="text"
                              placeholder="https://example.com/photo.jpg"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
                            />
                            {errors.photoUrl && (
                              <span className="text-red-500 text-xs">
                                {errors.photoUrl.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              Возраст
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              Укажите ваш возраст
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Input
                              {...field}
                              type="number"
                              placeholder="30"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
                              onChange={e =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                            {errors.age && (
                              <span className="text-red-500 text-xs">
                                {errors.age.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="stackTech"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              Технологии
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              Технологии, которые вы используете
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Input
                              {...field}
                              type="text"
                              placeholder="React, TypeScript"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
                            />
                            {errors.stackTech && (
                              <span className="text-red-500 text-xs">
                                {errors.stackTech.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="gitlabUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              GitLab URL
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              Ссылка на ваш профиль GitLab
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Input
                              {...field}
                              type="text"
                              placeholder="https://gitlab.com/username"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs"
                            />
                            {errors.gitlabUrl && (
                              <span className="text-red-500 text-xs">
                                {errors.gitlabUrl.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="aboutUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex items-center gap-10">
                          <div className="shrink-0 w-[175px]">
                            <h2 className="text-slate-950 font-light text-md">
                              О себе
                            </h2>
                            <p className="text-slate-950 font-thin text-xs">
                              Расскажите о своем опыте
                            </p>
                          </div>
                          <div className="shrink-1 flex-grow flex flex-col gap-1">
                            <Textarea
                              {...field}
                              placeholder="Разрабатывал расширения для Chrome"
                              className="border-0 border-b border-slate-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-2 text-xs max-h-5"
                            />
                            {errors.aboutUser && (
                              <span className="text-red-500 text-xs">
                                {errors.aboutUser.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="softSkills"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center gap-10">
                        <div className="shrink-0 w-[175px] flex flex-col gap-1">
                          <h2 className="text-slate-950 font-light text-md">
                            Soft Skills
                          </h2>
                          <p className="text-slate-950 font-thin text-xs">
                            Добавьте необходимые soft skills
                          </p>
                        </div>
                        <div className="shrink-1 flex-grow flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <Combobox
                              items={softSkillItems}
                              values={field.value || []}
                              setValues={field.onChange}
                              triggerBtnLabel="+ Add Skills"
                              searchInputPlaceholder="Search Skills..."
                              searchEmptyPlaceholder="No Skills Found"
                            />
                            <p className="text-slate-950 font-thin text-xs">
                              {field.value?.length || 0} of{' '}
                              {softSkillItems.length}
                            </p>
                          </div>
                          <div className="w-full max-w-[525px] h-[25px]">
                            <ScrollArea className="w-full whitespace-nowrap">
                              <div className="w-max flex items-center gap-1">
                                {field.value?.map((item, key) => {
                                  return (
                                    <Badge
                                      key={key}
                                      className="flex items-center gap-1"
                                    >
                                      {softSkillItems.find(
                                        skill => skill.value === item
                                      )?.label || item}
                                      <Cross2Icon
                                        onClick={() =>
                                          field.onChange(
                                            field.value?.filter(
                                              value => value !== item
                                            )
                                          )
                                        }
                                        className="w-3 h-3 hover:cursor-pointer hover:opacity-50 transition-all"
                                      />
                                    </Badge>
                                  );
                                })}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="invisible"
                              />
                            </ScrollArea>
                          </div>
                        </div>
                      </div>
                      {errors.softSkills && (
                        <span className="text-red-500 text-xs">
                          {errors.softSkills.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="hardSkills"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center gap-10">
                        <div className="shrink-0 w-[175px] flex flex-col gap-1">
                          <h2 className="text-slate-950 font-light text-md">
                            Hard Skills
                          </h2>
                          <p className="text-slate-950 font-thin text-xs">
                            Добавьте необходимые hard skills
                          </p>
                        </div>
                        <div className="shrink-1 flex-grow flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <Combobox
                              items={hardSkillItems}
                              values={field.value || []}
                              setValues={field.onChange}
                              triggerBtnLabel="+ Add Skills"
                              searchInputPlaceholder="Search Skills..."
                              searchEmptyPlaceholder="No Skills Found"
                            />
                            <p className="text-slate-950 font-thin text-xs">
                              {field.value?.length || 0} of{' '}
                              {hardSkillItems.length}
                            </p>
                          </div>
                          <div className="w-full max-w-[525px] h-[25px]">
                            <ScrollArea className="w-full whitespace-nowrap">
                              <div className="w-max flex items-center gap-1">
                                {field.value?.map((item, key) => {
                                  return (
                                    <Badge
                                      key={key}
                                      className="flex items-center gap-1"
                                    >
                                      {softSkillItems.find(
                                        skill => skill.value === item
                                      )?.label || item}
                                      <Cross2Icon
                                        onClick={() =>
                                          field.onChange(
                                            field.value?.filter(
                                              value => value !== item
                                            )
                                          )
                                        }
                                        className="w-3 h-3 hover:cursor-pointer hover:opacity-50 transition-all"
                                      />
                                    </Badge>
                                  );
                                })}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="invisible"
                              />
                            </ScrollArea>
                          </div>
                        </div>
                      </div>
                      {errors.softSkills && (
                        <span className="text-red-500 text-xs">
                          {errors.softSkills.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center gap-3 justify-end mt-10">
                <Button
                  onClick={() => {
                    toggleEditMenu();
                  }}
                >
                  Отменить редактирование
                </Button>
                <Button type="submit">Сохранить изменения</Button>
              </div>
            </form>
          </FormProvider>
        ) : (
          <div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">
                    Ваше ФИО
                  </h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.fullName}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">Фото</h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.photoUrl}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">Возраст</h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.age}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">
                    Технологии
                  </h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.stackTech}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">
                    GitLab URL
                  </h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.gitlabUrl}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">О себе</h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <p>{profileData.aboutUser}</p>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">
                    Soft Skills
                  </h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <div className="flex flex-wrap gap-2">
                    {profileData.softSkills?.map((skill, key) => (
                      <Badge key={key}>
                        {softSkillItems.find(item => item.value === skill)
                          ?.label || ''}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-10">
                <div className="shrink-0 w-[175px]">
                  <h2 className="text-slate-950 font-light text-md">
                    Hard Skills
                  </h2>
                </div>
                <div className="shrink-1 flex-grow flex flex-col gap-1">
                  <div className="flex flex-wrap gap-2">
                    {profileData?.hardSkills?.map((skill, key) => (
                      <Badge key={key}>
                        {hardSkillItems.find(item => item.value === skill)
                          ?.label || skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-3 justify-end mt-10">
              <Button
                onClick={() => {
                  toggleEditMenu();
                }}
              >
                Редактировать
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3 grid grid-cols-1 grid-rows-2 gap-4">
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative border-radius-default"></div>
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative border-radius-default"></div>
      </div>
    </AppLayout>
  );
};
