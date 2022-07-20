import { useEffect } from 'react';
import { useAppDispatch } from 'main/store/index';
import { useFetchDebounced } from './useFetchDebounced';
import { AuthService } from 'library/api/services/AuthService';
import { useAppSelector } from 'main/store/index';
import * as actions from 'main/store/slices/authSlice';

export function useAuthUser() {
  const service = new AuthService();
  
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const fetchUser = useFetchDebounced((authToken: string) => {
    dispatch(actions.authLoading());
    
    service.getAuthUser(authToken)
    .then(user => {
      dispatch(actions.loadUserSuccess(user));
    })
    .catch(message => {
      dispatch(actions.loadUserFailed(message));
    })
  })

  useEffect(() => {
    if (token) fetchUser(token);
  
  }, [token])
}


