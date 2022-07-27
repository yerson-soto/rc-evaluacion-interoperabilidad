import { Token } from 'library/models/Token';
import { AuthUser } from 'library/models/User';

export interface AuthRepository {
  createToken: (username: string, password: string) => Promise<Token>;
  getAuthUser: (token: string) => Promise<AuthUser>
  confirmEmail: (userId: string, confirmToken: string) => Promise<void>;
  sendConfirmLink: (userId: string) => Promise<void>;
  sendResetLink: (email: string) => Promise<void>;
  validateResetLink: (link: string) => Promise<void>;
  resetPassword: (password: string, resetToken: string) => Promise<void>;
}