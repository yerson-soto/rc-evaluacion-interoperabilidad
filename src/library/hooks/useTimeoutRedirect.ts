import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useCountDown from "react-countdown-hook";

export function useTimeoutRedirect(timeout: number, path: string) {
  const [timeLeft, { start }] = useCountDown(timeout, 1000); 
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToPath = () => {
      setTimeout(() => {
        navigate(path);
      }, timeout)
    }
    
    start();
    redirectToPath();
    
    // eslint-disable-next-line
  }, []);

  return { timeLeft: timeLeft / 1000 };
}