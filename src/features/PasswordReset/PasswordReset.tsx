import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { ResetPassword } from "./ResetPassword";
import { useResetPassword } from "./useResetPassword";
import { ForbiddenResult } from "./ForbiddenResult";
import { SuccessResult } from "./SuccessResult";
import { paths } from "library/common/constants";

export default function PasswordReset() {
  const { t } = useTranslation();
  const { isLoading, status, resetPassword } = useResetPassword();

  if (status === "forbidden") return <ForbiddenResult />;
  else if (status === "success") return <SuccessResult />;

  // const text = true
  //     ? t("texts.reset_password_success")
  //     : t("texts.reset_password");

  return (
    <React.Fragment>
      <AuthCard
        text={t("texts.reset_password")}
        redirectSuggestion={t("links.back_login")}
        redirectPath={paths.auth.login.reverse()}
      >
        <ResetPassword onReset={resetPassword} isLoading={isLoading} />
      </AuthCard>
    </React.Fragment>
  );
}
