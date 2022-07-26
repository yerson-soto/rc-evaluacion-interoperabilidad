import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks';
import { UserType } from 'library/common/enums';
import { paths } from 'library/common/constants';

interface PermissionRouteProps {
  for: UserType[];
  redirectPath?: string;
}

export default function PermissionRoute(props: PermissionRouteProps) {
  const { redirectPath = paths.admin.index, for: allowedRoles } = props;
  const userType = useAppSelector(state => state.auth.user.type);

  const isAllowed = allowedRoles.includes(userType);

  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace /> 
}
