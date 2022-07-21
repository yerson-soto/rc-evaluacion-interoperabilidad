import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks';
import { paths } from 'library/common/constants';

export default function PublicRoute() {
  const isLogged = useAppSelector(state => state.auth.isLogged);

  return isLogged ? <Navigate to={paths.admin} /> : <Outlet />;
}
