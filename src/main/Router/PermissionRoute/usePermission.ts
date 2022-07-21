import React from 'react'
import { useState, useEffect } from 'react';
import { UserType } from 'library/common/enums';
import { useAppSelector } from 'redux/hooks';


interface PermissionOptions {
  allow: UserType[];
  redirectPath: string;
  authRequired?: boolean;
}

export function usePermissionRoute(options: PermissionOptions) {
  const [ isLoading, setLoading ] = useState(true);
  const { user, isLogged } = useAppSelector(state => state.auth);
  const { allow, redirectPath } = options;

  useEffect(() => {
    const checkAccess = (): void => {
      const authRequired = !allow.includes(UserType.Admin);

     
    }

    checkAccess();
  }, [])
  
  return { isLoading };
}
