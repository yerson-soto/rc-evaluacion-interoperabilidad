import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { AuthService } from "library/api/services/AuthService";
import { useTranslation } from 'react-i18next';

type Status = 'initial' | 'success' | 'error' | 'forbidden';

export function useResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('forbidden');
  const [queryParams] = useSearchParams();

  const { t } = useTranslation();

  const { error, success } = message;
  
  const authService = new AuthService();

  useEffect(() => { 
    const checkHaveAccess = () => {
      const resetLink = queryParams.get('token');

      if (resetLink) {
        authService.validateResetLink(resetLink)
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
