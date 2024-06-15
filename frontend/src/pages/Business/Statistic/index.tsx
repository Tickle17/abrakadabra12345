import { AppLayout } from '@/shared/layouts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { CheckIcon, ColumnsIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetVacancyStore } from '@/app/store/slices/getVacancySlice.ts';
import { useEffect } from 'react';

export const Statistic = () => {
  const data = [
    { дата: '16.06', чел: 1 },
    { дата: '17.06', чел: 5 },
    { дата: '18.06', чел: 10 },
    { дата: '19.06' },
    { дата: '20.06', чел: 7 },
    { дата: '21.06', чел: 9 },
    { дата: '22.06', чел: 2 },
  ];
  const { loading, vacancies, fetchVacancies } = useGetVacancyStore();
  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);
  return (
    <AppLayout>
      <div className="flex flex-col col-span-12 gap-4 bg-gray-100 shadow-sm p-4 border-radius-default">
        <div className="grid grid-cols-3 gap-5 row-span-2">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>
                <div className="flex align-center gap-1">
                  <div>
                    <PersonIcon className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>Сотрудники</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>

            <CardFooter className="p-4 pb-2">
              <div className="flex align-center justify-between w-full">
                <div className="">172 чел.</div>
                <div> +10%</div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle>
                <div className="flex align-center gap-1">
                  <div>
                    <CheckIcon className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>Успешные кандидаты</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="p-4 pb-2">
              <div className="flex align-center justify-between w-full">
                <div className="">10 чел.</div>
                <div> +20%</div>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle>
                <div className="flex align-center gap-1">
                  <div>
                    <ColumnsIcon className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>КУС(текучка)</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>

            <CardFooter className="p-4 pb-2">
              <div className="flex align-center justify-between w-full">
                <div className="">2%</div>
                <div> +10% норма</div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="justify-center bg-white border-radius-default">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={100}
              height={300}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: -30,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="дата" />
              <YAxis />
              <Tooltip />
              <Line
                connectNulls
                type="monotone"
                dataKey="чел"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center bg-white border-radius-default h-full w-full p-4 overflow-hidden">
          <div className="flex justify-center sticky top-0 bg-white z-10">
            Список открытых вакансий
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="bg-white p-6 shadow rounded-md">Loading...</div>
              ) : (
                vacancies
                  .filter(vacancy => vacancy.status === 'active')
                  .map(vacancy => (
                    <div
                      key={vacancy.id}
                      className="bg-white p-6 shadow rounded-md gap-4 m-4 p-4 border border-black cursor-pointer hover:bg-gray-100 hover:border-gray-200"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            {vacancy.position}
                          </h3>
                          <p className="text-gray-600">{vacancy.vacancy}</p>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
