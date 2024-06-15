import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NotificationButtonWrapperProps {
  children?: React.ReactNode;
  path: string;
  notifications: number;
}

export const NotificationButtonWrapper = ({
  children,
  path,
  notifications,
}: NotificationButtonWrapperProps) => {
  const notificationText =
    notifications > 10 ? '10+' : notifications.toString();
  const linkIsSelected = useLocation().pathname === path;

  return (
    <Link
      to={path}
      className={clsx(
        linkIsSelected
          ? 'border-b-2 border-black pb-[2px] relative'
          : 'relative'
      )}
    >
      <span className="absolute -top-[5px] -right-[8px] w-4 h-4 text-[7px] text-white bg-slate-950 rounded-full flex justify-center items-center">
        {notificationText}
      </span>
      {children}
    </Link>
  );
};
