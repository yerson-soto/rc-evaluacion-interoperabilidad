import React from "react";
import { LoginForm } from "./LoginForm";
import { AuthCard } from 'library/components/AuthCard';
import { useTranslation } from 'react-i18next';
import { paths } from 'library/common/constants';

export default function Login() {
  const { t } = useTranslation();

  return (
    <AuthCard
      text={t("texts.login")}
      redirectSuggestion={t("links.register_now")}
      redirectPath={paths.auth.signup.reverse()}
    >
      <LoginForm />
    </AuthCard>
  );
}
