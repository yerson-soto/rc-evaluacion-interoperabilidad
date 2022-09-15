import { ChangePasswordFormSchema } from 'features/PasswordChange/ChangePassword/PasswordFormSchema';
import { UpdatePassword } from '../dto/account-dto';

interface AccountMapperType {
  changePasswordBody: (data: ChangePasswordFormSchema) => UpdatePassword;
}

export class AccountMapper implements AccountMapperType  {

  changePasswordBody(data: ChangePasswordFormSchema): UpdatePassword {
    const { email, password, newPassword } = data;
    
    return {
      email,
      newPassword,
      currentPassword: password,
    }
  }
}