import {
  AuthPage,
  Calendar,
  Chat,
  CreateVacancy,
  ErrorPage,
  Jobs,
  Profile,
  RootPage,
  Settings,
} from '@/pages';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useFetchUserProfile } from '@/widgets/FetchData/fetchProfile';
import { Statistic } from '@/pages/Business/Statistic';
import Vacancies from '@/pages/Business/Vacancies';
import React from 'react';

interface PrivateRouteProps {
  element: React.ComponentType;
  role?: 'business' | 'users';
}

// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Element,
  role,
}) => {
  const localStorageRole = localStorage.getItem('role');
  useFetchUserProfile();

  // not logged in
  if (localStorageRole !== 'business' && localStorageRole !== 'users') {
    return <AuthPage />;
  }

  // universal pages
  if (role === undefined) {
    return <Element />;
  }

  // role for path match with localStorage role or state role
  if (localStorageRole === role) {
    return <Element />;
  }

  // role for path doesn't match with state role and localStorage role
  if (localStorageRole !== role) {
    switch (localStorageRole) {
      case 'users':
        return <Navigate to="/" />;
      case 'business':
        return <Navigate to="/statistic" />;
    }
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const AuthRoute: React.FC = () => {
  const localStorageRole = localStorage.getItem('role');

  if (localStorageRole !== 'business' && localStorageRole !== 'users') {
    return <AuthPage />;
  }

  switch (localStorageRole) {
    case 'users':
      return <Navigate to="/" />;
    case 'business':
      return <Navigate to="/statistic" />;
  }
};

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'messages',
    element: <PrivateRoute element={Chat} />,
  },
  {
    path: '/',
    element: <PrivateRoute element={RootPage} role="users" />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: <PrivateRoute element={Profile} role="users" />,
  },
  {
    path: 'jobs',
    element: <PrivateRoute element={Jobs} role="users" />,
  },
  {
    path: 'settings',
    element: <PrivateRoute element={Settings} role="business" />,
  },
  {
    path: 'create-vacancy',
    element: <PrivateRoute element={CreateVacancy} role="business" />,
  },
  {
    path: 'calendar',
    element: <PrivateRoute element={Calendar} role="business" />,
  },
  {
    path: 'statistic',
    element: <PrivateRoute element={Statistic} role="business" />,
  },
  {
    path: 'vacancies',
    element: <PrivateRoute element={Vacancies} />,
  },
]);
