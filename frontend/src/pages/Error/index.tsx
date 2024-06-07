import { AppLayout } from '@/shared/layouts';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <AppLayout>
      <div className="col-span-12 w-full h-full flex flex-col gap-3 justify-center items-center">
        <p className="text-3xl font-thin">Nothing to see here yet</p>
        <Link
          className="text-4xl font-thin hover:underline hover:opacity-50"
          to="/"
        >
          Go home
        </Link>
      </div>
    </AppLayout>
  );
};
