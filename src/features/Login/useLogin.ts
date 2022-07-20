import { message } from 'antd';
import { useAppSelector, useAppDispatch } from "main/store/index";
import { AuthService } from "library/api/services/AuthService";
import * as actions from "main/store/slices/authSlice";
import { keys } from 'library/common/constants';

const { loginDone, loginFailed, authLoading } = actions;

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
          localStorage.setItem(keys.tokenLocalStorage, token.value)
        }
      })
      .catch((errorMessage) => {
        dispatch(loginFailed(errorMessage));

        message.error(errorMessage);
      });
  };

  return { login, isLoading };
}
