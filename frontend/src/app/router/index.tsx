import {
  AuthPage,
  Calendar,
  Chat,
  CreateVacancy,
  ErrorPage,
  JobList,
  Profile,
  RootPage,
  Settings,
  Threads,
} from '@/pages';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useFetchUserProfile } from '@/widgets/FetchData/fetchProfile.tsx';

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
const AuthRoute = () => {
  const { isLoggedIn, getLoggedInToken } = useAuthStore();
  const token = getLoggedInToken();
  useFetchUserProfile();
  return !isLoggedIn && !token ? <AuthPage /> : <Navigate to="/" />;
};
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={RootPage} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth',
    element: <AuthRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: <PrivateRoute element={Profile} />,
  },
  {
    path: 'joblist',
    element: <PrivateRoute element={JobList} />,
  },
  {
    path: 'threads',
    element: <PrivateRoute element={Threads} />,
  },
  {
    path: 'settings',
    element: <PrivateRoute element={Settings} />,
  },
  {
    path: 'messages',
    element: <PrivateRoute element={Chat} />,
  },
  {
    path: 'create-vacancy',
    element: <PrivateRoute element={CreateVacancy} />,
  },
  {
    path: 'calendar',
    element: <PrivateRoute element={Calendar} />,
  },
]);
