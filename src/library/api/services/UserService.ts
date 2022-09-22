import { User, UserIdentity } from "library/models/User";
import { GetUser, CreateUser, GetUserIdentity } from "library/api/dto/user-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { UserMapper } from "library/api/mappers/UserMapper";
import { UserFormSchema } from "features/UserCrud/UserForm/UserFormSchema";
import { APIResponse } from 'library/common/interfaces';

interface UserRepository {
  getSupports: () => Promise<User[]>;
  verifyIdentityCard: (identityCard: string) => Promise<UserIdentity>;
}

export class UserService extends AbstractCrudService<
  User,
  GetUser,
  CreateUser,
  UserFormSchema
> implements UserRepository {
  mapper: UserMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new UserMapper();
    this.getAllUrl = "/users";
    this.createUrl = "/users";
  }
  
  getDetailUrl(id: number): string {
    return "/users/" + id.toString();
  };

  getSupports(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.client.get<APIResponse<GetUser[]>>('/users/userTechnics')
        .then(res => {
          const supports = res.data.result.map(this.mapper.fromAPI);
          resolve(supports);
        })
        .catch(() => reject("alerts.could_not_load_users"))
    })
  }

  verifyIdentityCard(identityCard: string): Promise<UserIdentity> {
    return new Promise((resolve, reject) => {
      const url = `/users/usersdocument/${identityCard}`;
      this.client.get<APIResponse<GetUserIdentity>>(url)
        .then(res => {
          const identity = this.mapper.toIdentity(res.data.result);
          resolve(identity);
        })
        .catch(() => reject("alerts.identity_card_not_found"))
    })
  }
}
