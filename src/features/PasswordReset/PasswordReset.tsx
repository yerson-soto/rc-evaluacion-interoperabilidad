import React from 'react'
import { useTranslation } from 'react-i18next';
import { AuthCard } from 'library/components/AuthCard';
import { ResetPassword } from './ResetPassword';
import { paths } from 'library/common/constants';

export default function PasswordReset() {
  const { t } = useTranslation();

  return (
    <AuthCard
      text={t("texts.reset_password")}
      redirectSuggestion={t("links.back_login")}
      redirectPath={paths.auth.login.reverse()}
    >
      <ResetPassword />
    </AuthCard>
  )
}
