import { AbstractAPIService } from './AbstractApiService';
import { ChangePasswordFormSchema } from 'features/Configuration/ChangePassword/PasswordFormSchema';
import { ChangePassword } from '../dto/account-dto';

interface AccountRepository {
  changePassword: (email: string, data: ChangePasswordFormSchema) => Promise<void>;
}

export class AccountService extends AbstractAPIService implements AccountRepository {
  
  changePassword(email: string, data: ChangePasswordFormSchema): Promise<void> {
    const body: ChangePassword = {
      email,
      currentPassword: data.password,
      newPassword: data.newPassword
    }

    return new Promise((resolve, reject) => {
      this.client.post('/account', body)
        .then(() => resolve())
        .catch(() => reject('Error al cambiar la contraseña'))
    })
  }
}