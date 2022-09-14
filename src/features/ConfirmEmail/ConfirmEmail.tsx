import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { paths } from "library/common/constants";
import { ConfirmInvalid } from "./ConfirmInvalid";
import { AppLoader } from "library/components/AppLoader";
import { useConfirmEmail } from "./useConfirmEmail";
import { EmailConfirmed } from "./EmailConfirmed";

export default function ConfirmEmail() {
  const { t } = useTranslation();
  const { isValidating, isForwarding, isInvalid, sendConfirmationMail } = useConfirmEmail();

  if (isValidating) return <AppLoader text={t("loading.confirm_email")} />;

  return (
    <AuthCard
      text={t("texts.confirm_email")}
      redirectSuggestion={t("links.back_login")}
      redirectPath={paths.auth.login.fullPath}
    >
      {isInvalid 
      ? <ConfirmInvalid 
          forwarding={isForwarding} 
          onResendMail={sendConfirmationMail} 
        /> 
      : <EmailConfirmed />}
    </AuthCard>
  );
}
