import React from "react";
import { useTranslation } from "react-i18next";
import { AuthCard } from "library/components/AuthCard";
import { ResetPassword } from "./ResetPassword";
import { useResetPassword } from "./useResetPassword";
import { ForbiddenResult } from "./ForbiddenResult";
import { paths } from "library/common/constants";
import { SuccessResult } from "./SuccessResult";

export default function PasswordReset() {
  const { t } = useTranslation();
  const { isLoading, status, resetPassword } = useResetPassword();

  if (status === "forbidden") return <ForbiddenResult />;

  const isDone = status === "success";
  const text = isDone
    ? t("texts.reset_password_success")
    : t("texts.reset_password");

  return (
    <React.Fragment>
      <AuthCard
        text={text}
        redirectSuggestion={t("links.back_login")}
        redirectPath={paths.auth.login.reverse()}
      >
        {isDone 
          ? <SuccessResult />
          : <ResetPassword onReset={resetPassword} isLoading={isLoading} />
        }
      </AuthCard>
    </React.Fragment>
  );
}
