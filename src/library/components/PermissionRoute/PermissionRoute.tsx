import React from 'react'
import { UserType } from 'library/common/enums';
import { useAppSelector } from 'redux/hooks';

interface PermissionRouteProps {
  children: React.ReactNode;
  allow?: UserType[];
}

export default function PermissionRoute(props: PermissionRouteProps) {
  const auth = useAppSelector(state => state.auth);
  
  const { allow, children } = props;

  
  
  
  return (
    <div>PermissionRoute</div>
  )
}
