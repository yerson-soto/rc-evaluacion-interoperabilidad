import { useState, useEffect } from "react";
import { message } from "antd";
import { useTranslation } from 'react-i18next';
import { AuthService } from "library/api/services/AuthService";
import { useQueryToken } from "library/hooks/useQueryToken";
import { useSearchParams } from "react-router-dom";

type Status = "validating" | "confirmed" | "error";

export function useConfirmEmail() {
  const [isForwarding, setForwarding] = useState(false);
  const [status, setStatus] = useState<Status>("validating");
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const resetToken = useQueryToken();
  const authService = new AuthService();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const confirmEmail = async () => {
      if (userId && resetToken) {
        await authService
          .confirmEmail(userId, resetToken)
          .then(() => setStatus("confirmed"))
          .catch(() => setStatus("error"));
      } else {
        setStatus("error");
      }
    };

    confirmEmail();

    // eslint-disable-next-line
  }, []);

  const sendConfirmationMail = async (): Promise<void> => {
    if (userId) {
      setForwarding(true);

      await authService
        .sendConfirmLink(userId)
        .then(() => {
          setForwarding(false);
          const successMesage = t("alerts.send_confirmation_mail_success");
          message.success(successMesage)
        })
        .catch((errorMessage) => {
          setForwarding(false);
          message.error(errorMessage);
        });
    }
  };

  return {
    isForwarding,
    isValidating: status === "validating",
    isConfirmed: status === "confirmed",
    isInvalid: status === "error",
    sendConfirmationMail
  };
}
