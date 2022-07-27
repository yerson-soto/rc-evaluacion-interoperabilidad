import React, { useRef } from "react";
import useCountDown from "react-countdown-hook";

export function useTimeoutButton(timeout: number, attemps: number) {
  const [timeLeft, { start }] = useCountDown(timeout);
  const timesClicked = useRef(0);
  const clickAllowed = timesClicked.current < attemps || timeLeft === 0;

  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    callback: (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => Promise<void>
  ) => {

    if (clickAllowed) {
      await callback(event);

      timesClicked.current++;
      start();
    }
  };

  return { clickAllowed, seconds: timeLeft / 1000, handleClick };
}
