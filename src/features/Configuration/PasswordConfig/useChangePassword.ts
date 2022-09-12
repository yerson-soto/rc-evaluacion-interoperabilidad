import { UserService } from 'library/api/services/UserService';
import { ChangePasswordFormSchema } from '../ChangePassword/PasswordFormSchema';
import { AccountService } from 'library/api/services/AccountService';

export function useChangePassword() {
  const accountService = new AccountService();

  const changePassword = async (
    email: string, 
    data: ChangePasswordFormSchema
  ): Promise<void> => {
    try {
      await accountService.changePassword(email, data);
    } catch(errorMessage) { 
      console.log(errorMessage)
    }
  }

  return changePassword;
}