import { useState, useEffect } from 'react';
import { message } from 'antd';
import { AuthService } from "library/api/services/AuthService";
import { useTranslation } from 'react-i18next';
import { useResetToken } from './useResetToken';

type Status = 'initial' | 'success' | 'error' | 'forbidden';

export function useResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('forbidden');
  const resetToken = useResetToken();

  const { t } = useTranslation();

  const { error, success } = message;
  
  const authService = new AuthService();

  useEffect(() => { 
    const checkHaveAccess = () => {
      console.log(resetToken);

      if (resetToken) {
        authService.validateResetLink(resetToken)
          .then(() => setStatus('initial'))
          .catch(() => setStatus('forbidden'))
          
      } else {
        setStatus('forbidden');
      }
    }

    checkHaveAccess();

    // eslint-disable-next-line
  }, [])

  const resetPassword = async (password: string): Promise<void> => {
    setLoading(true);
    
    authService.resetPassword(password)
      .then(() => {
        setStatus('success');
        success(t("alerts.reset_password_success"))
      })
      .catch((message) => {
        setStatus('error');
        error(t(message))
      });

    setLoading(false)
  };

  return { resetPassword, status, isLoading };
}
