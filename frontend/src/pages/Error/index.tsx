import { AppLayout } from '@/shared/layouts';
import { Button } from '@/shared/ui';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <AppLayout>
      <div className="col-span-12 w-full h-full flex flex-col gap-3 justify-center items-center">
        <p className="text-2xl font-thin">Кажется, здесь ничего нет</p>
        <Button>
          <Link
            className="text-md font-thin hover:underline hover:opacity-50"
            to="/"
          >
            на главную
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};
