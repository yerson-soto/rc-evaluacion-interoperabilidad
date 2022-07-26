import { useState, useEffect } from 'react';
import { message } from 'antd';
import { AuthService } from "library/api/services/AuthService";
import { useTranslation } from 'react-i18next';
import { useQueryToken } from 'library/hooks/useQueryToken';

type Status = 'initial' | 'success' | 'error' | 'forbidden';

export function useResetPassword() {
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>('forbidden');
  const resetToken = useQueryToken();

  const { t } = useTranslation();

  const { error, success } = message;
  
  const authService = new AuthService();

  useEffect(() => { 
    const checkHaveAccess = async () => {
      if (resetToken) {
        await authService.validateResetLink(resetToken)
          .then(() => setStatus('initial'))
          .catch(() => setStatus('forbidden'))
          
      } else {
        setStatus('forbidden');
      }

      setLoading(false);
    }

    checkHaveAccess();

    // eslint-disable-next-line
  }, [])

  const resetPassword = async (password: string): Promise<void> => {
    setLoading(true);
    
    authService.resetPassword(password, resetToken)
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
