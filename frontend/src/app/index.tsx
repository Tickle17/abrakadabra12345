import {
  AuthPage,
  Calendar,
  Chat,
  CreateVacancy,
  ErrorPage,
  Profile,
  RootPage,
  Settings,
  Vacancies,
} from '@/pages';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore, useProfileStore } from './store';
import { useFetchUserProfile } from '@/widgets/FetchData/fetchProfile.tsx';
import { Statistic } from '@/pages/Business/Statistic';

interface PrivateRouteProps {
  element: React.ComponentType;
}

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { isLoggedIn, getLoggedInToken } = useAuthStore();
  const token = getLoggedInToken();
  useFetchUserProfile();
  return isLoggedIn || token ? <Element /> : <Navigate to="/auth" />;
};

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const UserRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { profileData } = useProfileStore();
  const role = localStorage.getItem('role');
  useFetchUserProfile();
  return profileData.role === 'users' || role === 'users' ? (
    <PrivateRoute element={Element} />
  ) : (
    <Navigate to="/statistic" />
  );
};

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const BusinessRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { profileData } = useProfileStore();
  const role = localStorage.getItem('role');
  useFetchUserProfile();
  return profileData.role === 'business' || role === 'business' ? (
    <PrivateRoute element={Element} />
  ) : (
    <Navigate to="/" />
  );
};

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const AuthRoute = () => {
  const { isLoggedIn, getLoggedInToken } = useAuthStore();
  const { profileData } = useProfileStore();
  const role = localStorage.getItem('role');
  const token = getLoggedInToken();
  useFetchUserProfile();
  return !isLoggedIn || !token ? (
    <AuthPage />
  ) : profileData.role === 'business' || role === 'business' ? (
    <Navigate to="/statistic" />
  ) : (
    <Navigate to="/" />
  );
};

export const router = createBrowserRouter([
  // auth routes
  {
    path: 'auth',
    element: <AuthRoute />,
    errorElement: <ErrorPage />,
  },
  // universal routes
  {
    path: 'messages',
    element: <Chat />,
  },
  // user routes
  {
    path: '/',
    element: <UserRoute element={RootPage} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: <UserRoute element={Profile} />,
  },
  {
    path: 'vacancies',
    element: <UserRoute element={Vacancies} />,
  },
  //   business routes
  {
    path: 'settings',
    element: <BusinessRoute element={Settings} />,
  },
  {
    path: 'create-vacancy',
    element: <BusinessRoute element={CreateVacancy} />,
  },
  {
    path: 'calendar',
    element: <BusinessRoute element={Calendar} />,
  },
  {
    path: 'statistic',
    element: <BusinessRoute element={Statistic} />,
  },
]);
