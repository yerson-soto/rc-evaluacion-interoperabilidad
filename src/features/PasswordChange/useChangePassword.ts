import { useState } from 'react';
import { message } from 'antd';
import { ChangePasswordFormSchema } from './ChangePassword/PasswordFormSchema';
import { AccountService } from 'library/api/services/AccountService';
import { useTranslation } from 'react-i18next';

export function useChangePassword() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const accountService = new AccountService();

  const changePassword = async (data: ChangePasswordFormSchema): Promise<void> => {
    setLoading(true);

    try {
      await accountService.changePassword(data);
      message.success(t("alerts.change_password_success"))

    } catch(errorMessage: any) { 
      message.error(errorMessage);
      throw new Error(errorMessage);

    } finally {
      setLoading(false);
    }
  }

  return { isLoading, changePassword };
}