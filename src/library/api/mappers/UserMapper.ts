import { Mapper } from "library/common/interfaces";
import { User } from "library/models/User";
import { UserFormSchema } from "features/UserCrud/UserForm/UserFormSchema";
import { GetUser, CreateUser } from "../dto/user-dto";

export class UserMapper
  implements
    Mapper<User, GetUser, CreateUser, UserFormSchema>
{
  formSchemaToAPI(schema: UserFormSchema): CreateUser {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'
    
    return {
      document: "",
      firtName: schema.firstName,
      lastName: schema.lastName,
      email: schema.email,
      userType: schema.type,
      urlBase: baseUrl
    };
  }

  fromAPI(data: GetUser): User {
    return {
      uid: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      type: data.userType,
      organizationId: 2
    };
  }
}
