import { useState, useEffect } from 'react';
import { useMemo } from "react";
import { User } from 'library/models/User';
import { UserMapper } from 'library/api/mappers/UserMapper';
import { UserService } from 'library/api/services/UserService';
import { useFetchDebounced } from 'library/hooks/useFetchDebounced';

export function useManagerOptions() {
  const [managers, setManagers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const userService = new UserService();

  const fetchManagers = useFetchDebounced(async () => {
    setLoading(true);
    
    try {
      const managers = await userService.getSupports();
      setManagers(managers);
    } catch {
      setManagers([]);
    } finally {
      setLoading(false);
    }
  })

  useEffect(() => {

    fetchManagers();
  }, [])
  
  const managerOptions = useMemo(() => {
    const userMapper = new UserMapper();
    return managers.map(userMapper.toSelectOption);
  }, [managers]);

  return { isLoading, managers, managerOptions } ;
}