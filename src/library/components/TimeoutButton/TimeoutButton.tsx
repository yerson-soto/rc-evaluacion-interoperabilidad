import React from "react";
import { Button, ButtonProps } from "antd";
import { useTranslation } from "react-i18next";
import { useTimeoutButton } from './useTimeoutButton';

interface TimeoutButtonProps extends ButtonProps {
  timeout: number;
  attemps: number;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
}

export default function TimeoutButton(props: TimeoutButtonProps) {
  const { timeout, attemps, onClick, children, ...btnProps } = props;
  const { t } = useTranslation();
  const { clickAllowed, seconds, handleClick } = useTimeoutButton(timeout, attemps);

  return (
    <Button
      onClick={event => handleClick(event, onClick)}
      disabled={!clickAllowed}
      {...btnProps}
    >
      {clickAllowed
        ? children
        : t("buttons.retry_wait", { seconds })}
    </Button>
  );
}
