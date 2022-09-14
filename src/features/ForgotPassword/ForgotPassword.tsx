import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { paths } from "library/common/constants";
import { useSendResetMail } from "./useSendResetMail";
import { TimeoutButton } from "library/components/TimeoutButton";
import { SendResetMail } from "./SendResetEmail";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const { isLoading, isSent, email, sendResetMail } = useSendResetMail();

  const text = isSent ? t("texts.reset_mail_sent") : t("texts.forgot_password");

  const handleClick = async () => await sendResetMail(email);
  
  return (
    <AuthCard
      text={text}
      redirectSuggestion={t("links.back_login")}
      redirectPath={paths.auth.login.fullPath}
    >
      {isSent ? (
        <TimeoutButton
          type="primary"
          size="large"
          timeout={60000}
          attemps={2}
          loading={isLoading}
          onClick={handleClick}
          block
        >
          {t("buttons.resend_mail")}
        </TimeoutButton>
      ) : (
        <SendResetMail 
          onSendMail={sendResetMail} 
          isLoading={isLoading} 
        />
      )}
    </AuthCard>
  );
}
