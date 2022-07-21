import { message } from 'antd';
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { AuthService } from "library/api/services/AuthService";
import { keys } from 'library/common/constants';
import * as actions from "redux/slices/authSlice";

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
