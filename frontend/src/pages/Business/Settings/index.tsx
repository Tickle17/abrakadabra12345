import { AppLayout } from '@/shared/layouts';

export const Settings = () => {
  return (
    <AppLayout>
      <div className="col-span-9 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm border-radius-default"></div>

      <div className="flex flex-col gap-4 col-span-3 p-6 bg-white shadow-sm border-radius-default"></div>
    </AppLayout>
  );
};
