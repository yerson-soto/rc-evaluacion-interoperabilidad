import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useCountDown from "react-countdown-hook";


export function useTimedRedirect(seconds: number, path: string) {
  const initialTime = seconds * 1000;
  const [timeLeft, { start }] = useCountDown(initialTime, 1000); 
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToPath = () => {
      setTimeout(() => {
        navigate(path)
      }, initialTime)
    }
    
    start();
    redirectToPath();
    
    // eslint-disable-next-line
  }, []);

  return { timeLeft: timeLeft / 1000 };
}