import { useState, useEffect } from 'react';
import { AuthService } from "library/api/services/AuthService";
import { useTranslation } from 'react-i18next';
import { useQueryToken } from 'library/hooks/useQueryToken';
import { useSearchParams } from 'react-router-dom';

type Status = 'validating' | 'confirmed' | 'error';

export function useConfirmEmail() {
  const [status, setStatus] = useState<Status>('validating');
  const [searchParams] = useSearchParams();

  const resetToken = useQueryToken();

  const { t } = useTranslation();
  
  const authService = new AuthService();

  useEffect(() => { 
    const confirmEmail = async () => {
      const userId = searchParams.get('userId');

      if (userId && resetToken) {
        await authService.confirmEmail(userId, resetToken)
          .then(() => setStatus('confirmed'))
          .catch(() => setStatus('error'))
          
      } else {
        setStatus('error');
      }
    }

    confirmEmail();

    // eslint-disable-next-line
  }, [])

  return { 
    isLoading: status === 'validating', 
    isConfirmed: status === 'confirmed', 
    isInvalid: status === 'error' 
  };
}
