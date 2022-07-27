import { AbstractAPIService } from "./AbstractApiService";
import { AuthRepository } from "library/api/repositories/AuthRepository";
import { GetAuthUser, GetToken } from "library/api/dto/auth-dto";
import { Token } from "library/models/Token";
import { APIResponse } from "library/common/interfaces";
import { getText } from "i18n";
import { paths, keys } from "library/common/constants";
import { AuthUser } from "library/models/User";
import { AuthMapper } from "../mappers/AuthMapper";

export class AuthService extends AbstractAPIService implements AuthRepository {
  private mapper!: AuthMapper;

  constructor() {
    super();
    this.mapper = new AuthMapper();
  }
  
  private get resetLink(): string {
    return (
      process.env.REACT_APP_BASE_URL +
      paths.auth.passwordReset.reverse() +
      `?${keys.linkTokenParam}=`
    );
  }

  private get confirmationLink(): string {
    return (
      process.env.REACT_APP_BASE_URL +
      paths.auth.confirmEmail.reverse() +
      `?${keys.linkTokenParam}=`
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

  confirmEmail(userId: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .post("confirm", { userId, token })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.confirm_email_failed")))
    })
  }

  sendConfirmLink(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const body = { userId, urlBase: this.confirmationLink };

      this.client
        .post("/restSendEmail", body)
        .then(() => resolve())
        .catch(() => reject(getText("alerts.send_confirmation_mail_failed")));
    });
  }

  getAuthUser(token: string): Promise<AuthUser> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<GetAuthUser>>("tokenUser", { token })
        .then((res) => {
          const user = this.mapper.userFromAPI(res.data.result);
          resolve(user);
        })
        .catch(() => reject(getText("alerts.get_auth_user_failed")))
    })
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

  resetPassword(password: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .post("/rest", { password, token })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.reset_password_failed")));
    });
  }

  validateResetLink(link: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .post("/validateToken", { link })
        .then(() => resolve())
        .catch(() => reject(getText("alerts.reset_link_invalid")));
    });
  }
}
