import { useState } from "react";
import { AuthService } from "library/api/services/AuthService";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { SendResetMail } from "./SendResetEmail";

import useCountDown from "react-countdown-hook";

const initialTime = 60 * 1000;
const interval = 1000;

export function useSendResetMail() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const { t } = useTranslation();

  // Calculate when user will be able to resent mail
  const [timeLeft, { start }] = useCountDown(initialTime, interval);

  const authService = new AuthService();
  const canResentMail = timeLeft === 0;

  const sendResetMail = async (email: string): Promise<void> => {
    setLoading(true);
    setEmail(email);

    await authService
      .sendResetLink(email)
      .then(() => setSent(true))
      .catch(() => setSent(false));

    setLoading(false);
    start();
  };

  const resendResetMail = (): Promise<void> | undefined => {
    if (canResentMail) {
      return sendResetMail(email);
    }
  };

  const renderResendButton = (): React.ReactNode => (
    <Button
      type="primary"
      size="large"
      onClick={resendResetMail}
      disabled={!canResentMail}
      block
    >
      {canResentMail
        ? t("buttons.resend_mail")
        : t("buttons.resend_mail_wait", { timeLeft: timeLeft / 1000 })}
    </Button>
  );

  const renderSendMail = (): React.ReactNode => (
    <SendResetMail onSendMail={sendResetMail} isLoading={isLoading} />
  );

  return { renderSendMail, renderResendButton, isSent, isLoading };
}
