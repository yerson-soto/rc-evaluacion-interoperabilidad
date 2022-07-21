import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks';
import { paths } from 'library/common/constants';


export default function PrivateRoute() {
  const haveAccess = useAppSelector(state => state.auth.isLogged);

  return haveAccess ? <Outlet /> : <Navigate to={paths.auth.login.reverse()} /> 
}
