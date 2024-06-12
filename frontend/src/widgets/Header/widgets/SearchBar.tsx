import { Input } from '@/shared/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const SearchBar = () => {
  return (
    <div className="row-span-1 col-span-3 px-4 ">
      <div className="flex items-center bg-white pl-2">
        <MagnifyingGlassIcon className="w-6 h-6 text-slate-500 focus-visible:ring-0 focus-visible:ring-transparent" />
        <Input
          className="rounded-none border-none bg-transparent shadow-none"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
