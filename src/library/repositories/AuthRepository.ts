import { Token } from 'library/models/Token';

export interface GetToken {
  token: string;
}

export interface AuthRepository {
  createToken: (username: string, password: string) => Promise<Token>;
  sendResetLink: (email: string) => Promise<void>;
  validateResetLink: (link: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
}