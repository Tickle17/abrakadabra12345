import { AppLayout } from '@/shared/layouts';
import { Card, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import { PersonIcon } from '@radix-ui/react-icons';

export const Statistic = () => {
  return (
    <AppLayout>
      <div className="col-span-9 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm p-4">
        <div className="grid grid-cols-3 gap-5">
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
            <CardFooter className="p-4 pb-2">
              <div className="flex align-center justify-between w-full">
                <div className="">172 чел.</div>
                <div> +10%</div>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader></CardHeader>
          </Card>
          <Card>
            <CardHeader></CardHeader>
          </Card>
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-4  p-6 bg-white shadow-sm"></div>
    </AppLayout>
  );
};
