import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { paths } from "library/common/constants";
import { useSendResetMail } from "./useSendResetMail";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const { renderSendMail, renderResendButton, isSent } = useSendResetMail();

  const text = isSent ? t("texts.reset_mail_sent") : t("texts.forgot_password");

  return (
    <AuthCard
      text={text}
      redirectSuggestion={t("links.back_login")}
      redirectPath={paths.auth.login.reverse()}
    >
      {isSent ? renderResendButton() : renderSendMail()}
    </AuthCard>
  );
}
