import React from 'react'
import { useTranslation } from 'react-i18next';
import { AuthCard } from 'library/components/AuthCard';
import { SendResetEmail } from './SendResetEmail';
import { paths } from 'library/common/constants';

export default function ForgotPassword() {
  const { t } = useTranslation();
  
  return (
    <AuthCard 
      text={t("texts.forgot_password")}
      redirectSuggestion={t("links.back_login")} 
      redirectPath={paths.auth.login.reverse()}
    >
      <SendResetEmail />
    </AuthCard>
  )
}
