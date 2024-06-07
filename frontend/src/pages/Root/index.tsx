import { AppLayout } from '@/shared/layouts';
import { Recommendations, ThredList, UserDetails } from '@/widgets';
import { POST_ARRAY } from '@/shared/dataset/threads.ts';

export const RootPage = () => {
  return (
    <AppLayout>
      <UserDetails />
      <div className="col-span-6 grid grid-cols-1 grid-rows-12 gap-4 bg-card">
        <div className="row-span-12">
          <ThredList data={POST_ARRAY} />
        </div>
      </div>
      <Recommendations />
    </AppLayout>
  );
};
