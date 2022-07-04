import { useAppSelector, useAppDispatch } from "main/store/index";
import { AuthService } from "main/services/AuthService";
import { authLoading, loginDone, loginFailed } from "main/store/slices/authSlice";

export function useLogin() {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const dispatch = useAppDispatch();
  const authService = new AuthService();

  const login = async (
    username: string,
    password: string,
    remember: boolean
  ): Promise<void> => {
    dispatch(authLoading())
    
    return authService
      .createToken(username, password)
      .then((token) => {
        dispatch(loginDone(token));

        if (remember) {
          // Save token in storage
        }
      })
      .catch((message) => {
        dispatch(loginFailed(message));
      });
  };

  return { login, isLoading };
}
