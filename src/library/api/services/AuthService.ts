import { AbstractAPIService } from "./AbstractApiService";
import { AuthRepository } from "library/api/repositories/AuthRepository";
import { GetToken } from "library/api/dto/auth-dto";
import { Token } from "library/models/Token";
import { APIResponse } from "library/common/interfaces";
import { getText } from "i18n";
import { paths } from "../../common/constants";

export class AuthService extends AbstractAPIService implements AuthRepository {
  private get resetLink(): string {
    return (
      process.env.REACT_APP_BASE_URL +
      paths.auth.passwordReset.reverse() +
      "?token="
    );
  }

  createToken(username: string, password: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      const body = { username, password };
      this.client
        .post<GetToken>("/accounts", body)
        .then((res) => {
          const token: Token = { value: res.data.tokenUser };
          resolve(token);
        })
        .catch(() => reject(getText("alerts.login_failed")));
    });
  }

  sendResetLink(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const body = { email, urlBase: this.resetLink };

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
