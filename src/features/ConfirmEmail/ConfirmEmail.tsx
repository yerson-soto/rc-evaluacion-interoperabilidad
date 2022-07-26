import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { paths } from "library/common/constants";
import { ConfirmationInvalid } from "./ConfirmationInvalid";
import { AppLoader } from "library/components/AppLoader";
import { useConfirmEmail } from "./useConfirmEmail";
import { EmailConfirmed } from './EmailConfirmed';

export default function ConfirmEmail() {
  const { t } = useTranslation();
  const { isLoading, isConfirmed, isInvalid } = useConfirmEmail();

  if (isLoading) return <AppLoader text={t("loading.confirm_email")} />;

  const text = isConfirmed
    ? t("texts.confirm_email_success")
    : t("texts.confirm_email_failed");

  return (
    <React.Fragment>
      <AuthCard
        text={text}
        redirectSuggestion={t("links.back_login")}
        redirectPath={paths.auth.login.reverse()}
      >
        {isInvalid ? <ConfirmationInvalid /> : <EmailConfirmed />}
      </AuthCard>
    </React.Fragment>
  );
}
