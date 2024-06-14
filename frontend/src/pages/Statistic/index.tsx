import { AppLayout } from '@/shared/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

export const Statistic = () => {
  return (
    <AppLayout>
      <div className="col-span-9 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm p-4">
        <div className="flex justify-evenly">
          <Card>
            <CardHeader>
              <CardTitle>
                {/*<div className="flex align-center justify-between">*/}
                {/*  <div>*/}
                {/*    <PersonIcon className="w-5 h-5 text-slate-900" />*/}
                {/*  </div>*/}
                {/*<div>Сотрудники</div>*/}
                {/*</div>*/}
                <p>Сотрудники</p>
              </CardTitle>
              <CardContent>
                <p>Сотрудники</p>
                {/*<div className="flex align-center justify-between">*/}
                {/*  <div className="size-2">172</div>*/}
                {/*  <div> +10%</div>*/}
                {/*</div>*/}
              </CardContent>
            </CardHeader>
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
