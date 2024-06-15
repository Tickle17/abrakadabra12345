import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import { VacancyDTO } from '@/app/store/slices/getVacancySlice.ts';

export function ExampleVacancy(vacancy: null | VacancyDTO) {
  return (
    <ScrollArea className="w-full hidden lg:block">
      <Card className="mx-auto max-h-max max-w-[500px] shadow-none border border-slate-950 rounded-[2px]">
        <CardHeader className="w-full flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-slate-950 font-thin underline">
              Название вакансии
            </p>
            <h2 className="text-slate-950 text-3xl font-light">
              {vacancy?.position || 'Here will be your vacancy name'}
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
            <h3>Адресс</h3>
            <CardDescription>
              {vacancy?.address ? (
                <p className="text-slate-950 text-sm font-semibold">
                  {vacancy?.address}
                </p>
              ) : (
                'here will be address for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Опыт работы</h3>
            <CardDescription>
              {vacancy?.experience ? (
                <p className="text-slate-950 text-sm font-semibold">
                  от {vacancy?.experience} лет опыта
                </p>
              ) : (
                'here will be min and max salary for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Заработная плата</h3>
            <CardDescription>
              {vacancy?.salaryMin && vacancy?.salaryMax ? (
                <p className="text-slate-950 text-sm font-semibold">
                  {vacancy?.salaryMin}$ - {vacancy?.salaryMax}$
                </p>
              ) : (
                'here will be min and max salary for the position'
              )}
            </CardDescription>
          </div>
          <div>
            <h3>Описание работы</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {vacancy?.description || 'here will be vacancy description'}
            </CardDescription>
          </div>
          <div>
            <h3>Требования к работе</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {vacancy?.requirements || 'here will be vacancy requirements'}
            </CardDescription>
          </div>
          <div>
            <h3>Ожидаем от кандидата</h3>
            <CardDescription className="text-slate-950 text-sm font-thin break-words">
              {vacancy?.idealCandidate ||
                'here will be vacancy ideal candidate'}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Work Format</h3>
            <CardDescription className="flex flex-wrap gap-1">
              {vacancy?.workFormat && vacancy?.workFormat.length
                ? vacancy?.workFormat.map((item, index) => {
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
            <CardDescription>
              <div className="flex flex-col gap-1">
                <h3>Soft Skills</h3>
                <CardDescription className="flex flex-wrap gap-1">
                  {vacancy?.softSkills
                    ? vacancy.softSkills.map((item, index) => {
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
            </CardDescription>
            <CardDescription>
              <div className="flex flex-col gap-1">
                <h3>Hard Skills</h3>
                <CardDescription className="flex flex-wrap gap-1">
                  {vacancy?.hardSkills
                    ? vacancy.hardSkills.map((item, index) => {
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
            </CardDescription>
          </div>
        </CardContent>
      </Card>
      <ScrollBar className="invisible" />
    </ScrollArea>
  );
}
