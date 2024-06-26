// import { useVacancyStore } from '@/app/store';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/shared/ui';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import { stepThirdValues, stepThirdSchema } from '../schema';
// import { Form } from 'react-router-dom';
// import { FormField, FormItem } from '@/shared/ui';

import { useVacancyStore } from '@/app/store';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

// export const StepThird = () => {
//   const { setSubmitButtonRef, setSecondStepData, activeStep, setActiveStep } =
//     useVacancyStore();
//   const submitButtonRef = useRef<HTMLButtonElement>(null);
//   const form = useForm<stepThirdValues>({
//     resolver: zodResolver(stepThirdSchema),
//     defaultValues: {
//       businessId: '',
//       calendarId: '',
//     },
//   });
//   const { watch, handleSubmit, control } = form;

//   useEffect(() => {
//     if (!submitButtonRef.current) return;
//     setSubmitButtonRef(submitButtonRef);
//   }, [submitButtonRef, setSubmitButtonRef]);

//   const businessId = watch('businessId');
//   console.log(businessId);

//   const onSubmit = handleSubmit(data => {
//     console.log(data);
//   });

//   return (
//     <Form>
//       <form onSubmit={onSubmit}>
//         <FormField
//           control={control}
//           name="calendarId"
//           render={({ field }) => {
//             return (
//               <FormItem>
//                 <div className="w-full flex items-start gap-10">
//                   <div className="shrink-0 max-w-[175px] flex flex-col gap-1">
//                     <h2 className="text-slate-950 font-light text-md">
//                       Responsible HR
//                     </h2>
//                     <p className="text-slate-950 font-thin text-xs">
//                       Select a responsible HR for the position; he or she will
//                       be able to see and edit this position and edit their
//                       calendar for meetings
//                     </p>
//                   </div>
//                   <div className="shrink-1 flex-grow flex flex-col gap-3">
//                     <Select {...field} onValueChange={field.onChange}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Calendar" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">Stephany Colins</SelectItem>
//                         <SelectItem value="2">Mark Fisher</SelectItem>
//                         <SelectItem value="3">Liland Palmer</SelectItem>
//                         <SelectItem value="4">Lora Palmer</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </FormItem>
//             );
//           }}
//         ></FormField>
//         <button type="submit" ref={submitButtonRef} className="invisible">
//           Create Vacancy
//         </button>
//       </form>
//     </Form>
//   );
// };

type ResponseData = {
  id: string;
};

// TODO: refactor
const objectTemp = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  freelance: 'FREELANCE',
  intership: 'INTERNSHIP',
  contract: 'CONTRACT',
  remote: 'REMOTE',
};

export const StepThird = () => {
  const { firstStepData, secondStepData, setActiveStep } = useVacancyStore();
  const handleCreateVacancy = () => {
    const data = {
      status: 'active',
      position: firstStepData.position,
      description: secondStepData.description,
      requirements: secondStepData.requirements,
      idealCandidate: secondStepData.idealCandidate,
      hardSkills: firstStepData.hardSkills,
      softSkills: firstStepData.softSkills,
      workFormat: firstStepData.workFormat?.map(name => objectTemp[name]),
      salaryMin: firstStepData.salaryMin,
      salaryMax: firstStepData.salaryMax,
      specialization: null,
      experience: String(firstStepData.experience),
      address: secondStepData.address,
      businessId: localStorage.getItem('id') || '',
      vacancy: '',
    };
    axios
      .post<ResponseData>(
        'https://backendhackaton.onrender.com/vacancy',
        data,
        {}
      )
      .then((response: AxiosResponse<ResponseData>) => {
        if (response.status === 200 || response.status === 201) {
          toast('Вакансия создана');
          console.log(response.data);
        } else {
          toast('Что-то пошло не так');
          console.log(response.data);
        }
      })
      .catch(err => {
        toast('Что-то пошло не так');
        console.error(err);
      });
  };
  return (
    <div className="w-full h-full flex max-w-[500px] mx-auto flex-col gap-5">
      <h2 className="text-slate-950 text-xl font-light">Детали вакансии</h2>
      <ScrollArea className="w-full hidden lg:block">
        <Card className="mx-auto max-h-max max-w-[500px] shadow-none border border-slate-950 rounded-[2px]">
          <CardHeader className="w-full flex flex-row justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-slate-950 font-thin underline">
                Название вакансии
              </p>
              <h2 className="text-slate-950 text-3xl font-light">
                {firstStepData.position || 'здесь будет название вакансии'}
              </h2>
            </div>
            <div className="h-full flex items-start">
              <img
                src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png"
                className="w-[125px] object-contain"
              ></img>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <h3>Адрес</h3>
              <CardDescription>
                {secondStepData.address ? (
                  <p className="text-slate-950 text-sm font-semibold">
                    {secondStepData.address}
                  </p>
                ) : (
                  'здесь будет адрес вакансии'
                )}
              </CardDescription>
            </div>
            <div>
              <h3>Опыт</h3>
              <CardDescription>
                {firstStepData.experience ? (
                  <p className="text-slate-950 text-sm font-semibold">
                    от {firstStepData.experience} лет опыта
                  </p>
                ) : (
                  'здесь будет требуемый опыт для соискателя'
                )}
              </CardDescription>
            </div>
            <div>
              <h3>Зарплата</h3>
              <CardDescription>
                {firstStepData.salaryMin && firstStepData.salaryMax ? (
                  <p className="text-slate-950 text-sm font-semibold">
                    {firstStepData.salaryMin}$ - {firstStepData.salaryMax}$
                  </p>
                ) : (
                  'здесь будут максимальная и минимальная зарплата'
                )}
              </CardDescription>
            </div>
            <div>
              <h3>Описание вакансии</h3>
              <CardDescription className="text-slate-950 text-sm font-thin break-words">
                {secondStepData.description || 'здесь будет описание вакансии'}
              </CardDescription>
            </div>
            <div>
              <h3>Требования</h3>
              <CardDescription className="text-slate-950 text-sm font-thin break-words">
                {secondStepData.requirements ||
                  'здесь будут требования к соискателю'}
              </CardDescription>
            </div>
            <div>
              <h3>Пожелания к кандидату</h3>
              <CardDescription className="text-slate-950 text-sm font-thin break-words">
                {secondStepData.idealCandidate ||
                  'здесь будут пожелания к кандидату'}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Формат работы</h3>
              <CardDescription className="flex flex-wrap gap-1">
                {firstStepData.workFormat && firstStepData.workFormat.length
                  ? firstStepData.workFormat.map((item, index) => {
                      return (
                        <Badge
                          key={`${item}-${index}`}
                          className="flex items-center gap-1 w-fit"
                        >
                          {item}
                        </Badge>
                      );
                    })
                  : 'here will be vacancy work format requirements'}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Soft Skills</h3>
              <CardDescription className="flex flex-wrap gap-1">
                {firstStepData.softSkills && firstStepData.softSkills.length
                  ? firstStepData.softSkills.map((item, index) => {
                      return (
                        <Badge
                          key={`${item}-${index}`}
                          className="flex items-center gap-1 w-fit"
                        >
                          {item}
                        </Badge>
                      );
                    })
                  : 'here will be vacancy soft skills requirements'}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              <h3>Hard Skills</h3>
              <CardDescription className="flex flex-wrap gap-1">
                {firstStepData.hardSkills && firstStepData.hardSkills.length
                  ? firstStepData.hardSkills.map((item, index) => {
                      return (
                        <Badge
                          key={`${item}-${index}`}
                          className="flex items-center gap-1 w-fit"
                        >
                          {item}
                        </Badge>
                      );
                    })
                  : 'here will be vacancy soft skills requirements'}
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-end flex-col gap-1">
              {secondStepData.businessId ? (
                <div className="flex items-center gap-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthelondonmagazine.org%2Fwp-content%2Fuploads%2F2019%2F11%2FFeature-Image-The-Brothers-Karamazov-2.jpg&f=1&nofb=1&ipt=421e8a95bd1ea4544f62bf2cf2514552447009adb800cceed49b7166b19a01c3&ipo=images" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-slate-950 font-thin text-sm">
                      Ответсвенный hr
                    </p>
                    <p className="text-slate-950 font-semibold text-md underline">
                      {secondStepData.businessId}
                    </p>
                  </div>
                </div>
              ) : (
                'Здесь будет ответсвенный за вакансию hr'
              )}
            </div>
          </CardFooter>
        </Card>
        <ScrollBar className="invisible" />
      </ScrollArea>
      <Card className="mx-auto max-h-max max-w-[500px] shadow-none border border-slate-950 rounded-[2px] block lg:hidden">
        <CardHeader className="w-full flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-slate-950 font-thin underline">Vacancy Name</p>
            <h2 className="text-slate-950 text-3xl font-light">
              {firstStepData.position || 'Here will be your vacancy name'}
            </h2>
          </div>
          <div className="h-full flex items-start">
            <img
              src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png"
              className="w-[125px] object-contain"
            ></img>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <h3>Address</h3>
            <CardDescription>
              {secondStepData.address ? (
                <p className="text-slate-950 text-sm font-semibold">
                  {secondStepData.address}
                </p>
              ) : (
                'here will be address for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Experience</h3>
            <CardDescription>
              {firstStepData.experience ? (
                <p className="text-slate-950 text-sm font-semibold">
                  from {firstStepData.experience} years of experience
                </p>
              ) : (
                'here will be min and max salary for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Оплата</h3>
            <CardDescription>
              {firstStepData.salaryMin && firstStepData.salaryMax ? (
                <p className="text-slate-950 text-sm font-semibold">
                  {firstStepData.salaryMin}$ - {firstStepData.salaryMax}$
                </p>
              ) : (
                'here will be min and max salary for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Job Description</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {secondStepData.description || 'here will be vacancy description'}
            </CardDescription>
          </div>
          <div>
            <h3>Job Requirements</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {secondStepData.requirements ||
                'here will be vacancy requirements'}
            </CardDescription>
          </div>
          <div>
            <h3>Job Ideal Candidate</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {secondStepData.idealCandidate ||
                'here will be vacancy ideal candidate'}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Work Format</h3>
            <CardDescription className="flex flex-wrap gap-1">
              {firstStepData.workFormat && firstStepData.workFormat.length
                ? firstStepData.workFormat.map((item, index) => {
                    return (
                      <Badge
                        key={`${item}-${index}`}
                        className="flex items-center gap-1 w-fit"
                      >
                        {item}
                      </Badge>
                    );
                  })
                : 'here will be vacancy work format requirements'}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Soft Skills</h3>
            <CardDescription className="flex flex-wrap gap-1">
              {firstStepData.softSkills && firstStepData.softSkills.length
                ? firstStepData.softSkills.map((item, index) => {
                    return (
                      <Badge
                        key={`${item}-${index}`}
                        className="flex items-center gap-1 w-fit"
                      >
                        {item}
                      </Badge>
                    );
                  })
                : 'here will be vacancy soft skills requirements'}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Hard Skills</h3>
            <CardDescription className="flex flex-wrap gap-1">
              {firstStepData.hardSkills && firstStepData.hardSkills.length
                ? firstStepData.hardSkills.map((item, index) => {
                    return (
                      <Badge
                        key={`${item}-${index}`}
                        className="flex items-center gap-1 w-fit"
                      >
                        {item}
                      </Badge>
                    );
                  })
                : 'here will be vacancy soft skills requirements'}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-end flex-col gap-1">
            {secondStepData.businessId ? (
              <div className="flex items-center gap-1">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthelondonmagazine.org%2Fwp-content%2Fuploads%2F2019%2F11%2FFeature-Image-The-Brothers-Karamazov-2.jpg&f=1&nofb=1&ipt=421e8a95bd1ea4544f62bf2cf2514552447009adb800cceed49b7166b19a01c3&ipo=images" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-slate-950 font-thin text-sm">
                    Responsible hr
                  </p>
                  <p className="text-slate-950 font-semibold text-md underline">
                    {secondStepData.businessId}
                  </p>
                </div>
              </div>
            ) : (
              'here will be hr responsible for the vacancy'
            )}
          </div>
        </CardFooter>
      </Card>
      <div className="w-full grid grid-cols-2 gap-3 lg:h-0 lg:w-0 lg:absolute lg:invisible mt-auto">
        <Button
          className="rounded-[2px]"
          onClick={() => setActiveStep('Job Description')}
        >
          Back
        </Button>
        <Button
          className="rounded-[2px]"
          type="submit"
          onClick={() => handleCreateVacancy()}
        >
          Create Vacancy
        </Button>
      </div>
    </div>
  );
};
