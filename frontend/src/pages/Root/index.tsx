import { AppLayout } from '@/shared/layouts';
import { Recommendations, ThredList, UserDetails } from '@/widgets';

export const RootPage = () => {
  return (
    <AppLayout>
      <UserDetails />
      <div className="col-span-6 grid grid-cols-1 grid-rows-12 gap-4 bg-card">
        <div className="row-span-12">
          <ThredList />
        </div>
      </div>
      <Recommendations />
    </AppLayout>
  );
};
