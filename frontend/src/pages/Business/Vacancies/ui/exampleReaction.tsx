import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import { ProfileState } from '@/app/store/slices/profileSlice.ts';
import { VacancyDTO } from '@/app/store/slices/getVacancySlice.ts';
import { getPercent } from '@/pages/Business/Vacancies/ui/helper.ts';

export default function ExampleReaction(
  user: ProfileState,
  vacancy: null | VacancyDTO
) {
  const calculateMatchPercentage = getPercent();

  const matchPercentage = calculateMatchPercentage(user, vacancy);

  return (
    <ScrollArea className="w-full hidden lg:block h-full">
      <Card className="mx-auto max-h-max max-w-[500px] shadow-none border border-slate-950 rounded-[2px] h-full">
        <CardHeader className="w-full flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-slate-950 font-thin underline">
              Название вакансии
            </div>
            <h2 className="text-slate-950 text-3xl font-light">
              {user?.fullName || 'Here will be your user name'}
            </h2>
          </div>
          <div className="h-full flex items-start">
            <img
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : 'https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png'
              }
              className="w-[125px] object-contain"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {user?.age && (
            <div>
              <h3>Возраст</h3>
              <CardDescription>{user.age}</CardDescription>
            </div>
          )}
          {user?.targetsInfo && (
            <div>
              <h3>Опыт работы</h3>
              <CardDescription>{user.targetsInfo}</CardDescription>
            </div>
          )}

          {user?.price && (
            <div>
              <h3>Заработная плата</h3>

              <CardDescription>
                <div>
                  <div className="text-slate-950 text-sm font-semibold">
                    {user?.price}
                  </div>
                </div>
              </CardDescription>
            </div>
          )}
          {user?.aboutUser && (
            <div>
              <h3>О себе</h3>
              <CardDescription className="text-slate-950 text-sm font-thin break-words">
                {user?.aboutUser}
              </CardDescription>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h3>Soft Skills</h3>
            <CardDescription className="flex flex-wrap gap-1">
              {user.softSkills
                ? user.softSkills.map((item, index) => {
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
              {user.hardSkills
                ? user.hardSkills.map((item, index) => {
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
        <CardFooter></CardFooter>
        Данный кандидат подходит по Hard Skills на {matchPercentage}%
      </Card>
      <ScrollBar className="invisible" />
    </ScrollArea>
  );
}
