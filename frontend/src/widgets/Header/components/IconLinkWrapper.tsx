import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

interface IconWrapperProps {
  children?: React.ReactNode;
  path: string;
}

export const IconLinkWrapper = ({ children, path }: IconWrapperProps) => {
  const linkIsSelected = useLocation().pathname === path;
  return (
    <Link
      className={clsx(linkIsSelected ? 'border-b-2 border-black pb-[2px]' : '')}
      to={path}
    >
      {children}
    </Link>
  );
};
