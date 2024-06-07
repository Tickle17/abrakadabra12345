import { AppLayout } from '@/shared/layouts';

export const Settings = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-4 col-span-3 p-6 bg-white shadow-sm"></div>
      <div className="col-span-6 grid grid-cols-1 grid-rows-12 gap-4 bg-white shadow-sm"></div>
      <div className="col-span-3 grid grid-cols-1 grid-rows-2 gap-4">
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative"></div>
        <div className="grid grid-cols-1 grid-rows-8 gap-4 bg-white shadow-sm p-5 overflow-y-hidden relative"></div>
      </div>
    </AppLayout>
  );
};
