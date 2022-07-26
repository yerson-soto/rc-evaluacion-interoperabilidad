import { AuthUser } from "library/models/User";
import { GetAuthUser } from "../dto/auth-dto";
import { UserMapper } from "./UserMapper";

export class AuthMapper {
  userFromAPI(data: GetAuthUser): AuthUser {
    const userMapper = new UserMapper();

    return {
      ...userMapper.fromAPI(data),
    };
  }
}
