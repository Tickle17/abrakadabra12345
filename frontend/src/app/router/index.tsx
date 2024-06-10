import {
  RootPage,
  ErrorPage,
  Profile,
  JobList,
  Threads,
  Settings,
  Chat,
  AuthPage,
} from '@/pages';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { useAuthStore } from '../store';

interface PrivateRouteProps {
  element: React.ComponentType;
}

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Element /> : <Navigate to="/auth" />;
};

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <PrivateRoute element={RootPage} />,
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
]);
