import { useRef, useState } from "react";
import { message } from "antd";
import { AuthService } from "library/api/services/AuthService";
import { useTranslation } from 'react-i18next';

export function useSendResetMail() {
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const { t } = useTranslation();
  
  const emailRef = useRef("");

  const authService = new AuthService();

  const sendResetMail = async (email: string): Promise<void> => {
    setLoading(true);
    emailRef.current = email;

    await authService
      .sendResetLink(email)
      .then(() => {
        setSent(true);
        message.info(t("alerts.send_reset_mail_info"))
      })
      .catch(() => setSent(false));

    setLoading(false);
  };

  return { isSent, email: emailRef.current, isLoading, sendResetMail };
}
