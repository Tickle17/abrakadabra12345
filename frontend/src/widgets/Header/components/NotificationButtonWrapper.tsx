import { Link } from 'react-router-dom';

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
  return (
    <Link to={path} className="relative">
      <span className="absolute -top-[5px] -right-[8px] w-4 h-4 text-[7px] text-white bg-slate-950 rounded-full flex justify-center items-center">
        {notificationText}
      </span>
      {children}
    </Link>
  );
};
