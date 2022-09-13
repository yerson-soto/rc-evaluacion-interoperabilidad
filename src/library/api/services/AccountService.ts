import { AbstractAPIService } from './AbstractApiService';
import { ChangePasswordFormSchema } from 'features/Configuration/ChangePassword/PasswordFormSchema';
import { UpdatePassword } from '../dto/account-dto';
import { AccountMapper } from '../mappers/AccountMapper';

interface AccountRepository {
  changePassword: (data: ChangePasswordFormSchema) => Promise<void>;
}

export class AccountService extends AbstractAPIService implements AccountRepository {
  mapper: AccountMapper;

  constructor() {
    super();
    this.mapper = new AccountMapper();
  }
  
  changePassword(data: ChangePasswordFormSchema): Promise<void> {
    return new Promise((resolve, reject) => {
      const body = this.mapper.changePasswordBody(data);
      
      this.client.post<any, any, UpdatePassword>('/account', body)
        .then(() => resolve())
        .catch(() => reject('Error al cambiar la contraseña'))
    })
  }
}