import { User } from "library/models/User";
import { GetUser, CreateUser } from "library/api/dto/user-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { UserMapper } from "library/api/mappers/UserMapper";
import { UserFormSchema } from "features/UserCrud/UserForm/UserFormSchema";

export class UserService extends AbstractCrudService<
  User,
  GetUser,
  CreateUser,
  UserFormSchema
> {
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
}
