import {
  BackpackIcon,
  BarChartIcon,
  CalendarIcon,
  FileIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { IconLinkWrapper } from '../components';

export const NavBar = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="row-span-1 col-span-4 bg-white flex justify-center items-center gap-6 ">
      {role === 'users' ? (
        <>
          <IconLinkWrapper path="/">
            <HomeIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
          <IconLinkWrapper path="/profile">
            <PersonIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
          <IconLinkWrapper path="/vacancies">
            <BackpackIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
          <IconLinkWrapper path="/settings">
            <GearIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
        </>
      ) : (
        <>
          <IconLinkWrapper path="/statistic">
            <BarChartIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
          <IconLinkWrapper path="/create-vacancy">
            <FileIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
          <IconLinkWrapper path="/calendar">
            <CalendarIcon className="w-5 h-5 text-slate-900" />
          </IconLinkWrapper>
        </>
      )}
    </div>
  );
};
