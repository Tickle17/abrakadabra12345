import { Button } from '@/shared/ui';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full col-span-12 flex flex-col gap-3 justify-center items-center">
      <p className="text-2xl font-thin">Кажется, здесь ничего нет</p>
      <Button>
        <Link
          className="text-md font-thin hover:underline hover:opacity-50"
          to="/"
        >
          назад
        </Link>
      </Button>
    </div>
  );
};
