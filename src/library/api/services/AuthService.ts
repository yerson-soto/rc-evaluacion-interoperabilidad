import { AbstractAPIService } from "./AbstractApiService";
import { AuthRepository } from "library/api/repositories/AuthRepository";
import { GetToken } from "library/api/dto/auth-dto";
import { Token } from "library/models/Token";
import { APIResponse } from "library/common/interfaces";
import { getText } from "i18n";

export class AuthService extends AbstractAPIService implements AuthRepository {
  createToken(username: string, password: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      const body = { username, password };
      this.client
        .post<APIResponse<GetToken>>("/accounts", body)
        .then((res) => {
          const token: Token = { value: res.data.result.token };
          resolve(token);
        })
        .catch(() => reject(getText("alerts.login_failed")));
    });
  }

  sendResetLink(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const urlBase = process.env.REACT_APP_BASE_URL || '';
      const body = { email, urlBase };
      
      this.client
        .post("/recover", body)
        .then(() => resolve())
        .catch(() => reject(getText("alerts.send_reset_mail_failed")));
    });
  }

  resetPassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .post("/reset-password", { password })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.reset_password_failed")));
    });
  }

  validateResetLink(link: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .post("/validate-link", { link })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.reset_link_invalid")));
    });
  }
}
