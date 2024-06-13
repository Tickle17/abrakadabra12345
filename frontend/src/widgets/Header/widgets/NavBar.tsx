import {
  BackpackIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { IconLinkWrapper } from '../components';

export const NavBar = () => {
  return (
    <div className="row-span-1 col-span-4 bg-white flex justify-center items-center gap-6">
      <IconLinkWrapper path="/">
        <HomeIcon className="w-5 h-5 text-slate-900" />
      </IconLinkWrapper>
      <IconLinkWrapper path="/profile">
        <PersonIcon className="w-5 h-5 text-slate-900" />
      </IconLinkWrapper>
      <IconLinkWrapper path="/joblist">
        <BackpackIcon className="w-5 h-5 text-slate-900" />
      </IconLinkWrapper>
      <IconLinkWrapper path="/settings">
        <GearIcon className="w-5 h-5 text-slate-900" />
      </IconLinkWrapper>
    </div>
  );
};
