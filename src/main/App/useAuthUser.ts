import { useEffect } from "react";
import { useFetchDebounced } from "library/hooks/useFetchDebounced";
import { AuthService } from "library/api/services/AuthService";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import * as actions from "redux/slices/authSlice";

export function useAuthUser() {
  const service = new AuthService();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoadingUser);
  const token = useAppSelector((state) => state.auth.token);

  const fetchUser = useFetchDebounced((authToken: string) => {
    dispatch(actions.userLoading());

    service.getAuthUser(authToken)
      .then((user) => {
        dispatch(actions.loadUserSuccess(user));
      })
      .catch((message) => {
        dispatch(actions.loadUserFailed(message));
      });
  });

  useEffect(() => {
    const loadAuthUser = (): void => {
      if (token) {
        // fetch user with auth token
        fetchUser(token)
      } else {
        // By default userLoading is true
        dispatch(actions.cancelUserLoading())
      };
    };

    loadAuthUser();
  }, [token]);

  return { isLoading };
}
