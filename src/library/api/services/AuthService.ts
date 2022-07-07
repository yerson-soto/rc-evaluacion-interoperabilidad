import { APIService } from './ApiService';
import { AuthRepository, GetToken } from 'library/api/repositories/AuthRepository';
import { Token } from 'library/models/Token';
import { APIResponse } from 'library/common/interfaces';
import { getText } from 'i18n';

export class AuthService extends APIService implements AuthRepository {
  
  createToken(username: string, password: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      const body = { username, password };
      this.client.post<APIResponse<GetToken>>('/login', body)
        .then(res => {
          const token: Token = { value: res.data.result.token };
          resolve(token);
        })
        .catch(() => reject(getText("alerts.login_failed")))
    })
  }

  sendResetLink(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.post('/send-reset-mail', { email })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.send_reset_mail_failed")))
    })
  }

  resetPassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.post('/reset-password', { password })
        .then(() => resolve())
        .catch(() => resolve())
    })
  }

  validateResetLink(link: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.post('/validate-link', { link })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.reset_link_invalid")))
    })
  }
}