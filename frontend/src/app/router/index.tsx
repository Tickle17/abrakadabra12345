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
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'joblist',
    element: <JobList />,
  },
  {
    path: 'threads',
    element: <Threads />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: 'messages',
    element: <Chat />,
  },
]);
