import { useAppSelector } from 'redux/hooks';

export function useNavigationItems() {
  const isLogged = useAppSelector(state => state.auth.isLogged);
  const type = useAppSelector(state => state.auth.user.type);

  
  const authItem = isLogged
}