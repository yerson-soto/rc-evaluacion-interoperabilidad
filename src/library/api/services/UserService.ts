import { User, UserIdentity } from "library/models/User";
import { GetUser, CreateUser, GetUserIdentity } from "library/api/dto/user-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { UserMapper } from "library/api/mappers/UserMapper";
import { UserFormSchema } from "features/UserCrud/UserForm/UserFormSchema";
import { APIResponse } from 'library/common/interfaces';

interface UserRepository {
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
