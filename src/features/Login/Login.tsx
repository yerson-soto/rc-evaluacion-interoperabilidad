import React from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "./useLogin";
import { LoginForm } from "./LoginForm";
import { AuthCard } from "library/components/AuthCard";
import { paths } from "library/common/constants";

export default function Login() {
  const { t } = useTranslation();

  const { login, isLoading } = useLogin();

  return (
    <AuthCard
      text={t("texts.login")}
      redirectSuggestion={t("links.register_now")}
      redirectPath={paths.auth.signup.reverse()}
    >
      <LoginForm onSubmit={login} isLoading={isLoading} />
    </AuthCard>
  );
}
