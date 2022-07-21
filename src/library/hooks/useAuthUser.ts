import { useEffect } from 'react';
import { useFetchDebounced } from './useFetchDebounced';
import { AuthService } from 'library/api/services/AuthService';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import * as actions from 'redux/slices/authSlice';

export function useAuthUser() {
  const service = new AuthService();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const fetchUser = useFetchDebounced((authToken: string) => {
    dispatch(actions.userLoading());
    
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

  return { isLoading };
}


