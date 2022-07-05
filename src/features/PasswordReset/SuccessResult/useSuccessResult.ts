import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { paths } from "library/common/constants";
import useCountDown from "react-countdown-hook";

const initialTime = 10 * 1000;

export function useSuccessResult() {
  const [timeLeft, { start }] = useCountDown(initialTime, 1000);

  const navigate = useNavigate();

  useEffect(() => {
    const redirectToLogin = () => {
      setTimeout(() => {
        navigate(paths.auth.login.reverse())
      }, initialTime)
    }
    
    start();
    redirectToLogin();
    // eslint-disable-next-line
  }, []);

  return { timeLeft: timeLeft / 1000 };
}
